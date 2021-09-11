import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <main className="min-h-screen bg-sand">
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}

export default MyApp;
