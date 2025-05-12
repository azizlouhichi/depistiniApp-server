import i18n from 'i18n';
import path from 'path';
i18n.configure({
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join(__dirname, './', '/locales'),
  parser: JSON,
  // objectNotation: true,
  // syncFiles: true,
  // api: {
  //   __: 'translate',
  //   __n: 'translateN',
  // },
});
export default i18n;
