import { Link } from 'react-router-dom';
import PageHeader from '../sections/PageHeader';
import { company } from '../../content/company';

/** One layout for both legal pages: a heading per section, in reading order. */
export default function LegalPage({ eyebrow, title, intro, updated, sections, children }) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        crumbs={[{ name: 'Home', path: '/' }]}
      />
      <section className="py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="label">Last updated {updated}</p>
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="mt-10">
              <h2 className="display h2 text-heading">{section.heading}</h2>
              <div className="prose-body mt-4 text-[1.02rem] leading-relaxed text-body">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
          {children}
          <p className="mt-12 border-t border-line pt-6 text-[0.95rem] text-body">
            Questions about any of this: call{' '}
            <a href={`tel:${company.phoneHref}`} className="link-inline">
              {company.phone}
            </a>
            , or see the{' '}
            <Link to="/contact" className="link-inline">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
