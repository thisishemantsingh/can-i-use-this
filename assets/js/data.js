/* ==========================================================================
   Can I Use This? — prototype dataset
   --------------------------------------------------------------------------
   All records below are ILLUSTRATIVE SAMPLE DATA created for interface
   demonstration. They are not a live index of licensed works, and the licence
   labels have not been verified against any rights holder. Replace this file
   with responses from verified creative-content APIs before production use.
   ========================================================================== */

/* Reuse-status vocabulary shared by the search results and music list. */
const REUSE = {
  free:        { label: 'Free to reuse',        badge: 'badge-free' },
  attribution: { label: 'Reuse with credit',    badge: 'badge-attribution' },
  limited:     { label: 'Limited reuse',        badge: 'badge-limited' },
  permission:  { label: 'Permission required',  badge: 'badge-permission' }
};

/* Decorative card gradients — keyed so a record's visual stays stable. */
const SWATCHES = {
  moss:   'linear-gradient(135deg,#135C43,#2C8A66)',
  olive:  'linear-gradient(135deg,#4A5B12,#9BB833)',
  clay:   'linear-gradient(135deg,#A83C35,#D8776C)',
  amber:  'linear-gradient(135deg,#B4802A,#F3BF57)',
  ink:    'linear-gradient(135deg,#16231E,#3C544A)',
  bloom:  'linear-gradient(135deg,#5C1343,#B4569A)',
  tide:   'linear-gradient(135deg,#14485C,#4FA9C4)',
  sand:   'linear-gradient(135deg,#8A7A56,#E0D2AE)'
};

