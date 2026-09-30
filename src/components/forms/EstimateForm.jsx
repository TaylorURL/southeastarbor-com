import { useState } from 'react';

const fields = [
  { id: 'name', label: 'Your Name', type: 'text', autoComplete: 'name', required: true },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true },
  {
    id: 'address',
    label: 'Street Address of the Tree',
    type: 'text',
    autoComplete: 'street-address',
    required: true,
  },
];

/**
 * Four fields and a photo. The address is asked for because a tree estimate is
 * a site visit, and the photo is asked for because it is the single thing that
 * turns "we'll come look" into a number on the phone.
 *
 * The submit is wired to a handler rather than a live endpoint in this build;
 * point `action` at the project's own function before it goes anywhere near a
 * real visitor.
 */
export default function EstimateForm({ compact = false }) {
  const [sent, setSent] = useState(false);
  // Which required fields the browser refused, so each is marked with more than
  // a colour: a thicker border, aria-invalid, and a line saying what is missing.
  const [invalid, setInvalid] = useState({});
  const markInvalid = (event) =>
    setInvalid((current) => ({ ...current, [event.target.name]: true }));
  const clearInvalid = (event) =>
    invalid[event.target.name] &&
    setInvalid((current) => ({ ...current, [event.target.name]: false }));

  if (sent) {
    return (
      <div className="card p-7">
        <h2 className="display h3 text-heading">Got it.</h2>
        <p className="mt-3 leading-relaxed text-body">
          Terry will call you back. If the tree is on a structure or across a drive, call rather
          than wait on this form.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card flex flex-col gap-5 p-6 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {!compact && <h2 className="display h2 text-heading">Free Estimate</h2>}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-[0.82rem] font-semibold text-body"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              aria-invalid={invalid[field.id] ? 'true' : undefined}
              aria-describedby={invalid[field.id] ? `${field.id}-error` : undefined}
              onInvalid={markInvalid}
              onInput={clearInvalid}
              className="field"
            />
            {invalid[field.id] && (
              <p
                id={`${field.id}-error`}
                className="mt-1.5 text-[0.8rem] font-medium text-accent-ink"
              >
                {field.label} is needed to call you back.
              </p>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="work" className="mb-1.5 block text-[0.82rem] font-semibold text-body">
            What Needs Doing?
          </label>
          <textarea id="work" name="work" rows={4} className="field" />
        </div>
        <div>
          <label htmlFor="photo" className="block text-[0.82rem] font-semibold text-body">
            Photo of the Tree
          </label>
          <p id="photo-help" className="mb-1.5 mt-1.5 text-[0.78rem] text-body">
            Optional, and the fastest route to a real number.
          </p>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            aria-describedby="photo-help"
            className="min-h-11 w-full text-[0.85rem] text-body file:mr-3 file:rounded-[4px] file:border-0 file:cursor-pointer file:bg-raised file:px-3 file:py-2 file:text-[0.85rem] file:font-semibold file:text-link"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full text-[1.02rem]">
        Send It to Terry
      </button>
      <p className="text-center text-[0.78rem] text-body">
        No charge for the estimate, and no obligation after it.
      </p>
    </form>
  );
}
