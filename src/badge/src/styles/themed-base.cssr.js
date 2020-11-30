import { c, cTB, cB, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$global
    return cTB('badge', {
      display: 'inline-flex',
      position: 'relative',
      verticalAlign: 'middle'
    }, [
      cM('as-is', [
        cB('badge-sup', {
          position: 'static',
          transform: 'translateX(0)'
        }, [
          fadeInScaleUpTransition({
            transformOrigin: 'left bottom',
            originalTransform: 'translateX(0)'
          })
        ])
      ]),
      cM('dot', [
        cB('badge-sup', {
          height: '8px',
          width: '8px',
          padding: 0,
          minWidth: '8px',
          left: '100%',
          bottom: 'calc(100% - 4px)'
        }, [
          c('::before', {
            borderRadius: '4px'
          })
        ])
      ]),
      cB('badge-sup', {
        raw: `
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
          color: #FFF;
          position: absolute;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
          padding: 0 6px;
          text-align: center;
          font-size: 12px;
          transform: translateX(-50%);
          left: 100%;
          bottom: calc(100% - 9px);
        `,
        fontVariantNumeric: 'tabular-nums'
      }, [
        fadeInScaleUpTransition({
          transformOrigin: 'left bottom',
          originalTransform: 'translateX(-50%)'
        }),
        c('&::before', {
          raw: `
            opacity: 0;
            transform: scale(1);
            border-radius: 9px;
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          `
        })
      ])
    ])
  }
])
