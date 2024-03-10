import Parser from 'rss-parser';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

let parser = new Parser();

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export async function fetchRedditRSS(url) {
  const feed = await parser.parseURL(url);
  return feed.items
    .slice(0, 3)
    .reduce((all, item) => {
      const time = timeAgo.format(new Date(item.isoDate));
      all.push(`“${item.title}”, ${time}`);
      return all;
    }, [])
    .join('\n\n');
}
