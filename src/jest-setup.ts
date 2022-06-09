import { isBrowser } from './_utils'

// https://github.com/jsdom/jsdom/issues/1422
if (isBrowser) {
  HTMLDivElement.prototype.scrollTo = () => {}
}
