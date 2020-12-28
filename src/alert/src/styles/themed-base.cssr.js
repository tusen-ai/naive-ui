import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../_styles/transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const {
      $global: { cubicBezierEaseInOut },
      $local
    } = props
    const { borderRadius, titleFontWeight, lineHeight, fontSize } = $local
    return cTB('alert', {
      lineHeight,
      borderRadius,
      position: 'relative',
      transition: `background-color .3s ${cubicBezierEaseInOut}`
    }, [
      ['default', 'info', 'success', 'warning', 'error'].map(type => cM(type + '-type', {
        backgroundColor: $local[createKey('color', type)],
        textAlign: 'start'
      }, [
        cE('close', {
          color: $local[createKey('closeColor', type)]
        }, [
          c('&:hover', {
            color: $local[createKey('closeColorHover', type)]
          }),
          c('&:active', {
            color: $local[createKey('closeColorPressed', type)]
          })
        ]),
        cE('icon', {
          color: $local[createKey('iconColor', type)]
        }),
        cB('alert-body', {
          border: $local[createKey('border', type)]
        }, [
          cE('title', {
            color: $local[createKey('titleTextColor', type)]
          }),
          cE('content', {
            color: $local[createKey('contentTextColor', type)]
          })
        ])
      ])),
      fadeInHeightExpandTranstion({
        originalTransition: `transform .3s ${cubicBezierEaseInOut}`,
        enterToProps: {
          transform: 'scale(1)'
        },
        leaveToProps: {
          transform: 'scale(0.9)'
        }
      }),
      cE('icon', {
        raw: `
          position: absolute;
          left: 12px;
          top: 14px;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
        `
      }, [
        cB('icon', {
          fontSize: '26px'
        })
      ]),
      cE('close', {
        raw: `
          position: absolute;
          right: 16px;
          font-size: 14px;
          top: 14px;
          width: 1em;
          height: 1em;
          line-height: 0;
          transition: color .3s ${cubicBezierEaseInOut};
        `
      }, [
        cB('icon', {
          cursor: 'pointer'
        })
      ]),
      cB('alert-body', {
        borderRadius,
        padding: '15px 15px 15px 47px',
        transition: `border-color .3s ${cubicBezierEaseInOut}`
      }, [
        cE('title', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          fontSize: '16px',
          lineHeight: '19px',
          fontWeight: titleFontWeight
        }, [
          c('& +', [
            cE('content', {
              marginTop: '9px'
            })
          ])
        ]),
        cE('content', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          fontSize
        })
      ]),
      cE('icon', {
        transition: `color .3s ${cubicBezierEaseInOut}`
      }),
      cM('no-icon', [
        cB('alert-body', {
          paddingLeft: '19px'
        })
      ])
    ])
  }
])
