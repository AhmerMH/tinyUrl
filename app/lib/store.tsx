// THIS FILE WILL BE REPLACED BY DB CALLS
// ADD DB CALLS HERE
// ITS DUMMY CODE
const storeShortToLong = new Map<string, string>();
const storeLongToShort = new Map<string, string>();

export function getUrl(key: string, longUrl = true): string | undefined {
  return longUrl ? storeShortToLong.get(key) : storeLongToShort.get(key);
}

export function setUrl(shortUrl: string, longUrl: string): Boolean {
  if (storeLongToShort.has(longUrl)) {
    return false;
  }

  storeShortToLong.set(shortUrl, longUrl);
  storeLongToShort.set(longUrl, shortUrl);
  return true;
}
