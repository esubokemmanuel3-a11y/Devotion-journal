// Charles Spurgeon, "Morning and Evening" — public domain (source: CCEL).
// Keyed "M-D" (e.g. "1-1" = Jan 1, "9-12" = Sep 12). Each date has a
// morning and an evening entry: { verse, reference, body }.
//
// NOTE: this file currently holds a handful of real sample entries so we
// can build and test against real Spurgeon text. The remaining ~720
// entries still need to be sourced from CCEL and slotted in the same shape
// // EDIT DEVOTIONAL DATA HERE — add the rest of the year below.

export const devotionals = {
  '1-1': {
    morning: {
      verse: 'The path of the just is as the shining light, that shineth more and more unto the perfect day.',
      reference: 'Proverbs 4:18',
      body: `The path of the just as distinguished from the wicked is here spoken of. The righteous man's path is illuminated by heavenly love, and shone upon by the Sun of Righteousness. As he walks in the light, he attracts the attention of others, and his light shines more and more, unto the perfect day. What a promise for the beginning of a new year: that the light you now have is not the whole, but only the dawning. Take courage; the best is yet to come.`,
    },
    evening: {
      verse: 'Everlasting arms.',
      reference: 'Deuteronomy 33:27',
      body: `At the close of another year, our need still is a place of safety, and here it is found, — underneath, all around, everlasting. Not the arm alone, for that might grow weary; but the arms, plural, doubly strong. Not for a season, but everlasting — as enduring as the eternity of God. Rest, this night, in that which never fails.`,
    },
  },
  '9-12': {
    morning: {
      verse: 'My grace is sufficient for thee.',
      reference: '2 Corinthians 12:9',
      body: `If none of God's saints were poor and tried, we should not know half so well the grace that helps in time of need. It is from the black darkness of the mines that we dig the diamonds of his sufficiency. Whatever your trial this morning, take this word into your heart: not "was" nor "shall be," but "is" — a present, standing supply, always equal to the present demand.`,
    },
    evening: {
      verse: 'The Lord will provide.',
      reference: 'Genesis 22:14',
      body: `No prayer is lost. No sigh unheard. No tear unrecorded. Abraham named that mountain after the provision he received there, and every believer has such a mountain of his own — some place where a need was met that seemed impossible to meet. Look back tonight over the year's mercies, and let this be the name you give to this day: the Lord will provide.`,
    },
  },
  '12-31': {
    morning: {
      verse: 'Bring ye all the tithes into the storehouse.',
      reference: 'Malachi 3:10',
      body: `As the year closes, look back honestly at what you have brought, and what you have withheld. God does not ask for surplus; he asks for the whole. This morning, before the year ends, settle the account — not to earn his favor, which is already yours in Christ, but to walk more nearly with him in the year to come.`,
    },
    evening: {
      verse: 'Thou hast crowned the year with thy goodness.',
      reference: 'Psalm 65:11',
      body: `A crown is not a single jewel but many, set together. So this year, look back not at one mercy but the whole circlet of them — mercies you asked for, and many more you did not think to ask. Give thanks tonight, not only for the year that is ending, but for the Hand that has carried you through every day of it.`,
    },
  },
};

// Returns the devotional entry for a given month/day, or null if that
// date hasn't been sourced into the dataset yet.
export function getDevotionalFor(month, day) {
  return devotionals[`${month}-${day}`] ?? null;
}
