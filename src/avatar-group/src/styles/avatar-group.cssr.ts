import { c, cB, cM, cNotM } from '../../../_utils/cssr/index'

// --n-gap
export default cB('avatar-group', `
  flex-wrap: nowrap;
  display: inline-flex;
  position: relative;
`, [
  cM('expand-on-hover', [
    cB('avatar', [
      c('&:not(:first-child)', `
         transition: margin .3s var(--n-bezier);
      `)
    ]),
    c('&:hover', [
      cNotM('vertical', [
        cB('avatar', [
          c('&:not(:first-child)', `
             margin-left: 0 !important;
          `)
        ])
      ]),
      cM('vertical', [
        cB('avatar', [
          c('&:not(:first-child)', `
             margin-top: 0 !important;
          `)
        ])
      ])
    ])
  ]),
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
