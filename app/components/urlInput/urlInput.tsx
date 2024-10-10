'use client';

import React, { useState } from 'react';

export default function UrlInput() {
  const URL_REGEX = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  );
  // create useState for managing the input value
  const [longUrl, setLongUrl] = useState(() => '');
  const [inputError, setInputError] = useState(() => '');
  const [shortUrl, serShortUrl] = useState(() => '');
  const [error, setError] = useState(() => '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(() => e.target.value);
  };

  const shortenUrl = async () => {
    if (!URL_REGEX.test(longUrl)) {
      setInputError(() => 'Please enter a valid URL');
      return;
    } else {
      setInputError(() => '');
    }
    setError(() => '');

    try {
      const body = JSON.stringify({ url: longUrl });
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (response.ok) {
        const responseBody = await response.json();
        serShortUrl(() => responseBody.body.shortUrl);
      } else {
        setError(() => 'An error occured. Please try again later.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row w-full'>
        <input
          type='text'
          placeholder='Enter your URL here'
          className='w-full p-3 rounded-l-lg text-sm text-cyan-800 focus:outline-none'
          onChange={(e) => handleChange(e)}
        />
        <button
          className='bg-cyan-950 text-sm rounded-r-lg text-white p-2 p-y-4'
          onClick={(_) => shortenUrl()}
        >
          Shorten
        </button>
      </div>
      {inputError && (
        <div className='text-red-600 text-xs font-semibold w-full pt-1 pl-1'>
          {inputError}
        </div>
      )}
      {shortUrl && (
        <div className='flex flex-col items-center mt-5 text-cyan-800 rounded-lg w-full h-full pb-5'>
          <p className='break-all text-ellipsis'>
            {longUrl.substring(0, longUrl.length > 500 ? 500 : longUrl.length)}...
          </p>

          <div className='m-3 mt-5'>{shortUrl}</div>
          <button
            className='bg-cyan-950 text-sm rounded-lg text-white p-2 mt-5 p-y-4 w-1/4'
            onClick={(_) => navigator.clipboard.writeText(shortUrl)}
          >
            Copy
          </button>
          <div className='mt-5'>
            <b>{longUrl.length}</b> characters converted to{' '}
            <b>{shortUrl.replace('http://', '').length}</b> characters only 🤩
          </div>
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center mt-5 rounded-lg text-white bg-red-500  font-semibold w-full h-40'>
          {error}
        </div>
      )}

      <div></div>
    </div>
  );
}