const CREATIVE_WORKS = [
  {
    id: 'cw-01',
    title: 'Monsoon Rooftops, Study No. 4',
    type: 'image',
    category: 'Photography',
    style: 'Soft-focus documentary frames of Mumbai terraces in low monsoon light, heavy grain.',
    licence: 'CC BY',
    licenceLabel: 'Creative Commons Attribution 4.0',
    reuse: 'attribution',
    platform: 'Independent',
    source: 'Independent creator',
    swatch: 'tide'
  },
  {
    id: 'cw-02',
    title: 'Botanical Plates, 1889 Herbarium',
    type: 'image',
    category: 'Archive Illustration',
    style: 'Hand-inked plant lithographs with hand-lettered Latin names on aged stock.',
    licence: 'CC0',
    licenceLabel: 'CC0 — public domain dedication',
    reuse: 'free',
    platform: 'Archive',
    source: 'Museum open archive',
    swatch: 'olive'
  },
  {
    id: 'cw-03',
    title: 'Everything Ends Softly — Launch Film',
    type: 'video',
    category: 'Brand Campaign',
    style: 'Slow-dolly interiors, muted dialogue, single sustained cello note under voiceover.',
    licence: 'All Rights Reserved',
    licenceLabel: 'All rights reserved — brand owned',
    reuse: 'permission',
    platform: 'Brand',
    source: 'Brand channel',
    swatch: 'ink'
  },
  {
    id: 'cw-04',
    title: 'Bold Type Stories — Editorial Kit',
    type: 'campaign',
    category: 'Typography System',
    style: 'Oversized display serif over flat colour blocks, one sentence per frame.',
    licence: 'CC BY-NC',
    licenceLabel: 'CC BY-NC — non-commercial only',
    reuse: 'limited',
    platform: 'Social',
    source: 'Design collective',
    swatch: 'clay'
  },
  {
    id: 'cw-05',
    title: 'Analog Future (Loop Pack)',
    type: 'music',
    category: 'Instrumental Loops',
    style: 'Tape-saturated synth arpeggios with detuned drift and vinyl noise floor.',
    licence: 'Commercial',
    licenceLabel: 'Commercially licensed — royalty free',
    reuse: 'free',
    platform: 'Stock',
    source: 'Licensed library',
    swatch: 'bloom'
  },
  {
    id: 'cw-06',
    title: 'Soft Surrealism Poster Series',
    type: 'image',
    category: 'Digital Illustration',
    style: 'Impossible architecture in pastel gradients, oversized fruit, long soft shadows.',
    licence: 'CC BY',
    licenceLabel: 'Creative Commons Attribution 4.0',
    reuse: 'attribution',
    platform: 'Independent',
    source: 'Independent creator',
    swatch: 'sand'
  },
  {
    id: 'cw-07',
    title: 'Quiet Interfaces — Product Reel',
    type: 'video',
    category: 'Motion Design',
    style: 'Near-silent UI choreography, single accent colour, generous negative space.',
    licence: 'Commercial',
    licenceLabel: 'Commercially licensed — editorial + ads',
    reuse: 'free',
    platform: 'Stock',
    source: 'Licensed library',
    swatch: 'moss'
  },
  {
    id: 'cw-08',
    title: 'Heatwave Cinema — Colour Reference',
    type: 'video',
    category: 'Film Grade',
    style: 'Blown-out highlights, orange haze, handheld frames at midday with visible shimmer.',
    licence: 'All Rights Reserved',
    licenceLabel: 'All rights reserved — studio owned',
    reuse: 'permission',
    platform: 'Brand',
    source: 'Film studio',
    swatch: 'amber'
  },
  {
    id: 'cw-09',
    title: 'Field Recordings: Rain on Tin',
    type: 'music',
    category: 'Sound Design',
    style: 'Unprocessed rain and metal resonance, 24-bit, usable as ambient bed or texture.',
    licence: 'CC0',
    licenceLabel: 'CC0 — public domain dedication',
    reuse: 'free',
    platform: 'Archive',
    source: 'Open sound archive',
    swatch: 'tide'
  },
  {
    id: 'cw-10',
    title: 'Raw Botanica — Retail Campaign',
    type: 'campaign',
    category: 'Integrated Campaign',
    style: 'Unstyled produce on raw paper, visible dirt, hand-set condensed captions.',
    licence: 'All Rights Reserved',
    licenceLabel: 'All rights reserved — agency owned',
    reuse: 'permission',
    platform: 'Brand',
    source: 'Agency case study',
    swatch: 'olive'
  },
  {
    id: 'cw-11',
    title: 'Biolume Noir — Key Art Set',
    type: 'image',
    category: 'Concept Art',
    style: 'Bioluminescent accents against near-black scenes, cold rim light, wet surfaces.',
    licence: 'CC BY-NC',
    licenceLabel: 'CC BY-NC — non-commercial only',
    reuse: 'limited',
    platform: 'Social',
    source: 'Independent creator',
    swatch: 'ink'
  },
  {
    id: 'cw-12',
    title: 'Organic Percussion — Session Stems',
    type: 'music',
    category: 'Percussion Stems',
    style: 'Hand drums, clay pots and body percussion recorded in a live room, no quantising.',
    licence: 'CC BY',
    licenceLabel: 'Creative Commons Attribution 4.0',
    reuse: 'attribution',
    platform: 'Independent',
    source: 'Session musicians',
    swatch: 'clay'
  },
  {
    id: 'cw-13',
    title: 'Public Records: Civic Poster Archive',
    type: 'image',
    category: 'Archive Poster',
    style: 'Mid-century government information posters, two-colour litho, condensed sans.',
    licence: 'CC0',
    licenceLabel: 'CC0 — government open archive',
    reuse: 'free',
    platform: 'Archive',
    source: 'National archive',
    swatch: 'sand'
  },
  {
    id: 'cw-14',
    title: 'Nightline — Social Cutdowns',
    type: 'campaign',
    category: 'Social Campaign',
    style: 'Nine-second vertical cutdowns, kinetic captions, single-take talent frames.',
    licence: 'Commercial',
    licenceLabel: 'Commercially licensed — paid social cleared',
    reuse: 'free',
    platform: 'Stock',
    source: 'Licensed library',
    swatch: 'bloom'
  },
  {
    id: 'cw-15',
    title: 'Ambient Interiors, Vol. II',
    type: 'music',
    category: 'Ambient',
    style: 'Long-form pads with room tone, no percussion, designed to sit under dialogue.',
    licence: 'Commercial',
    licenceLabel: 'Commercially licensed — royalty free',
    reuse: 'free',
    platform: 'Stock',
    source: 'Licensed library',
    swatch: 'moss'
  },
  {
    id: 'cw-16',
    title: 'Street Cast Portraits (Unreleased)',
    type: 'image',
    category: 'Portrait Photography',
    style: 'Flash-lit strangers at night, direct eye contact, unretouched skin texture.',
    licence: 'All Rights Reserved',
    licenceLabel: 'All rights reserved — no model releases',
    reuse: 'permission',
    platform: 'Social',
    source: 'Independent creator',
    swatch: 'ink'
  },
  {
    id: 'cw-17',
    title: 'Silent Cinema Reel, 1921',
    type: 'video',
    category: 'Archive Film',
    style: 'Public domain film fragments with visible sprocket damage and hand-tinted frames.',
    licence: 'CC0',
    licenceLabel: 'CC0 — term expired in most jurisdictions',
    reuse: 'free',
    platform: 'Archive',
    source: 'Film preservation archive',
    swatch: 'amber'
  },
  {
    id: 'cw-18',
    title: 'Grain & Gradient — Texture Library',
    type: 'image',
    category: 'Texture Pack',
    style: 'Scanned paper, halftone dust and gradient noise overlays for print-feel layouts.',
    licence: 'CC BY',
    licenceLabel: 'Creative Commons Attribution 4.0',
    reuse: 'attribution',
    platform: 'Independent',
    source: 'Independent creator',
    swatch: 'sand'
  }
];

