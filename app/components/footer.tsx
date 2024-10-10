export default function Footer() {
  return (
    <footer className='text-cyan-100 bg-cyan-950 fixed bottom-0 left-0 p-8 text-center text-xs grid grid-cols-2 gap-8 lg:grid-cols-4'>
      <div>
        <div>
          <strong>Disclaimer</strong>
        </div>{' '}
        This website is a demo project created for educational purposes only.
        The shortened URLs generated here are not intended for commercial use
      </div>
      <div>
        <div>
          <strong>Privacy Policy</strong>
        </div>{' '}
        We do not store any user data or track your usage. The links generated
        are temporary and will not be retained
      </div>
      <div>
        <div>
          <strong>Contact Us</strong>
        </div>{' '}
        If you have any questions or feedback about this demo, feel free to
        reach out at{' '}
        <a
          className='text-cyan-400'
          href='mailto:ahmermaqsoodhashmi@gmail.com'
        >
          ahmermaqsoodhashmi@gmail.com
        </a>
      </div>
      <div>
        <div>
          <strong>Terms of Service</strong>
        </div>{' '}
        By using this demo URL shortener, you agree to its temporary nature and
        the possibility of link expiration without notice
      </div>
    </footer>
  );
}
