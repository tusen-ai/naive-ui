import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'

function timelineTypemixin (type, pallete) {
  return cM(`${type}-type`, [
    cB('timeline-item-timeline', [
      cE('circle', {
        raw: `
          border-color: ${pallete[createKey('circleBorderColor', type)]}
        `
      })
    ])
  ])
}

function timelineSizeMixin (size, pallete) {
  return cM(`${size}-size`, [
    cB('timeline-item', [
      cB('timeline-item-content', [
        cE('title', {
          raw: `
            margin-top: ${pallete.marginTop[size]};
            font-size: ${pallete.fontSize[size]}
          `
        })
      ])
    ])
  ])
}

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      titleColor,
      contentColor,
      metaColor,
      lineColor,
      strongFontWeight
    } = props.$local
    const pallete = props.$local
    return cTB('timeline', {
      raw: `
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
      `
    }, [
      ['medium', 'large'].map(size => timelineSizeMixin(size, pallete)),
      cM('right-placement', [
        cB('timeline-item', [
          cB('timeline-item-content', {
            raw: `
              text-align: right;
              margin-right: 26px;
            `
          }),
          cB('timeline-item-timeline', {
            raw: `
              width: 14px;
              right: 0;
            `
          })
        ])
      ]),
      cM('left-placement', [
        cB('timeline-item', [
          cB('timeline-item-content', {
            raw: `
              margin-left: 26px;
            `
          }),
          cB('timeline-item-timeline', {
            raw: `
              left: 0;
            `
          })
        ])
      ]),
      cB('timeline-item', {
        raw: `
          position: relative;
        `
      }, [
        ['default', 'success', 'info', 'warning', 'error'].map(type => timelineTypemixin(type, pallete)),
        c('&:last-child', [
          cB('timeline-item-timeline', [
            cE('line', {
              raw: `
                display: none;
              `
            })
          ])
        ]),
        cB('timeline-item-content', [
          cE('title', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
              font-size: 14px;
              font-weight: ${strongFontWeight};
              margin-bottom: 6px;
              color: ${titleColor};
            `
          }),
          cE('content', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
              font-size: 14px;
              color: ${contentColor};
            `
          }),
          cE('meta', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
              font-size: 12px;
              margin-top: 6px;
              margin-bottom: 20px;
              color: ${metaColor};
            `
          })
        ]),
        cB('timeline-item-timeline', {
          raw: `
            width: 26px;
            position: absolute;
            top: 2px;
            bottom: 0;
            height: 100%;
          `
        }, [
          cE('circle', {
            raw: `
              transition: background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
              width: 14px;
              height: 14px;
              border-radius: 7px;
              box-sizing: border-box;
              border-style: solid;
              border-width: 2px;
            `
          }),
          cE('line', {
            raw: `
              transition: background-color .3s ${easeInOutCubicBezier};
              position: absolute;
              top: 14px;
              left: 6px;
              bottom: 0px;
              width: 2px;
              background-color: ${lineColor};
            `
          })
        ])
      ])
    ])
  }
])
