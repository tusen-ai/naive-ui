import { c, cB, cM, cNotM } from '../../../_utils/cssr/index'

const zero = '0 !important'

function createLeftBorderStyle (type) {
  return cM(type + '-type', [
    c('& +', [
      cB('button', [
        cM(type + '-type', {
          borderLeftWidth: zero
        })
      ])
    ])
  ])
}

function createTopBorderStyle (type) {
  return cM(type + '-type', [
    c('& +', [
      cB('button', [
        cM(type + '-type', {
          borderTopWidth: zero
        })
      ])
    ])
  ])
}

export default c([
  () => cB('button-group', {
    flexWrap: 'nowrap',
    display: 'inline-flex',
    position: 'relative'
  }, [
    cNotM('vertical', {
      flexDirection: 'row'
    }, [
      cB('button', [
        c('&:first-child:not(:last-child)', {
          marginRight: zero,
          borderTopRightRadius: zero,
          borderBottomRightRadius: zero
        }),
        c('&:last-child:not(:first-child)', {
          marginLeft: zero,
          borderTopLeftRadius: zero,
          borderBottomLeftRadius: zero
        }),
        c('&:not(:first-child):not(:last-child)', {
          marginLeft: zero,
          marginRight: zero,
          borderRadius: zero
        }),
        createLeftBorderStyle('default'),
        cM('ghost', [
          createLeftBorderStyle('primary'),
          createLeftBorderStyle('info'),
          createLeftBorderStyle('success'),
          createLeftBorderStyle('warning'),
          createLeftBorderStyle('error')
        ])
      ])
    ]),
    cM('vertical', {
      flexDirection: 'column'
    }, [
      cB('button', [
        c('&:first-child:not(:last-child)', {
          raw: `
          margin-bottom: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        `
        }),
        c('&:last-child:not(:first-child)', {
          raw: `
          margin-top: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          border-top-left-radius: 0 !important;
          border-top-right-radius: 0 !important;
        `
        }),
        c('&:not(:first-child):not(:last-child)', {
          margin: zero,
          borderRadius: zero
        }),
        createTopBorderStyle('default'),
        cM('ghost', [
          createTopBorderStyle('primary'),
          createTopBorderStyle('info'),
          createTopBorderStyle('success'),
          createTopBorderStyle('warning'),
          createTopBorderStyle('error')
        ])
      ])
    ])
  ])
])
