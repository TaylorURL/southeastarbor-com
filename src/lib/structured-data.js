import { company, hasAddress } from '../content/company.js';
import { reviewTotals } from '../content/reviews.js';

/**
 * Structured data is how a service business shows up as a business rather than
 * as a page: the panel with the phone number, the hours and the service area.
 * The previous site emitted a bare `WebSite` block with a name and a URL, which
 * told Google nothing about where the company is or what it does.
 *
 * Google drops a block referencing a field it cannot verify, so an optional
 * field whose source in `company` is blank is omitted rather than emitted empty.
 */
export function treeServiceSchema(areaNames = []) {
  const schema = {
    '@context': 'https://schema.org',
    // TreeService is a LocalBusiness to schema.org; naming both lets a reader
    // that only knows the base type still see a business.
    '@type': ['TreeService', 'LocalBusiness'],
    '@id': `${company.url}/#business`,
    name: company.legalName,
    url: company.url,
    description: company.tagline,
    telephone: company.phone,
    foundingDate: String(company.foundedYear),
  };

  if (hasAddress) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: 'US',
    };
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: company.address.geo.latitude,
      longitude: company.address.geo.longitude,
    };
  }

  if (company.openingHours.length) schema.openingHours = company.openingHours;
  if (areaNames.length) schema.areaServed = areaNames.map((name) => ({ '@type': 'Place', name }));

  const profiles = Object.values(company.social).filter(Boolean);
  if (profiles.length) schema.sameAs = profiles;

  if (reviewTotals.count) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(reviewTotals.rating),
      reviewCount: String(reviewTotals.count),
    };
  }

  return schema;
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.short,
    provider: { '@id': `${company.url}/#business` },
    url: `${company.url}/services/${service.slug}`,
    areaServed: { '@type': 'City', name: 'Pasadena, TX' },
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${company.url}${item.path}`,
    })),
  };
}

/** The site itself, named as the business names itself, and who publishes it. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.url}/#website`,
    name: company.name,
    url: company.url,
    publisher: { '@id': `${company.url}/#business` },
  };
}
