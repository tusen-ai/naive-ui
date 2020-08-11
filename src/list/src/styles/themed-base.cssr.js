import { cTB, c, cB, cE, cM, namespace } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textColor,
      backgroundColor,
      borderColor,
      borderRadius
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('list', {
      raw: `
      font-size: 14px;
      transition:
        background-color .3s ${easeInOutCubicBezier},
        color .3s ${easeInOutCubicBezier},
        border-color .3s ${easeInOutCubicBezier};
      padding: 0;
      list-style-type: none;
      color: ${textColor};
      `
    }, [
      cM('bordered', {
        raw: `
        background-color: ${backgroundColor['default']};
        border-radius: ${borderRadius};
        border: 1px solid ${borderColor};
        `
      }, [

        cB('list-item', {
          raw: `
        padding: 12px 20px;
        `
        }, [
          c('&:not(:last-child)', {
            raw: `
          border-bottom: 1px solid ${borderColor};
          `
          })
        ]),
        cE('header, footer', {
          raw: `
        padding: 12px 20px;
        `
        }, [
          c('&:not(:last-child)', {
            raw: `
          border-bottom: 1px solid ${borderColor};
          `
          })
        ])
      ]),
      cE('header, footer', {
        raw: `
        padding: 12px 0;
        box-sizing: border-box;
        transition: border-color .3s ${easeInOutCubicBezier};
      `
      }, [
        c('&:not(:last-child)', {
          raw: `
        border-bottom: 1px solid ${borderColor};
        `
        })
      ]),
      cB('list-item', {
        raw: `
        padding: 12px 0;    
        box-sizing: border-box;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        transition: border-color .3s ${easeInOutCubicBezier};
        `
      }, [
        cE('suffix', {
          raw: `
          margin-left: 20px;
          flex: 0;
          `
        }),
        cE('main', {
          raw: `
          flex: 1;
          `
        }),
        c('&:not(:last-child)', {
          raw: `
          border-bottom: 1px solid ${borderColor};
          `
        })
      ])
    ])
  },
  ({ props }) => {
    const {
      backgroundColor
    } = props.$local
    return [
      c(`&.${namespace}-modal-content, &.${namespace}-drawer`, [
        cTB('list', [
          cM('bordered', {
            raw: `
            background-color: ${backgroundColor['modal']}
            `
          })
        ])
      ])
    ]
  }
])
