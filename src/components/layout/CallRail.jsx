import { Link } from 'react-router-dom';
import { company } from '../../content/company';

/**
 * On a phone the two things a visitor wants are the number and a form, and on
 * the old site both were a scroll away from wherever you landed. This bar is
 * phone-only and sits above the safe-area inset so it clears the home
 * indicator; `main` carries matching bottom padding so it never covers the
 * footer's last line.
 */
export default function CallRail() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-canopy-800 bg-bark-950 sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <a
        href={`tel:${company.phoneHref}`}
        className="py-3.5 text-center font-semibold text-paper-50"
      >
        Call {company.phone}
      </a>
      <Link
        to="/free-estimate"
        className="bg-rigging-500 py-3.5 text-center font-semibold text-white"
      >
        Free Estimate
      </Link>
    </div>
  );
}
