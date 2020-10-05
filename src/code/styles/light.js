import create from '../../_styles/utils/create-component-base'
import { c } from '../../_utils/cssr'

export default create({
  theme: 'light',
  name: 'Code',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary
    } = derived
    return {
      textColor: textColorSecondary,
      highlightStyle: [
        c(`
          .hljs-comment,
          .hljs-quote
        `, {
          raw: `
            color: #a0a1a7;
            font-style: italic;
          `
        }),
        c(`
          .hljs-doctag,
          .hljs-keyword,
          .hljs-formula
        `, {
          color: '#a626a4'
        }),
        c(`
          .hljs-section, 
          .hljs-name,
          .hljs-selector-tag,
          .hljs-deletion,
          .hljs-subst
        `, {
          color: '#e45649'
        }),
        c('.hljs-literal', {
          color: '#0184bb'
        }),
        c(`
          .hljs-string,
          .hljs-regexp,
          .hljs-addition,
          .hljs-attribute,
          .hljs-meta-string
        `, {
          color: `#50a14f`
        }),
        c(`
          .hljs-built_in,
          .hljs-class .hljs-title
        `, {
          color: `#c18401`
        }),
        c(`
          .hljs-attr,
          .hljs-variable,
          .hljs-template-variable,
          .hljs-type,
          .hljs-selector-class,
          .hljs-selector-attr,
          .hljs-selector-pseudo,
          .hljs-number
        `, {
          color: `#986801`
        }),
        c(`
          .hljs-symbol,
          .hljs-bullet,
          .hljs-link,
          .hljs-meta,
          .hljs-selector-id,
          .hljs-title
        `, {
          color: `#4078f2`
        }),
        c('.hljs-emphasis', {
          fontStyle: `italic`
        }),
        c('.hljs-strong', {
          fontWeight: base.fontWeightStrong
        }),
        c('.hljs-link', {
          textDecoration: 'underline'
        }),
        c(`
          .hljs-function .hljs-params,
          .hljs-function .hljs-params .hljs-typing
        `, {
          color: '#383a42'
        })
      ]
    }
  }
})
