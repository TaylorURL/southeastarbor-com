import { photoSet } from '../lib/photos';

/** A photograph from the site's own set, at the width its slot needs. */
export default function Photo({ src, sizes = '100vw', priority = false, alt = '', ...rest }) {
  const set = photoSet(src);
  return (
    <img
      src={set.src}
      srcSet={set.srcSet}
      sizes={sizes}
      width={set.width}
      height={set.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  );
}
