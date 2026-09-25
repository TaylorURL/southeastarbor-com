import StormBanner from './StormBanner';
import Header from './Header';
import Footer from './Footer';
import CallRail from './CallRail';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-rigging-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <StormBanner />
      <Header />
      <main id="main" className="flex-1 pb-16 sm:pb-0">
        {children}
      </main>
      <Footer />
      <CallRail />
    </div>
  );
}
