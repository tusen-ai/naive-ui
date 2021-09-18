import { c, cB, cM, cNotM } from '../../../_utils/cssr/index'

export default cB('avatar-group', `
  flex-wrap: nowrap;
  display: inline-flex;
  position: relative;
`, [
  cNotM('vertical', {
    flexDirection: 'row'
  }, [
    cB('avatar', [
      c('&:not(:first-child)', `
         margin-left: -12px;
      `)
    ])
  ]),
  cM('vertical', {
    flexDirection: 'column'
  }, [
    cB('avatar', [
      c('&:not(:first-child)', `
         margin-top: -12px;
      `)
    ])
  ])
])
