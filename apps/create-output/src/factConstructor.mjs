import { fetchRedditRSS } from './fetchRedditRSS.mjs';

function addLineBreaks(str) {
  return str.split('\n\n').join('<br/><br/>');
}

export async function factConstructor(fact) {
  switch (fact.id) {
    case 'twoxchromosomes': {
      const url = 'https://www.reddit.com/r/TwoXChromosomes/top/.rss?t=day';
      const reponse = await fetchRedditRSS(url);
      return addLineBreaks(fact.copy.split('{{data}}').join(reponse));
    }

    case 'legaladvice': {
      const url =
        'https://www.reddit.com/r/legaladvice/search/.rss?q=%E2%80%9CMATERNITY+LEAVE%E2%80%9D&type=link&cId=b130d0b9-dbd0-4575-84f8-9ac1e1aa3be1&iId=8abff706-6c6b-460c-85a3-773547ccc58f&t=week';
      const reponse = await fetchRedditRSS(url);
      return addLineBreaks(fact.copy.split('{{data}}').join(reponse));
    }

    default:
      return addLineBreaks(fact.copy);
  }
}
