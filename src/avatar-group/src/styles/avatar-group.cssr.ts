import { c, cB, cM, cNotM } from '../../../_utils/cssr/index'

// --n-gap
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
         margin-left: var(--n-gap);
      `)
    ])
  ]),
  cM('vertical', {
    flexDirection: 'column'
  }, [
    cB('avatar', [
      c('&:not(:first-child)', `
         margin-top: var(--n-gap);
      `)
    ])
  ])
])
