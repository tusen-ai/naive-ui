import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      thingHeaderTextColor,
      thingTextColor,
      strongFontWeight
    } = props.$local
    return cTB('thing', {
      raw: `
        display: flex;
        transition: color .3s ${easeInOutCubicBezier};
        font-size: 14px;
      `,
      color: thingTextColor
    }, [
      cB('thing-avatar', {
        raw: `
          margin-right: 12px;
          margin-top: 2px;
        `
      }),
      cB('thing-avatar-header-wrapper', {
        raw: `
          display: flex;
          flex-wrap: nowrap;
        `
      }, [
        cB('thing-avatar-header-wrapper', {
          raw: `
            flex: 1;
          `
        })
      ]),
      cB('thing-main', {
        raw: `
          flex-grow: 1;
        `
      }, [
        cB('thing-header', {
          raw: `
            display: flex;
            margin-bottom: 4px;
            justify-content: space-between;
            align-items: center;
          `
        }, [
          cE('title', {
            raw: `
              font-size: 16px;
              font-weight: ${strongFontWeight};
              transition: color .3s ${easeInOutCubicBezier};
            `,
            color: thingHeaderTextColor
          })
        ]),
        cE('description', [
          c('&:not(:last-child)', {
            raw: `
              margin-bottom: 4px;
            `
          })
        ]),
        cE('content', [
          c('&:not(:first-child)', {
            raw: `
              margin-top: 12px;
            `
          })
        ]),
        cE('footer', [
          c('&:not(:first-child)', {
            raw: `
              margin-top: 12px;
            `
          })
        ]),
        cE('action', [
          c('&:not(:first-child)', {
            raw: `
              margin-top: 12px;
            `
          })
        ])
      ])
    ])
  }
])
