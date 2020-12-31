import { c, cE, cB, cM } from '../../../_utils/cssr'

// vars:
// --link-color
// --link-font-size
// --link-text-color
// --link-text-color-hover
// --link-text-color-active
// --link-text-color-pressed
// --bezier
// --rail-color
// --rail-color-active
export default cB('anchor', `
    padding-left: 4px;
    position: relative;
  `, [
  cB('anchor-link-background', `
    position: absolute;
    left: 2px;
    width: 100%;
    max-width: 0;
    border-top-right-radius: 10.5px;
    border-bottom-right-radius: 10.5px;
    background-color: var(--link-color);
    transition:
      top .15s var(--bezier),
      max-width .15s var(--bezier),
      background-color .3s var(--bezier);
  `),
  cB('anchor-rail', `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    border-radius: 2px;
    overflow: hidden;
    transition: background-color .3s var(--bezier);
    background-color: var(--rail-color);
  `, [
    cE('bar', `
      position: absolute;
      left: 0;
      width: 4px;
      height: 21px;
      background-color: transparent;
      transition: 
        top .15s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      cM('active', {
        backgroundColor: 'var(--rail-color-active)'
      })
    ]),
    c('+', [
      cB('anchor-link', {
        marginTop: 0
      })
    ])
  ]),
  cB('anchor-link', `
    margin-top: .5em;
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
    font-size: var(--link-font-size);
    min-height: 1.5em;
    display: flex;
    flex-direction: column;
  `, [
    c('+', [
      cB('anchor-link', {
        paddingLeft: '16px'
      })
    ]),
    cE('title', `
      outline: none;
      max-width: 100%;
      text-decoration: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      display: inline-block;
      padding-right: 16px;
      transition: color .3s var(--bezier);
      color: var(--link-text-color);
    `, [
      c('&:hover, &:focus', {
        color: 'var(--link-text-color-hover)'
      }),
      c('&:active', {
        color: 'var(--link-text-color-pressed)'
      }),
      cM('active', {
        color: 'var(--link-text-color-active)'
      })
    ])
  ])
])
