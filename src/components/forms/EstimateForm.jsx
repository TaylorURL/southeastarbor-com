import { useState } from 'react';

const fields = [
  { id: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true },
  {
    id: 'address',
    label: 'Street address of the tree',
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

  if (sent) {
    return (
      <div className="card p-7">
        <h2 className="display h3 text-bark-900">Got it.</h2>
        <p className="mt-3 leading-relaxed text-ink-700">
          Terry will call you back. If the tree is on a structure or across a drive, call rather
          than wait on this form.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card p-6 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {!compact && <h2 className="mb-5 display h2 text-bark-900">Free estimate</h2>}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-[0.82rem] font-semibold text-ink-700"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              className="w-full rounded-[3px] border border-tan-300 bg-white px-3 py-2.5 text-bark-900 outline-none focus:border-canopy-700"
            />
          </div>
        ))}
        <div>
          <label htmlFor="work" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-700">
            What needs doing?
          </label>
          <textarea
            id="work"
            name="work"
            rows={4}
            className="w-full rounded-[3px] border border-tan-300 bg-white px-3 py-2.5 text-bark-900 outline-none focus:border-canopy-700"
          />
        </div>
        <div>
          <label htmlFor="photo" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-700">
            Photo of the tree (optional, and the fastest route to a real number)
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="w-full text-[0.85rem] text-ink-700 file:mr-3 file:rounded-[3px] file:border-0 file:bg-paper-100 file:px-3 file:py-2 file:text-[0.85rem] file:font-semibold file:text-canopy-700"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-5 w-full text-[1.02rem]">
        Send It to Terry
      </button>
      <p className="mt-3 text-center text-[0.78rem] text-ink-700">
        No charge for the estimate, and no obligation after it.
      </p>
    </form>
  );
}
