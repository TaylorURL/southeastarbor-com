/**
 * One page per town the trucks actually reach. The old site named five towns in
 * a single sentence on the contact page and had no page for any of them, which
 * is the whole reason it did not appear for "tree service" in any of them.
 *
 * Each entry carries something true about that town's trees rather than the
 * town name swapped into one paragraph. A template that only changes the
 * placename is the thing Google treats as doorway pages.
 */
export const areas = [
  {
    slug: 'pasadena',
    image: '/photos/chipper.jpg',
    name: 'Pasadena',
    zips: '77501 – 77507',
    lede: 'Home base. The shop is on Thornwood Drive, which means most Pasadena calls get looked at the same week.',
    local:
      'Pasadena yards are mostly water oak, live oak, pecan and the loblolly pines that went in when the subdivisions did. The pines are the ones that come down in a hurricane, and the water oaks are the ones that drop limbs long before anyone expects it.',
  },
  {
    slug: 'deer-park',
    image: '/photos/rigging.jpg',
    name: 'Deer Park',
    zips: '77536',
    lede: 'Ten minutes east. We have worked Deer Park as long as we have worked Pasadena.',
    local:
      'Deer Park sits close enough to the refineries that trees take a constant prevailing wind, which shows up as one-sided crowns and a lean that gets worse every year. Corrective pruning early is a great deal cheaper than a removal later.',
  },
  {
    slug: 'la-porte',
    image: '/photos/storm.jpg',
    name: 'La Porte',
    zips: '77571',
    lede: 'Bay-side work, with everything salt air does to a tree factored into the quote.',
    local:
      'Closer to the water the problems change: salt spray burns foliage, the soil holds more water, and storm exposure is higher than it is inland. La Porte trees need more honest assessment of what is worth saving.',
  },
  {
    slug: 'clear-lake-and-webster',
    image: '/photos/oak-canopy.jpg',
    name: 'Clear Lake & Webster',
    zips: '77058, 77598',
    lede: 'The NASA Road 1 corridor, including the older Clear Lake neighborhoods with mature canopy.',
    local:
      'Clear Lake has some of the best mature live oak in the county, planted when the neighborhoods were laid out in the sixties. Those trees are worth keeping, and most of the work out there is careful pruning rather than removal.',
  },
  {
    slug: 'baytown',
    image: '/photos/chainsaw-trunk.jpg',
    name: 'Baytown',
    zips: '77520 – 77523',
    lede: 'East of the ship channel. Scheduled in blocks, so Baytown jobs go out together.',
    local:
      'Baytown runs to older pecan and hackberry, plus the pines that struggle in heavy clay. Hackberry in particular gets brittle with age and is a common storm casualty over fences and sheds.',
  },
  {
    slug: 'southeast-houston',
    image: '/photos/climber-2.jpg',
    name: 'Southeast Houston',
    zips: 'Inside the Beltway',
    lede: 'The southeast side inside Beltway 8, where access is usually the hard part.',
    local:
      'Inner-loop lots are tight, alleys are narrow and there is rarely anywhere to put a chipper. Most of this work is rigged out over the house and carried to the street, which is slower and priced accordingly rather than quoted as a surprise.',
  },
];

export const areaBySlug = (slug) => areas.find((a) => a.slug === slug);
