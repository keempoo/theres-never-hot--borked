import { fetchRedditRSS } from './fetchRedditRSS.mjs';

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

    default:
      return addLineBreaks(fact.copy);
  }
}
