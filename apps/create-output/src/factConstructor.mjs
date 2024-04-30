import Mustache from 'mustache';
import _ from 'lodash';
import cheerio from 'cheerio';

import { fetchRedditRSS } from './fetchRedditRSS.mjs';
import { serpTrendQuery } from './serpAPI.mjs';

function addLineBreaks(str) {
  return str.split('\n\n').join('<br/><br/>');
}

export async function factConstructor(fact) {
  switch (fact.id) {
    case 'twoxchromosomes': {
      const url = 'https://www.reddit.com/r/TwoXChromosomes/top/.rss?t=day';
      const response = await fetchRedditRSS(url);
      return addLineBreaks(fact.copy.split('{{data}}').join(response));
    }

    case 'legaladvice': {
      const url =
        'https://www.reddit.com/r/legaladvice/search/.rss?q=Maternity%20leave&restrict_sr=1/';
      const response = await fetchRedditRSS(url);
      return addLineBreaks(fact.copy.split('{{data}}').join(response));
    }

    case 'kim_sb8': {
      const queryParams = {
        q: 'KIM KARDASHIAN, SB 8 TEXAS',
        geo: 'US',
        data_type: 'TIMESERIES',
        date: 'now 1-d',
      };
      const response = await serpTrendQuery({ queryParams });
      const data = _.chain(response.interest_over_time.averages)
        .keyBy('query')
        .mapValues('value')
        .value();
      const chartResponse = await fetch(
        response.search_metadata.prettify_html_file
      );
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

      return addLineBreaks(
        Mustache.render(fact.copy, { ...data, CHART: chart })
      );
    }

    default:
      return addLineBreaks(fact.copy);
  }
}
