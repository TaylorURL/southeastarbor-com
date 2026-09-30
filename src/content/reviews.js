/**
 * Quotes carried over from the profiles that already hold them -- BBB, Yelp and
 * Nextdoor. They are here rather than in a widget because a third-party review
 * script is render-blocking, ships no text a crawler can read, and disappears
 * the day the vendor changes their embed.
 *
 * Once the Google profile is consolidated this becomes the place new reviews
 * land, and the aggregate rating in the structured data reads its count from
 * `reviewTotals` below.
 */
export const reviewTotals = {
  rating: 5,
  /**
   * The total across every platform runs into the thousands, with no exact
   * figure yet, so the structured data carries no aggregateRating until one
   * exists. The public profiles alone held 68 BBB, 29 Yelp and 3 Google on
   * 21 Sep 2026.
   */
  count: null,
  label: 'Thousands of reviews',
  sources: 'every platform we are listed on',
};

export const reviews = [
  {
    quote:
      'I spoke with Terri, who took the time to listen to my concerns about the oversized tree I had been wanting to remove for quite some time. I could not be happier with the experience.',
    snippet:
      '…took the time to listen to my concerns about the oversized tree… I could not be happier with the experience.',
    author: 'Diane M.',
    where: 'Google · 6 months ago',
  },
  {
    quote:
      'Thank you for giving all my trees a haircut! What a great crew you have. Very skilled and fast workers, and they left my yard looking better than what I started with.',
    snippet:
      'What a great crew you have… they left my yard looking better than what I started with.',
    author: 'Jennifer C.',
    where: 'Google · 5 months ago',
  },
  {
    quote: 'Excellent service. Great communication. Highly recommend.',
    author: 'Stephanie N.',
    where: 'Google · 9 months ago',
  },
];
