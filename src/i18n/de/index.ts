// Sammeldatei aller Textbereiche (WP-01). Jeder Bereich liegt in einer eigenen Datei,
// die genau einem Arbeitspaket gehört (siehe docs/pakete/README.md#zuständigkeitsmatrix).
//
// Wichtig: In den Bereichsdateien kein `as const` verwenden. Sonst wären die Typen die
// deutschen Texte selbst, und eine englische Fassung könnte den Typ `Dictionary` nie erfüllen.

export { about } from './about';
export { common } from './common';
export { contact } from './contact';
export { faq } from './faq';
export { hero } from './hero';
export { legal } from './legal';
export { navigation } from './navigation';
export { process } from './process';
export { projectDetail } from './projectDetail';
export { projects } from './projects';
export { seo } from './seo';
export { services } from './services';
