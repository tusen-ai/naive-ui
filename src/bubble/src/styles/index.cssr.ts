import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  cB('bubble', `
        display: flex;
        column-gap: 12px;
    `, [
    cM('end', `
            justify-content: end;
            flex-direction: row-reverse;
        `, [
      cE('content-wrapper', `
                align-items: flex-end;
            `)
    ]),
    cE('avatar', ``, [
      cM('placeholder', `
                width: 34px;
                height: 34px;
            `)
    ]),
    cE('header', `
            font-size: 14px;
            color: #303133;
            line-height: 24px;
        `),
    cE('content', `
            word-break: break-word;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: 0;
            max-width: 100%;
            padding: 12px 16px;
            border-radius: 8px;
            min-height: 22px;
        `, [
      cM('filled', `
                background-color: #f0f2f5
            `),
      cM('outlined', `
                border: 1px solid #dcdfe6;
            `),
      cM('shadow', `
                box-shadow: 0px 12px 32px 4px rgba(0,0,0,.04),0px 8px 20px rgba(0,0,0,.08);
            `),
      cM('round', `
                border-radius: 23px;
                padding-inline: 20px;
            `),

    ]),
    cE('content-wrapper', `
            flex: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: 0;
            max-width: 100%;
    `),
    cNotM('end', ``, [
      cE('content', ``, [
        cM('corner', `border-start-start-radius: 2px;`)
      ])
    ]),
    cM('end', ``, [
      cE('content', ``, [
        cM('corner', `border-start-end-radius: 2px;`)
      ])
    ]),
    cE('footer', `
        display: flex;
        flex-direction: column;
        height: 40px;
        overflow: hidden;
        width: 100%;
        justify-content: flex-end;
    `),
    cE('loading-wrap', `
      height: 100%;
    `),
    cE('loading-dots', `
      height: 100%;
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: center;
    `),
    cE('dot', `
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #3b82f6;
      animation: scale 1.2s infinite ease-in-out;
    `),
    cE('dot-1', `
      animation-delay: -0.32s;
    `),
    cE('dot-2', `
      animation-delay: -0.16s;
    `),
    cE('dot-3', `
      animation-delay: 0s;
    `),
    cE('dot-4', `
      animation-delay: 0.16s;
    `),
  ]),
  c('@keyframes scale', `
    0%, 80%, 100% { 
      transform: scale(0.6); 
      opacity: 0.6; 
    }
    40% { 
      transform: scale(1.0); 
      opacity: 1; 
    }
  `)
])
