const STAR = 'M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7L8 1.2z';

function Stars({ count = 5 }) {
  return (
    <p className="flex gap-1 text-rigging-500" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <path d={STAR} fill="currentColor" />
        </svg>
      ))}
    </p>
  );
}

/**
 * One published review, the same card wherever reviews are shown. `short` shows
 * the cut a review carries for a page that quotes it in passing.
 */
export default function ReviewCard({ review, short = false }) {
  return (
    <figure className="card flex flex-col gap-5 p-7">
      <Stars />
      <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-heading">
        {short ? (review.snippet ?? review.quote) : review.quote}
      </blockquote>
      <figcaption className="mono text-[0.78rem] uppercase tracking-[0.1em] text-body">
        {review.author} · {review.where}
      </figcaption>
    </figure>
  );
}
