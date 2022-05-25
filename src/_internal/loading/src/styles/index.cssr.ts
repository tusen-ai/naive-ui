import { c, cB, cE } from '../../../../_utils/cssr'
import { iconSwitchTransition } from '../../../../_styles/transitions/icon-switch.cssr'

export default c([
  c('@keyframes loading-container-rotate', `
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  `),
  c('@keyframes loading-layer-rotate', `
    12.5% {
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
    }
    25% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    37.5% {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
    50% {
      -webkit-transform: rotate(540deg);
      transform: rotate(540deg);
    }
    62.5% {
      -webkit-transform: rotate(675deg);
      transform: rotate(675deg);
    }
    75% {
      -webkit-transform: rotate(810deg);
      transform: rotate(810deg);
    }
    87.5% {
      -webkit-transform: rotate(945deg);
      transform: rotate(945deg);
    }
    100% {
      -webkit-transform: rotate(1080deg);
      transform: rotate(1080deg);
    } 
  `),
  c('@keyframes loading-left-spin', `
    from {
      -webkit-transform: rotate(265deg);
      transform: rotate(265deg);
    }
    50% {
      -webkit-transform: rotate(130deg);
      transform: rotate(130deg);
    }
    to {
      -webkit-transform: rotate(265deg);
      transform: rotate(265deg);
    }
  `),
  c('@keyframes loading-right-spin', `
    from {
      -webkit-transform: rotate(-265deg);
      transform: rotate(-265deg);
    }
    50% {
      -webkit-transform: rotate(-130deg);
      transform: rotate(-130deg);
    }
    to {
      -webkit-transform: rotate(-265deg);
      transform: rotate(-265deg);
    }
  `),
  cB('base-loading', `
    position: relative;
    line-height: 0;
    width: 1em;
    height: 1em;
  `, [
    cE('transition-wrapper', `
      position: absolute;
      width: 100%;
      height: 100%;
    `, [
      iconSwitchTransition()
    ]),
    cE('container', `
      display: inline-flex;
      position: relative;
      direction: ltr;
      line-height: 0;
      animation: loading-container-rotate 1568.2352941176ms linear infinite;
      font-size: 0;
      letter-spacing: 0;
      white-space: nowrap;
      opacity: 1;
      width: 100%;
      height: 100%;
    `, [
      cE('svg', `
        stroke: var(--n-text-color);
        fill: transparent;
        position: absolute;
        height: 100%;
        overflow: hidden;
      `),
      cE('container-layer', `
        position: absolute;
        width: 100%;
        height: 100%;
        animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
      `, [
        cE('container-layer-left', `
          display: inline-flex;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
        `, [
          cE('svg', `
            animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
            width: 200%;
          `)
        ]),
        cE('container-layer-patch', `
          position: absolute;
          top: 0;
          left: 47.5%;
          box-sizing: border-box;
          width: 5%;
          height: 100%;
          overflow: hidden;
        `, [
          cE('svg', `
            left: -900%;
            width: 2000%;
            transform: rotate(180deg);
          `)
        ]),
        cE('container-layer-right', `
          display: inline-flex;
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
        `, [
          cE('svg', `
            animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
            left: -100%;
            width: 200%;
          `)
        ])
      ])
    ]),
    cE('placeholder', `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      iconSwitchTransition({
        left: '50%',
        top: '50%',
        originalTransform: 'translateX(-50%) translateY(-50%)'
      })
    ])
  ])
])
