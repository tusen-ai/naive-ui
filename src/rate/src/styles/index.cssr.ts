import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --item-color
// --item-color-active
export default cB('rate', {
  display: 'inline-flex',
  flexWrap: 'nowrap'
}, [
  c('&:hover', [
    cE('item', `
      transition:
        transform .1s var(--bezier),
        color .1s var(--bezier);
    `)
  ]),
  cE('item', `
    display: flex;
    transition:
      transform .1s var(--bezier),
      color .3s var(--bezier);
    transform: scale(1);
    font-size: var(--item-size);
    cursor: pointer;
    color: var(--item-color);
  `, [
    c('&:hover', {
      transform: 'scale(1.05)'
    }),
    c('&:active', {
      transform: 'scale(0.96)'
    }),
    c('&:not(:first-child)', {
      marginLeft: '6px'
    }),
    cM('active', {
      color: 'var(--item-color-active)'
    })
  ])
])
