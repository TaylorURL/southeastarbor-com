/**
 * One entry per service, and one page per entry. The old site sold eight
 * services across two pages called "residential" and "commercial", which gave
 * Google nothing to rank for any of them -- including stump grinding, which the
 * homepage advertised and which returned no listing at all in the local pack.
 */
export const services = [
  {
    slug: 'tree-removal',
    image: '/photos/hero-topping.jpg',
    alt: 'A climber roped into the spar, sectioning the trunk down from the top',
    name: 'Tree Removal',
    short: 'Full takedowns in tight yards, over roofs and fences, rigged down piece by piece.',
    intro:
      'Most removals in Pasadena are not open-field drops. They are a water oak eighteen feet from a bedroom, a pine leaning over a neighbour’s fence, a pecan with a split leader above a driveway. Those come down in sections, on rope, with the landing zone controlled.',
    detail: [
      'We rig from the tree rather than parking a crane across your lawn wherever the site allows it, which keeps the grass and the sprinkler heads intact.',
      'Every removal includes hauling. Limbs, trunk rounds and the brush that comes with them leave the same day, and the ground gets raked before the truck does.',
      'If the stump is coming out too, it is quoted on the same visit and usually ground the same week.',
    ],
    bullets: [
      'Takedowns over structures and fences',
      'Same-day debris hauling',
      'Sprinkler and turf protection',
      'Stump grinding quoted with the removal',
    ],
  },
  {
    slug: 'tree-trimming-and-pruning',
    image: '/photos/trimming.jpg',
    alt: 'An arborist in harness working out along a limb above a building',
    name: 'Trimming & Pruning',
    short: 'Crown thinning, deadwood, and clearance from roofs and power drops.',
    intro:
      'A tree that gets trimmed properly lives longer and drops less. A tree that gets topped grows back weak, dense and dangerous, and the Gulf Coast hands you a storm every year to prove it.',
    detail: [
      'Cuts are made at the branch collar so the wound seals. Nothing is topped, and nothing is stripped back to poles.',
      'Clearance work covers roofs, gutters, driveways and the service drop to the house, which is the one most people wait too long on.',
      'Deadwood comes out on the same visit rather than being left for the next one.',
    ],
    bullets: [
      'Crown thinning and raising',
      'Deadwood removal',
      'Roof, gutter and power-drop clearance',
      'No topping, ever',
    ],
  },
  {
    slug: 'stump-grinding',
    image: '/photos/stump.jpg',
    alt: 'Trunk rounds bucked on the lawn with the sawdust still lying around them',
    name: 'Stump Grinding',
    short: 'Ground six to ten inches below grade, chips raked back or hauled off.',
    intro:
      'A ground stump is the difference between a yard that is finished and a yard with a scar in it. We grind well below grade so you can sod it, plant it or run a fence line straight through it.',
    detail: [
      'Standard depth is six to ten inches under the surrounding grade, deeper where something is going back in the same hole.',
      'Surface roots that run out from the stump are ground back as part of the job, not treated as an extra.',
      'Chips either go back in the hole and get topped with soil, or leave on the truck. Your call at the estimate.',
    ],
    bullets: [
      'Six to ten inches below grade',
      'Surface roots included',
      'Chips backfilled or hauled',
      'Access through a standard gate',
    ],
  },
  {
    slug: 'storm-and-emergency',
    image: '/photos/storm.jpg',
    alt: 'A tree uprooted across a residential street after a storm',
    name: 'Storm & Emergency',
    short: 'Hurricane season work: split leaders, hangers, and trees on a roof.',
    urgent: true,
    intro:
      'When a limb is already through the soffit, the useful thing is a truck, not a form. This is the one service on this site where calling beats everything else, and the phone is answered after hours.',
    detail: [
      'We work storm damage across Pasadena, Deer Park, La Porte and the Clear Lake side, with priority on anything over a structure or a drive.',
      'Hangers and split leaders get made safe first, then the cleanup gets scheduled. Making it safe does not wait on an insurance adjuster.',
      'We document the damage with photographs before anything is cut, because your carrier will ask for them.',
    ],
    bullets: [
      'After-hours response',
      'Trees on structures made safe first',
      'Photo documentation for your carrier',
      'Whole-lot debris cleanup',
    ],
  },
  {
    slug: 'lot-clearing',
    image: '/photos/chipper.jpg',
    alt: 'Brush being fed into a chipper on a suburban driveway',
    name: 'Lot Clearing',
    short: 'Residential and commercial lots cleared to grade for building or fencing.',
    intro:
      'Clearing a lot is a different job from taking down a tree, and pricing it by the tree is how people end up surprised. We walk it, count it and quote the lot.',
    detail: [
      'Residential lots, commercial pads, fence lines and right-of-way. Cleared to grade or selectively thinned, whichever the plan calls for.',
      'Specimen trees worth keeping get flagged before anything starts, so a fifty-year live oak does not go in the chipper by accident.',
      'Commercial work is scheduled around your operating hours rather than ours.',
    ],
    bullets: [
      'Cleared to grade or selectively thinned',
      'Specimen trees flagged and kept',
      'Fence lines and right-of-way',
      'Scheduled around business hours',
    ],
  },
  {
    slug: 'tree-health-and-feeding',
    image: '/photos/oak-canopy.jpg',
    alt: 'Looking up through a mature live oak canopy hung with Spanish moss',
    name: 'Tree Health & Feeding',
    short: 'Deep-root fertilization, disease and pest inspection, cabling and bracing.',
    intro:
      'The cheapest tree work is the work that keeps a tree standing. Gulf Coast soil is heavy clay with a high water table, and a tree that looks thin at the top is usually telling you something about its roots.',
    detail: [
      'Deep-root feeding puts nutrients below the turf layer, where the grass is not competing for them.',
      'Inspections cover the usual regional problems: oak wilt, hypoxylon canker, borers, and root damage from construction or trenching.',
      'Cabling and bracing for a co-dominant leader on a tree that is worth the effort, which is most of the big ones.',
    ],
    bullets: [
      'Deep-root fertilization',
      'Oak wilt and canker inspection',
      'Borer and pest treatment',
      'Cabling and bracing',
    ],
  },
];

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
