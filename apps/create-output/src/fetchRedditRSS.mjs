import Parser from 'rss-parser';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Mustache from 'mustache';

let parser = new Parser();
const wordLimit = 105;

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export async function fetchRedditRSS(url, postTemplate) {
  const feed = await parser.parseURL(url);
  return feed.items
    .slice(0, 3)
    .reduce((all, item) => {
      const subreddit = item.link.match(/r\/[^/]*/)[0];
      const time = timeAgo.format(new Date(item.isoDate));
      const contentWords = item.contentSnippet
        .slice(0, item.contentSnippet.indexOf('submitted by'))
        .trim()
        .split(' ');
      const content =
        contentWords.length > wordLimit
          ? [...contentWords.slice(0, wordLimit), '…']
          : contentWords;
      const spacedContent = content.join(' ').replace('\n', '<br><br>');
      all.push(
        '<hr/><br/>',
        Mustache.render(postTemplate, {
          ...item,
          time,
          subreddit,
          content: spacedContent,
        }),
      );
      return all;
    }, [])
    .join('\n\n');
}
