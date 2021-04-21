import { c, cE, cB, cM, cNotM } from '../../../_utils/cssr'

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
// --rail-width
// --link-padding
export default cB('anchor', `
  padding-left: var(--rail-width);
  position: relative;
`, [
  cB('anchor-link-background', `
    position: absolute;
    left: calc(var(--rail-width) / 2);
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
    width: var(--rail-width);
    border-radius: calc(var(--rail-width) / 2);
    overflow: hidden;
    transition: background-color .3s var(--bezier);
    background-color: var(--rail-color);
  `, [
    cE('bar', `
      position: absolute;
      left: 0;
      width: var(--rail-width);
      height: 21px;
      background-color: #0000;
      transition: 
        top .15s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      cM('active', {
        backgroundColor: 'var(--rail-color-active)'
      })
    ])
  ]),
  cNotM('show-rail', [
    c('>', [
      cB('anchor-link', {
        paddingLeft: 0
      })
    ])
  ]),
  cB('anchor-link', `
    padding: var(--link-padding);
    position: relative;
    line-height: 1.5;
    font-size: var(--link-font-size);
    min-height: 1.5em;
    display: flex;
    flex-direction: column;
  `, [
    c('+, >', [
      cB('anchor-link', `
        margin-top: .5em;
      `)
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
