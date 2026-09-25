import { Link } from 'react-router-dom';
import { company } from '../../content/company';

export default function EstimateCta({
  heading = 'Send a photo of the tree. Get a number back the same day.',
  body = 'Estimates are free, and there is no charge until the work is finished and the yard is clean.',
}) {
  return (
    <section className="bg-canopy-800">
      <div className="shell flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 className="display h1 text-paper-50">{heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-moss-200">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link to="/free-estimate" className="btn btn-primary text-[1.05rem]">
            Get a Free Estimate
          </Link>
          <a href={`tel:${company.phoneHref}`} className="btn btn-ghost text-[1.05rem]">
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
