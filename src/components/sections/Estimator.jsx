import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { access, estimate, jobs, sizes } from '../../content/pricing';
import { company } from '../../content/company';

function Choice({ legend, options, value, onChange, name }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="label mb-2.5">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const id = `${name}-${option.id}`;
          const selected = value === option.id;
          return (
            <label
              key={option.id}
              htmlFor={id}
              className={`cursor-pointer rounded-[3px] border px-3.5 py-2.5 transition-colors ${
                selected
                  ? 'border-rigging-500 bg-rigging-500/10'
                  : 'border-tan-300 bg-white hover:border-moss-500'
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span className="block text-[0.92rem] font-semibold text-bark-900">
                {option.label}
              </span>
              {option.hint && (
                <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-700">
                  {option.hint}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * The one question every caller asks first, answered on the page. It is a range
 * and the page says so twice, because a tool that pretends to quote a tree it
 * has not seen loses the job at the kerb when the real number lands.
 */
export default function Estimator() {
  const [job, setJob] = useState('removal');
  const [size, setSize] = useState('medium');
  const [accessId, setAccessId] = useState('open');

  const result = useMemo(() => estimate({ job, size, accessId }), [job, size, accessId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="space-y-6">
        <Choice legend="What needs doing" name="job" options={jobs} value={job} onChange={setJob} />
        <Choice
          legend="How tall is it"
          name="size"
          options={sizes}
          value={size}
          onChange={setSize}
        />
        <Choice
          legend="Can we get to it"
          name="access"
          options={access}
          value={accessId}
          onChange={setAccessId}
        />
      </div>

      <aside className="sticky top-28 rounded-[4px] border border-canopy-700 bg-bark-950 p-7">
        <p className="label !text-rigging-200">Ballpark</p>
        <p className="mono mt-3 text-[2.4rem] font-semibold leading-none text-paper-50">
          ${result.low.toLocaleString()}
          <span className="px-1.5 text-tan-300">–</span>${result.high.toLocaleString()}
        </p>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-moss-200">
          That is a range for {result.job.toLowerCase()} on a tree like the one described. It is not
          a quote. The written number comes from walking the job, and it is free.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <Link to="/free-estimate" className="btn btn-primary w-full">
            Get the Real Number
          </Link>
          <a href={`tel:${company.phoneHref}`} className="btn btn-ghost w-full">
            Call {company.phone}
          </a>
        </div>
        <Link
          to={`/services/${result.slug}`}
          className="mono mt-5 block text-[0.78rem] uppercase tracking-[0.12em] text-moss-200 underline underline-offset-4 hover:text-paper-50"
        >
          What {result.job} Includes →
        </Link>
      </aside>
    </div>
  );
}
