import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-dot-color
// --n-dot-color-focus
// --n-dot-color-active
// --n-dot-size
// --n-dot-line-width
// --n-dot-line-width-active
// --n-arrow-color
export default cB('carousel', `
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  overflow: hidden;
`, [
  cE('slides', `
    display: flex;
    width: 100%;
    height: 100%;
    transition-timing-function: var(--n-bezier);
    transition-property: transform;
  `, [
    cE('slide', `
      flex-shrink: 0;
      position: relative;
      width: 100%;
      height: 100%;
      outline: none;
      overflow: hidden;
    `, [
      c('> img', `
        display: block;
      `)
    ])
  ]),
  cE('dots', `
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
  `, [
    cM('dot', [
      cE('dot', `
        height: var(--n-dot-size);
        width: var(--n-dot-size);
        background-color: var(--n-dot-color);
        border-radius: 50%;
        cursor: pointer;
        transition:
          box-shadow .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
        outline: none;
      `, [
        c('&:focus', `
          background-color: var(--n-dot-color-focus);
        `),
        cM('active', `
          background-color: var(--n-dot-color-active);
        `)
      ])
    ]),
    cM('line', [
      cE('dot', `
        border-radius: 9999px;
        width: var(--n-dot-line-width);
        height: 4px;
        background-color: var(--n-dot-color);
        cursor: pointer;
        transition:
          width .3s var(--n-bezier),
          box-shadow .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
        outline: none;
      `, [
        c('&:focus', `
          background-color: var(--n-dot-color-focus);
        `),
        cM('active', `
          width: var(--n-dot-line-width-active);
          background-color: var(--n-dot-color-active);
        `)
      ])
    ])
  ]),
  cE('arrow', `
    transition: background-color .3s var(--n-bezier);
    cursor: pointer;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .2);
    color: var(--n-arrow-color);
    border-radius: 8px;
    user-select: none;
    -webkit-user-select: none;
    font-size: 18px;
  `, [
    c('svg', `
      height: 1em;
      width: 1em;
    `),
    c('&:hover', `
      background-color: rgba(255, 255, 255, .3);
    `)
  ]),
  cM('vertical', `
    touch-action: pan-x;
  `, [
    cE('slides', `
      flex-direction: column;
    `),
    cM('fade', [
      cE('slide', `
        top: 50%;
        left: unset;
        transform: translateY(-50%);
      `)
    ]),
    cM('card', [
      cE('slide', `
        top: 50%;
        left: unset;
        transform: translateY(-50%) translateZ(-400px);
      `, [
        cM('current', `
          transform: translateY(-50%) translateZ(0);
        `),
        cM('prev', `
          transform: translateY(-100%) translateZ(-200px);
        `),
        cM('next', `
          transform: translateY(0%) translateZ(-200px);
        `)
      ])
    ])
  ]),
  cM('usercontrol', [
    cE('slides', [
      c('>', [
        c('div', `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
        `)
      ])
    ])
  ]),
  cM('left', [
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      left: 12px;
      flex-direction: column;
    `, [
      cM('line', [
        cE('dot', `
          width: 4px;
          height: var(--n-dot-line-width);
          margin: 4px 0;
          transition:
            height .3s var(--n-bezier),
            box-shadow .3s var(--n-bezier),
            background-color .3s var(--n-bezier);
          outline: none;
        `, [
          cM('active', `
            height: var(--n-dot-line-width-active);
          `)
        ])
      ])
    ]),
    cE('dot', `
      margin: 4px 0;
    `)
  ]),
  cE('arrow-group', `
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
  `),
  cM('vertical', [
    cE('arrow', `
      transform: rotate(90deg);
    `)
  ]),
  cM('show-arrow', [
    cM('bottom', [
      cE('dots', `
        transform: translateX(0);
        bottom: 18px;
        left: 18px;
      `)
    ]),
    cM('top', [
      cE('dots', `
        transform: translateX(0);
        top: 18px;
        left: 18px;
      `)
    ]),
    cM('left', [
      cE('dots', `
        transform: translateX(0);
        top: 18px;
        left: 18px;
      `)
    ]),
    cM('right', [
      cE('dots', `
        transform: translateX(0);
        top: 18px;
        right: 18px;
      `)
    ])
  ]),
  cM('left', [
    cE('arrow-group', `
      bottom: 12px;
      left: 12px;
      flex-direction: column;
    `, [
      c('> *:first-child', `
        margin-bottom: 12px;
      `)
    ])
  ]),
  cM('right', [
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      right: 12px;
      flex-direction: column;
    `, [
      cM('line', [
        cE('dot', `
          width: 4px;
          height: var(--n-dot-line-width);
          margin: 4px 0;
          transition:
            height .3s var(--n-bezier),
            box-shadow .3s var(--n-bezier),
            background-color .3s var(--n-bezier);
          outline: none;
        `, [
          cM('active', `
            height: var(--n-dot-line-width-active);
          `)
        ])
      ])
    ]),
    cE('dot', `
      margin: 4px 0;
    `),
    cE('arrow-group', `
      bottom: 12px;
      right: 12px;
      flex-direction: column;
    `, [
      c('> *:first-child', `
        margin-bottom: 12px;
      `)
    ])
  ]),
  cM('top', [
    cE('dots', `
      transform: translateX(-50%);
      top: 12px;
      left: 50%;
    `, [
      cM('line', [
        cE('dot', `
          margin: 0 4px;
        `)
      ])
    ]),
    cE('dot', `
      margin: 0 4px;
    `),
    cE('arrow-group', `
      top: 12px;
      right: 12px;
    `, [
      c('> *:first-child', `
        margin-right: 12px;
      `)
    ])
  ]),
  cM('bottom', [
    cE('dots', `
      transform: translateX(-50%);
      bottom: 12px;
      left: 50%;
    `, [
      cM('line', [
        cE('dot', `
          margin: 0 4px;
        `)
      ])
    ]),
    cE('dot', `
      margin: 0 4px;
    `),
    cE('arrow-group', `
      bottom: 12px;
      right: 12px;
    `, [
      c('> *:first-child', `
        margin-right: 12px;
      `)
    ])
  ]),
  cM('fade', [
    cE('slide', `
      position: absolute;
      opacity: 0;
      transition-property: opacity;
      pointer-events: none;
    `, [
      cM('current', `
        opacity: 1;
        pointer-events: auto;
      `)
    ])
  ]),
  cM('card', [
    cE('slides', `
      perspective: 1000px;
    `),
    cE('slide', `
      position: absolute;
      left: 50%;
      opacity: 0;
      transform: translateX(-50%) translateZ(-400px);
      transition-property: opacity, transform;
    `, [
      cM('current', `
        opacity: 1;
        transform: translateX(-50%) translateZ(0);
        z-index: 1;
      `),
      cM('prev', `
        opacity: 0.4;
        transform: translateX(-100%) translateZ(-200px);
      `),
      cM('next', `
        opacity: 0.4;
        transform: translateX(0%) translateZ(-200px);
      `)
    ])
  ])
])
