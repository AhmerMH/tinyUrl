import crypto from 'crypto';

const SITE_URL = 'http://localhost:4001/';

function generateShortUrl(longUrl: string): string {
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
  const groups = hash.match(/.{1,13}/g)!;
  const shortUrlCode = groups
    .map((group) => {
      const product = group
        .split('')
        .reduce((acc, char) => acc * char.charCodeAt(0), 1);
      return String.fromCharCode(97 + (product % 26));
    })
    .join('');
  return `${SITE_URL}${shortUrlCode}`;
}

export default generateShortUrl;
