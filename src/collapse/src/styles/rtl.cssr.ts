import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('collapse', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('collapse-item', [
      cB('collapse-item', {
        marginRight: '32px',
        marginLeft: 0
      }),
      cM('left-arrow-placement', [
        cE('header', [
          cB('collapse-item-arrow', {
            marginRight: 0,
            marginLeft: '4px'
          })
        ])
      ]),
      cM('right-arrow-placement', [
        cE('header', [
          cB('collapse-item-arrow', {
            marginLeft: 0,
            marginRight: '4px'
          })
        ])
      ]),
      cM('active', [
        cE('header', [
          cM('active', [
            cB('collapse-item-arrow', {
              transform: 'rotate(-90deg)'
            })
          ])
        ])
      ])
    ])
  ])
])
