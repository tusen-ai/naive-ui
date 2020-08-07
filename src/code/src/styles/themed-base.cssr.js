import { c, cTB, cB, prefix } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const local = props.$local
    const { monoFontFamily, easeInOutCubicBezier, strongFontWeight } = props.$base
    const {
      codeTextColor
    } = local
    return [
      cTB(
        'code',
        [
          c('[class^=hljs]', {
            color: codeTextColor
          })
        ]),
      cB('code', {
        raw: `
          margin: 0;
          font-size: 14px;
          font-family: ${monoFontFamily};
        `
      },
      [
        c('code', {
          fontFamily: monoFontFamily
        }),
        c('[class^=hljs]', {
          transition: `
            color .3s ${easeInOutCubicBezier},
            background-color .3s ${easeInOutCubicBezier}
          `
        }),
        c(`&${prefix}light-theme`,
          [
            c('hljs', {
              raw: `
                display: block;
                overflow-x: auto;
                padding: 0.5em;
                background: #fafafa;
              `
            }),
            c('.hljs-comment, .hljs-quote', {
              raw: `
                color: #a0a1a7;
                font-style: italic;
              `
            }),
            c('.hljs-doctag, .hljs-keyword, .hljs-formula', {
              raw: `
                color: #a626a4;
              `
            }),
            c(`.hljs-section, 
              .hljs-name,
              .hljs-selector-tag,
              .hljs-deletion,
              .hljs-subst`, {
              raw: `
                color: #e45649;
              `
            }),
            c('.hljs-literal', {
              raw: `
                color: #0184bb;
              `
            }),
            c(`.hljs-string,
              .hljs-regexp,
              .hljs-addition,
              .hljs-attribute,
              .hljs-meta-string`, {
              color: `#50a14f`
            }),
            c(`.hljs-built_in,
            .hljs-class .hljs-title`, {
              color: `#c18401`
            }),
            c(`.hljs-attr,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-type,
            .hljs-selector-class,
            .hljs-selector-attr,
            .hljs-selector-pseudo,
            .hljs-number`, {
              color: `#986801`
            }),
            c(`.hljs-symbol,
            .hljs-bullet,
            .hljs-link,
            .hljs-meta,
            .hljs-selector-id,
            .hljs-title`, {
              color: `#4078f2`
            }),
            c('.hljs-emphasis', {
              fontStyle: `italic`
            }),
            c('.hljs-strong', {
              fontWeight: strongFontWeight
            }),
            c('.hljs-link', {
              textDecoration: 'underline'
            }),
            c(`.hljs-function .hljs-params, .hljs-function .hljs-params .hljs-typing`, {
              color: `#383a42`
            })

          ]),
        c(`&${prefix}dark-theme`,
          [
            c('hljs', {
              raw: `
                display: block;
                overflow-x: auto;
                padding: 0.5em;
                line-height: 1.3em;
                color: #abb2bf;
                background: #282c34;
              `
            }),
            c('.hljs-comment, .hljs-quote', {
              raw: `
                color: #61aeee;
                font-style: italic;
              `
            }),
            c('.hljs-pattern-match, .hljs-keyword, .hljs-operator', {
              raw: `
                color: #F92672;
              `
            }),
            c(`.hljs-section, 
              .hljs-name,
              .hljs-selector-tag,
              .hljs-deletion,
              .hljs-subst`, {
              raw: `
                color: #A6E22E;
              `
            }),
            c('.hljs-literal', {
              raw: `
                color: #FD971F;
              `
            }),
            c(`.hljs-string,
              .hljs-regexp,
              .hljs-addition,
              .hljs-attribute,
              .hljs-meta-string`, {
              color: `#7e57c2`
            }),
            c(`.hljs-built_in,
            .hljs-class .hljs-title`, {
              color: `#e2b93d`
            }),
            c(`.hljs-attr,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-type,
            .hljs-selector-class,
            .hljs-selector-attr,
            .hljs-selector-pseudo,
            .hljs-number`, {
              color: `#9CCC65`
            }),
            c(`.hljs-symbol,
            .hljs-bullet,
            .hljs-link,
            .hljs-meta,
            .hljs-selector-id,
            .hljs-title`, {
              color: `#b18eb1`
            }),
            c('.hljs-emphasis', {
              fontStyle: `italic`
            }),
            c('.hljs-strong', {
              fontWeight: strongFontWeight
            }),
            c('.hljs-link', {
              textDecoration: 'underline'
            }),
            c(`.hljs-function .hljs-params, .hljs-function .hljs-params .hljs-typing`, {
              color: `#e06c75`
            })

          ])
      ])
    ]
  }
])
