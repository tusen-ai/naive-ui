import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  cB('bubble', `
        display: flex;
        gap: var(--n-gap);
    `, [
    cM('end', `
        justify-content: end;
        flex-direction: row-reverse;
      `, [
      cE('content-wrapper', `
        align-items: flex-end;
      `)
    ]),
    cE('avatar', ``),
    cE('header', `
        font-size: var(--n-font-size);
        line-height: var(--n-line-height);
    `),
    cE('content', `
        word-break: break-word;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 0;
        max-width: 100%;
        padding: var(--n-content-padding);
        border-radius: var(--n-border-radius);
        min-height: var(--n-content-min-height);
        `, [
      cM('filled', `
                background-color: var(--n-filled-background-color);
            `),
      cM('outlined', `
        border: var(--n-outlined-border);
      `),
      cM('shadow', `
          box-shadow: var(--n-shadow-box-shadow);
        `),
      cM('round', `
          border-radius: var(--n-round-border-radius);
          padding-inline: var(--n-round-padding-inline);
      `),
    ]),
    cE('content-wrapper', `
        flex: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 0;
        max-width: var(--n-content-wrapper-max-width);
    `),
    cNotM('end', ``, [
      cE('content', ``, [
        cM('corner', `border-start-start-radius: var(--n-corner-border-radius)`)
      ])
    ]),
    cM('end', ``, [
      cE('content', ``, [
        cM('corner', `border-start-end-radius: var(--n-corner-border-radius)`)
      ]),
      cE('footer', `align-items: flex-end;`)
    ]),
    cE('footer', `
        display: flex;
        flex-direction: column;
        height: 40px;
        overflow: hidden;
        width: 100%;
        justify-content: flex-end;
    `),
    cM('content', `
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
