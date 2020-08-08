import { c, cE, cB, cM, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      action,
      railBackgroundColor,
      linkBackgroundColor,
      railActiveBackgroundColor
    } = props.$local
    const {
      default: defaultColor,
      hover: hoverColor,
      active: activeColor
    } = action
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('anchor', {
      raw: `
        padding-left: 4px;
        position: relative;
      `
    }, [
      cB('anchor-link-background', {
        raw: `
          position: absolute;
          left: 2px;
          width: 100%;
          max-width: 0;
          border-top-right-radius: 10.5px;
          border-bottom-right-radius: 10.5px;
        `,
        backgroundColor: linkBackgroundColor,
        transition: `
          top .15s ${easeInOutCubicBezier},
          max-width .15s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier}
        `
      }),
      cB('anchor-rail', {
        raw: `
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          border-radius: 2px;
          overflow: hidden;
        `,
        transition: `background-color .3s ${easeInOutCubicBezier}`,
        backgroundColor: railBackgroundColor
      }, [
        cE('bar', {
          raw: `
            position: absolute;
            left: 0;
            width: 4px;
            height: 21px;
            background-color: transparent;
          `,
          transition: `
            top .15s ${easeInOutCubicBezier},
            background-color .3s ${easeInOutCubicBezier}
          `
        }, [
          cM('active', {
            backgroundColor: railActiveBackgroundColor
          })
        ]),
        c('& +', [
          cB('anchor-link', {
            marginTop: 0
          })
        ])
      ]),
      cB('anchor-link', {
        raw: `
          margin-top: .5em;
          padding-left: 16px;
          position: relative;
          line-height: 1.5em;
          font-size: 13px;
          min-height: 1.5em;
          display: flex;
          flex-direction: column;
        `
      }, [
        c('& +', [
          cB('anchor-link', {
            paddingLeft: '16px'
          })
        ]),
        cE('title', {
          raw: `
            outline: none;
            max-width: 100%;
            text-decoration: none;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            display: inline-block;
            padding-right: 16px;
          `,
          transition: `color .3s ${easeInOutCubicBezier}`,
          color: defaultColor
        }, [
          c('&:hover, &:focus', {
            color: hoverColor
          }),
          cM('active', {
            color: activeColor
          })
        ])
      ])
    ])
  }
])
