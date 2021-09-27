// https://github.com/jsdom/jsdom/issues/1422
if (typeof window !== 'undefined') {
  HTMLDivElement.prototype.scrollTo = () => {}
}
