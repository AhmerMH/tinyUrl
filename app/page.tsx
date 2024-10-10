import Image from 'next/image';
import Header from './components/header';
import Footer from './components/footer';
import UrlInput from './components/urlInput/urlInput';

export default function Home() {
  return (
    <div>
      <Header />
      <main className='p-4'>
        <UrlInput />
      </main>
      <Footer />
    </div>
  );
}
