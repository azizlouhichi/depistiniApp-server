/**
 *
 * @param amount number
 * @param inCent pass true if working with `stripe`
 * @param lang
 * @param countryCode
 * @param currency
 * @returns
 */
export const formatAmount = (amount = 0, inCent = false, lang = 'fr', countryCode = 'FR', currency = 'EUR') => {
  const finalAmount = inCent ? amount / 100 : amount;
  return (
    new Intl.NumberFormat(`${lang}-${countryCode}`, {
      style: 'currency',
      currency: currency,
    })
      .format(finalAmount)
      // hack for pdf see #https://github.com/foliojs/pdfkit/issues/1071
      .replace(String.fromCharCode(8239), String.fromCharCode(32))
  );
};
/**
 *
 * @param value between `0` and `1`
 * @returns string
 */
export const formatPercent = (value = 0) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
  }).format(value);
};
/**
 *
 * @param value
 * @param lang
 * @param countryCode
 * @returns
 */
export const formatNumber = (value = 0, lang = 'fr', countryCode = 'FR') => {
  return new Intl.NumberFormat(`${lang}-${countryCode}`).format(value);
};
/**
 *
 * @param date
 * @param options
 * @param lang
 * @param countryCode
 * @returns
 */
export const formatDate = (
  date = new Date(),
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  },
  lang = 'fr',
  countryCode = 'FR',
) => new Intl.DateTimeFormat(`${lang}-${countryCode}`, options).format(date);
/**
 *
 * @param date
 * @param options
 * @param lang
 * @param countryCode
 * @returns
 */
export const formatDateTime = (date = new Date(), options: Intl.DateTimeFormatOptions = {}, lang = 'fr', countryCode = 'FR') => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Intl.DateTimeFormat(`${lang}-${countryCode}`, { ...defaultOptions, ...options }).format(date);
};
