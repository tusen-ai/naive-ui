import create from '../../_styles/utils/create-component-base'
import { c } from '../../_utils/cssr'

export default create({
  theme: 'dark',
  name: 'Code',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary
    } = derived
    return {
      textColor: textColorSecondary,
      highlightStyle: [
        c(`
          .hljs-pattern-match,
          .hljs-keyword, .hljs-operator
        `, {
          color: '#F92672'
        }),
        c('.hljs-pattern-match .hljs-constructor', {
          color: '#61aeee'
        }),
        c('.hljs-function', {
          color: '#61aeee'
        }),
        c('.hljs-function .hljs-params', {
          color: '#A6E22E'
        }),
        c('.hljs-function .hljs-params .hljs-typing', {
          color: '#FD971F'
        }),
        c('.hljs-module-access .hljs-module', {
          color: '#7e57c2'
        }),
        c('.hljs-constructor', {
          color: '#e2b93d'
        }),
        c('.hljs-constructor .hljs-string', {
          color: '#9CCC65'
        }),
        c('.hljs-comment, .hljs-quote', {
          color: '#b18eb1',
          fontStyle: 'italic'
        }),
        c('.hljs-doctag, .hljs-formula', {
          color: '#c678dd'
        }),
        c('.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst', {
          color: '#e06c75'
        }),
        c('.hljs-literal', {
          color: '#56b6c2'
        }),
        c('.hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta-string', {
          color: '#98c379'
        }),
        c('.hljs-built_in, .hljs-class .hljs-title', {
          color: '#e6c07b'
        }),
        c('.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number', {
          color: '#d19a66'
        }),
        c('.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title', {
          color: '#61aeee'
        }),
        c('.hljs-emphasis', {
          fontStyle: 'italic'
        }),
        c('.hljs-strong', {
          fontWeight: base.fontWeightStrong
        }),
        c('.hljs-link', {
          textDecoration: 'underline'
        })
      ]
    }
  }
})
