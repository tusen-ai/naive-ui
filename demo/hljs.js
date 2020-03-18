import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import cpp from 'highlight.js/lib/languages/cpp'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/
    }
  ]
}))

export default hljs