const TRENDS = [
  {
    name: 'Soft Surrealism',
    category: 'Design',
    desc: 'Dreamlike compositions in pastel light — impossible scale, gentle physics, no hard edges.',
    searchGrowth: '+218%',
    usageGrowth: '+96%',
    mentions: '41.2K',
    saves: '12.8K',
    note: 'The style is not protectable, but generated or illustrated source images may carry their own licence.'
  },
  {
    name: 'Bold Type Stories',
    category: 'Social',
    desc: 'One sentence per frame in oversized display type, colour-blocked and read like a zine.',
    searchGrowth: '+174%',
    usageGrowth: '+131%',
    mentions: '58.6K',
    saves: '19.4K',
    note: 'Typefaces are licensed software — check the foundry EULA before using a font in ads or logos.'
  },
  {
    name: 'Biolume Noir',
    category: 'Film',
    desc: 'Near-black frames lit by a single bioluminescent accent — cold, wet and high contrast.',
    searchGrowth: '+152%',
    usageGrowth: '+64%',
    mentions: '22.9K',
    saves: '8.1K',
    note: 'Grading approaches can be reproduced freely; LUT packs and reference footage usually cannot.'
  },
  {
    name: 'Analog Future',
    category: 'Design',
    desc: 'Tomorrow rendered on yesterday’s hardware — CRT bloom, tape wobble, chunky bezels.',
    searchGrowth: '+143%',
    usageGrowth: '+88%',
    mentions: '36.4K',
    saves: '14.6K',
    note: 'Retro hardware silhouettes and interface skins can still be trademarked or design-registered.'
  },
  {
    name: 'Raw Botanica',
    category: 'Design',
    desc: 'Unstyled produce, visible soil and honest imperfection shot on paper backdrops.',
    searchGrowth: '+128%',
    usageGrowth: '+107%',
    mentions: '27.3K',
    saves: '11.2K',
    note: 'Shoot your own stills where possible — most campaign imagery in this look is agency owned.'
  },
  {
    name: 'Quiet Interfaces',
    category: 'Design',
    desc: 'Near-silent product motion, one accent colour, restraint used as the loudest signal.',
    searchGrowth: '+119%',
    usageGrowth: '+142%',
    mentions: '31.7K',
    saves: '16.9K',
    note: 'Interface layouts are rarely protected, but icon sets and animation packs are licensed assets.'
  },
  {
    name: 'Heatwave Cinema',
    category: 'Film',
    desc: 'Midday shimmer, blown highlights and handheld sweat — climate anxiety as a colour grade.',
    searchGrowth: '+112%',
    usageGrowth: '+58%',
    mentions: '18.5K',
    saves: '6.4K',
    note: 'Recreate the look in-camera; lifting frames from released films needs a licence.'
  },
  {
    name: 'Organic Percussion',
    category: 'Audio',
    desc: 'Hand drums, clay pots and body percussion left unquantised in a live-sounding room.',
    searchGrowth: '+104%',
    usageGrowth: '+121%',
    mentions: '24.1K',
    saves: '9.7K',
    note: 'A rhythm is not a recording — sampling a performance needs master and publishing clearance.'
  }
];

