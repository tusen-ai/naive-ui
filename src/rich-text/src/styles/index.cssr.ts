import { c, cB, cM, cE, cNotM } from "../../../_utils/cssr";

export default c([
    cB('bubble', `
        display: flex;
        column-gap: 12px;
    `, [
        cM('end', `
            justify-content: end;
            flex-direction: row-reverse;
        `),
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
    ])
])