/**
 * The two legal pages read from here, so the pages stay layout and the wording
 * stays in one place. Every claim describes something the site actually does:
 * the estimate form, the visit counter and the error reporter in index.html,
 * and the host. A claim the code stops making is a false statement on a live
 * legal page, so the two move together.
 */
export const PRIVACY_UPDATED = 'September 2026';

export const PRIVACY_SECTIONS = [
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'The estimate form asks for your name, a phone number, the address of the tree and a description of the job. Nothing else on the site asks you for anything.',
      'The site counts visits: which page was opened, the page you arrived from, your browser, screen size, language and time zone, and how long the page was on screen. It keeps a random number in your browser so a second visit counts as the same visitor rather than a new one. That number is not your name and is not linked to anything you send us.',
      'When a page breaks in your browser, the error, the page address and the browser version are recorded so the problem can be fixed. That record carries no name and no phone number.',
    ],
  },
  {
    id: 'why-we-collect-it',
    heading: 'Why we collect it',
    body: [
      'To answer you. An estimate request is used to call you back, walk the job and quote it, and for nothing else.',
      'Visit counts and error records tell us which pages people use and when one stops working.',
      'We do not sell anything you send us or anything the site records.',
    ],
  },
  {
    id: 'who-else-sees-it',
    heading: 'Who else sees it',
    body: [
      'The site is built and run for us by TaylorURL, a web studio. The visit counter and the error reporter are theirs, and they can see those records in order to keep the site working.',
      'The site is hosted on Vercel, which keeps standard server logs of the requests it answers.',
      'The review and profile links lead to Google, Yelp, the BBB, Facebook and Nextdoor. Those sites run under their own privacy policies once you open them.',
    ],
  },
  {
    id: 'your-choices',
    heading: 'Your choices',
    body: [
      'You can stop the visit counter in this browser with the switch below. It stays off until you clear the site data for this browser.',
      'Call us and ask for a copy of anything we hold about you, a correction, or for it to be deleted.',
    ],
  },
];

export const TERMS_UPDATED = 'September 2026';

export const TERMS_SECTIONS = [
  {
    id: 'what-this-covers',
    heading: 'What this covers',
    body: [
      'These terms cover the use of this website. They are not a contract for tree work. A job is governed by the written estimate you accept for it.',
    ],
  },
  {
    id: 'what-the-site-says',
    heading: 'What the site says',
    body: [
      'Service descriptions on this site describe the work we normally do. They are a starting point for a conversation, not a price or an offer, and the only figure that binds either of us is the one on a written estimate.',
      'Sending the estimate form asks us to call you. It does not book a visit or reserve a date until we have spoken.',
      'The photographs on the gallery page are licensed stock images standing in for our own job photographs, and are labelled as such on that page.',
    ],
  },
  {
    id: 'using-the-site',
    heading: 'Using the site',
    body: [
      'Read it, print it, send it to a neighbour. Do not scrape it, republish it as your own, or use the form to send anything you would not want a person to read.',
    ],
  },
  {
    id: 'other-sites',
    heading: 'Other sites',
    body: [
      'Review and profile links lead to sites we do not run. What happens there is between you and them.',
    ],
  },
  {
    id: 'availability',
    heading: 'Availability',
    body: [
      'We keep the site up and correct as best we can. It can still be down, and a page can still be out of date. When the answer matters, call and get it from a person.',
    ],
  },
];
