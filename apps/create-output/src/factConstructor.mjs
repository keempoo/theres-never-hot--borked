import Mustache from 'mustache';
import _ from 'lodash';
import * as cheerio from 'cheerio';
import { marked } from 'marked';

import { fetchRedditRSS } from './fetchRedditRSS.mjs';
import { serpTrendQuery } from './serpAPI.mjs';

marked.use({
  breaks: true,
});

export async function factConstructor(fact) {
  const copy = fact.copy.replaceAll('\n  ', '\n');
  switch (fact.id) {
    case 'reddit': {
      const postTemplate = `<strong>“{{title}}”</strong><br/><em>Last Updated {{time}}</em><br/>{{{content}}}<br/>`;
      const response = await fetchRedditRSS(fact.url, postTemplate);
      const template = marked.parse(copy);
      return Mustache.render(template, { DATA: response });
    }

    case 'reddit-title-only': {
      const postTemplate = `<div class="center"><strong>{{subreddit}}</strong> • {{time}}<br/><h3>{{title}}</h3><br/></div>`;
      const response = await fetchRedditRSS(fact.url, postTemplate);
      const template = marked.parse(copy);
      return Mustache.render(template, { DATA: response });
    }

    case 'trends': {
      const queryParams = {
        geo: 'US',
        google_domain: 'google.com',
        engine: 'google_trends',
        data_type: 'TIMESERIES',
        date: 'now 1-d',
        ...fact.query,
      };
      // get data from serp api
      const response = await serpTrendQuery({ queryParams });
      const data = _.chain(response.interest_over_time.averages)
        .keyBy('query')
        .mapValues('value')
        .value();
      const chartResponse = await fetch(
        response.search_metadata.prettify_html_file,
      );
      // extract svg chart from page
      const body = await chartResponse.text();
      const $ = cheerio.load(body);
      const svgWidth = $('line-chart-directive svg').attr('width');
      const svgHeight = $('line-chart-directive svg').attr('height');
      $('line-chart-directive svg')
        .attr('viewbox', `0 0 ${svgWidth} ${svgHeight}`)
        .attr('width', '100%');
      const chart = cheerio
        .html($('line-chart-directive'))
        .replaceAll('\n', '');

      return marked.parse(Mustache.render(copy, { ...data, CHART: chart }));
    }

    default:
      return marked.parse(copy);
  }
}
