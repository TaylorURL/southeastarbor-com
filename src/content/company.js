/**
 * Every business fact the site states lives here, so a detail that changes -- a
 * phone number, an hour, a town -- is one edit rather than a search across
 * pages. An empty value is how a fact that is not established yet is held;
 * never put a plausible value in a field to fill it, because it will be
 * published as fact.
 *
 * The hours below are the ones on the Google Business Profile and on Yelp. The
 * old Hibu site said Monday to Friday 8-5 and closed weekends, which
 * contradicted both; one set of hours has to win, and the listings are what a
 * caller sees first.
 */
const buildEnv = (typeof import.meta === 'object' && import.meta.env) || {};
const siteUrl = buildEnv.VITE_SITE_URL || 'https://southeastarbor.com';

export const company = {
  legalName: 'Southeast Arbor Care',
  name: 'Southeast Arbor Care',
  url: siteUrl,
  tagline: 'Tree removal, trimming and stump grinding in Pasadena, Texas',
  owner: 'Terry Lloyd',
  phone: '(713) 472-1488',
  phoneHref: '+17134721488',
  email: '',

  address: {
    street: '3322 Thornwood Dr',
    city: 'Pasadena',
    state: 'TX',
    zip: '77503',
    geo: { latitude: 29.6965254, longitude: -95.1636771 },
  },

  hours: [
    { days: 'Monday – Saturday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  /** Schema.org spelling of the same hours. */
  openingHours: ['Mo-Sa 08:00-18:00'],
  afterHoursNote: 'Storm and emergency calls are answered after hours.',

  /**
   * Flip to true in the days after a named storm. It puts the emergency bar
   * above every page and nothing else changes, so turning it off again is one
   * edit rather than an archaeology exercise in December.
   */
  stormMode: false,

  foundedYear: 2000,
  credentials: ['BBB accredited since 2016, rated A+', 'Fully insured in the State of Texas'],

  /** Filled in as each profile is claimed and verified. */
  social: {
    google: '',
    facebook: 'https://www.facebook.com/southeastarborcare/',
    nextdoor: 'https://nextdoor.com/pages/southeast-arbor-care-pasadena-tx/',
    yelp: 'https://www.yelp.com/biz/southeast-arbor-care-pasadena',
    bbb: 'https://www.bbb.org/us/tx/pasadena/profile/tree-service/southeast-arbor-care-0915-22000862',
  },
};

export const hasAddress = Boolean(company.address.street && company.address.city);
export const yearsInBusiness = new Date().getFullYear() - company.foundedYear;
