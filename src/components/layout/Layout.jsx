import StormBanner from './StormBanner';
import Header from './Header';
import Footer from './Footer';
import CallRail from './CallRail';
import ClickSpark from './ClickSpark';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-skip)] focus:rounded focus:bg-rigging-500 focus:px-4 focus:py-2 focus:text-white hover:bg-rigging-600 active:opacity-80"
      >
        Skip to Content
      </a>
      <StormBanner />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CallRail />
      <ClickSpark />
    </div>
  );
}