const TRACKS = [
  { name: 'Terminal Bloom',      artist: 'Anay Rao',            dur: '3:12', cat: ['Trending','Electronic'], licence: 'Commercially Licensed',            reuse: 'free' },
  { name: 'Long Room, Low Sun',  artist: 'Meera Sethi',         dur: '4:48', cat: ['Trending','Cinematic'],  licence: 'Creative Commons Attribution',     reuse: 'attribution' },
  { name: 'Clay Pot Ritual',     artist: 'The Undercurrent',    dur: '2:56', cat: ['Trending','Upbeat'],     licence: 'Creative Commons Attribution',     reuse: 'attribution' },
  { name: 'Static Garden',       artist: 'Ilya Vance',          dur: '5:31', cat: ['Trending','Ambient'],    licence: 'CC0',                              reuse: 'free' },
  { name: 'Night Freight',       artist: 'Kesh & Auburn',       dur: '3:44', cat: ['Trending','Electronic'], licence: 'Permission Required',              reuse: 'permission' },
  { name: 'Widow’s Walk',   artist: 'Orchestra Nocturne',  dur: '6:02', cat: ['Cinematic'],             licence: 'Commercially Licensed',            reuse: 'free' },
  { name: 'Third Act Silence',   artist: 'H. Bergqvist',        dur: '4:15', cat: ['Cinematic'],             licence: 'Permission Required',              reuse: 'permission' },
  { name: 'Ledger of Small Wins',artist: 'Priya Nandakumar',    dur: '3:29', cat: ['Cinematic','Upbeat'],    licence: 'Creative Commons Attribution',     reuse: 'attribution' },
  { name: 'Subgrid',             artist: 'MODE//SET',           dur: '3:58', cat: ['Electronic'],            licence: 'CC0',                              reuse: 'free' },
  { name: 'Tape Drift 04',       artist: 'Lo Fidelity Union',   dur: '2:41', cat: ['Electronic','Ambient'],  licence: 'Commercially Licensed',            reuse: 'free' },
  { name: 'Room Tone (Winter)',  artist: 'Field Notes Ensemble',dur: '7:20', cat: ['Ambient'],               licence: 'CC0',                              reuse: 'free' },
  { name: 'Slow Water',          artist: 'Aditi Bhaskar',       dur: '5:08', cat: ['Ambient'],               licence: 'Creative Commons Attribution',     reuse: 'attribution' },
  { name: 'Fluorescent Morning', artist: 'Copy of a Copy',      dur: '2:33', cat: ['Upbeat','Electronic'],   licence: 'Commercially Licensed',            reuse: 'free' },
  { name: 'Hand Claps, Bright',  artist: 'The Undercurrent',    dur: '2:18', cat: ['Upbeat'],                licence: 'Creative Commons Attribution',     reuse: 'attribution' },
  { name: 'Marquee Lights',      artist: 'Sable Youth',         dur: '3:07', cat: ['Upbeat','Trending'],     licence: 'Permission Required',              reuse: 'permission' }
];

/* Licence type → reuse vocabulary + one-line plain-language explanation. */
const LICENCE_NOTES = {
  'CC0':                              'No rights reserved — no permission or credit needed.',
  'Creative Commons Attribution':     'Free to use commercially if you credit the creator as specified.',
  'Commercially Licensed':            'Cleared for commercial use under the library’s terms.',
  'Permission Required':              'Contact the rights holder before any use.'
};

/* Jurisdiction → governing law and official source (see README for citations). */
const LEGAL_SOURCES = {
  india: {
    label: 'India',
    law: 'Copyright Act, 1957',
    section: 'Section 52 — Acts not constituting infringement',
    desc: 'India uses a closed list of "fair dealing" exceptions. Unless your use fits one of the listed purposes — such as private study, criticism, review or reporting current events — it is not covered.',
    url: 'https://copyright.gov.in/Copyright_Act_1957/chapter_xi.html'
  },
  us: {
    label: 'United States',
    law: 'Copyright Act',
    section: 'Section 107 — Fair use',
    desc: 'US fair use is an open, four-factor balancing test: purpose and character of the use, nature of the work, amount used, and effect on the market for the original.',
    url: 'https://www.copyright.gov/fair-use/'
  },
  uk: {
    label: 'United Kingdom',
    law: 'Copyright, Designs and Patents Act 1988',
    section: 'Exceptions to copyright (fair dealing)',
    desc: 'UK fair dealing applies only to defined purposes such as quotation, criticism, review, news reporting, parody, caricature and pastiche — and the amount used must be fair.',
    url: 'https://www.gov.uk/guidance/exceptions-to-copyright'
  },
  eu: {
    label: 'European Union',
    law: 'Directive 2001/29/EC (InfoSoc)',
    section: 'Article 5 — Exceptions and limitations',
    desc: 'EU exceptions are optional for member states, so what is permitted varies by country. Check the national implementation for every market you publish in.',
    url: 'https://eur-lex.europa.eu/eli/dir/2001/29/oj'
  },
  other: {
    label: 'Other or multiple countries',
    law: 'Berne Convention framework + national law',
    section: 'Territory-by-territory assessment',
    desc: 'Copyright is territorial. Publishing across multiple countries means the strictest applicable regime effectively governs your campaign, so clear rights for your widest market.',
    url: 'https://www.wipo.int/treaties/en/ip/berne/'
  }
};
