import { cTB, c, cB } from '../../../../_utils/cssr'

const dashOffset = 500

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      color
    } = props.$local
    return [
      cTB('base-loading', {
        raw: `
          line-height: 1;
          stroke: ${color};
          transition: stroke .3s ${cubicBezierEaseInOut};
        `
      }, [
        cB('base-loading-circular', {
          raw: `
            height: 100%;
            width: 100%;
            animation: n-base-loading-rotate 1.5s linear infinite;
            transform-origin: center;
          `
        }, [
          cB('base-loading-circular-path', {
            raw: `
              transform-origin: center;
              animation: n-base-loading-dash 1.5s ease-in-out infinite;
              stroke-dasharray: ${dashOffset};
              stroke-dashoffset: 0;
              stroke-linecap: round;
            `
          })
        ])
      ]),
      c('@keyframes n-base-loading-rotate', {
        raw: `
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(270deg);
          }
        `
      }),
      c('@keyframes n-base-loading-dash', {
        raw: `
          0% {
            stroke-dashoffset: ${dashOffset};
          }
          50% {
            stroke-dashoffset: ${dashOffset / 4};
            transform: rotate(135deg);
          }
          100% {
            stroke-dashoffset: ${dashOffset};
            transform: rotate(450deg);
          }
        `
      })
    ]
  }
])
