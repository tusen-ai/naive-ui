import { c, cB, cM } from '../../../_utils/cssr'

export default cB('form', [
  cM('inline', `
    width: 100%;
    display: inline-flex;
    align-items: flex-start;
    align-content: space-around;
  `, [
    cB('form-item', {
      width: 'auto',
      marginRight: '18px'
    }, [
      c('&:last-child', {
        marginRight: 0
      })
    ])
  ])
])
