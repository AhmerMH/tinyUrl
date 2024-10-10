import Header from '../components/header';
import Footer from '../components/footer';

export default function DynamicPage({ params }: any) {
  const { shortUrl } = params;
  let error = '';
  let longUrl = '';

  const fetchLongUrl = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/shorten?shortUrl=${shortUrl}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const responseBody = await response.json();
        longUrl = responseBody;
      } else {
        error = 'An error occured. Please try again later.';
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchLongUrl();

  return (
    <div>
      <Header />
      {longUrl && <div className='text-cyan-950'> asdas {longUrl}</div>}
      {error && (
        <div className='flex justify-center items-center mt-5 rounded-lg text-white bg-red-500  font-semibold w-full h-40'>
          {error}
        </div>
      )}
      <Footer />
    </div>
  );
}
