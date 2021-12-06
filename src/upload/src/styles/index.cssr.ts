import { c, cM, cB, cE } from '../../../_utils/cssr'
import fadeInHeightExpand from '../../../_styles/transitions/fade-in-height-expand.cssr'
import createIconSwitchTransition from '../../../_styles/transitions/icon-switch.cssr'

export default c([
  cB('upload', 'width: 100%;', [
    cM('dragger-inside', [
      cE('trigger', `
        display: block;
      `)
    ]),
    cM('drag-over', [
      cB('upload-dragger', `
        border: var(--dragger-border-hover);
      `)
    ])
  ]),
  cB('upload-dragger', `
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 24px;
    opacity: 1;
    transition:
      opacity .3s var(--bezier),
      border-color .3s var(--bezier),
      background-color .3s var(--bezier);
    background-color: var(--dragger-color);
    border: var(--dragger-border);
  `, [
    c('&:hover', `
      border: var(--dragger-border-hover);
    `),
    cM('disabled', `
      opacity: var(--item-disabled-opacity);
      cursor: not-allowed;
    `)
  ]),
  cB('upload-trigger', `
    display: inline-block;
    box-sizing: border-box;
    opacity: 1;
    transition: opacity .3s var(--bezier);
  `, [
    c('+', [
      cB('upload-file-list', 'margin-top: 8px;')
    ]),
    cM('disabled', `
      opacity: var(--item-disabled-opacity);
      cursor: not-allowed;
    `),
    cM('image-card', `
      width: 96px;
      height: 96px;
    `, [
      cB('base-icon', `
        font-size: 24px;
      `),
      cB('upload-dragger', `
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `)
    ])
  ]),
  cB('upload-file-list', `
    line-height: var(--line-height);
    opacity: 1;
    transition: opacity .3s var(--bezier);
  `, [
    cM('disabled', `
      opacity: var(--item-disabled-opacity);
      cursor: not-allowed;
    `, [
      cB('upload-file', 'cursor: not-allowed;')
    ]),
    cM('grid', `
      display: grid;
      grid-template-columns: repeat(auto-fill, 96px);
      grid-gap: 8px;
      margin-top: 0;
    `),
    cB('upload-file', `
      display: block;
      box-sizing: border-box;
      cursor: default;
      padding: 0px 12px 0 6px;
      transition: background-color .3s  var(--bezier);
      border-radius: var(--border-radius);
    `, [
      fadeInHeightExpand(),
      cB('progress', [
        fadeInHeightExpand({
          foldPadding: true
        })
      ]),
      c('&:hover', `
        background-color: var(--item-color-hover);
      `, [
        cB('upload-file-info', [
          cE('action', `
            opacity: 1;
          `)
        ])
      ]),
      cM('image-type', `
        border-radius: var(--border-radius);
        text-decoration: underline;
        text-decoration-color: #0000;
      `, [
        cB('upload-file-info', `
          padding-top: 0px;
          padding-bottom: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
        `, [
          cB('progress', `
            padding: 2px 0;
            margin-bottom: 0;
          `),
          cE('name', `
            padding: 0 8px;
          `),
          cE('thumbnail', `
            width: 32px;
            height: 32px;
            font-size: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
          `, [
            c('img', `
              width: 100%;
            `)
          ])
        ])
      ]),
      cM('text-type', [
        cB('progress', `
          box-sizing: border-box;
          padding-bottom: 6px;
          margin-bottom: 6px;
        `)
      ]),
      cM('image-card-type', `
        position: relative;
        width: 96px;
        height: 96px;
        border: var(--item-border-image-card);
        border-radius: var(--border-radius);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color .3s var(--bezier), background-color .3s var(--bezier);
        border-radius: var(--border-radius);
      `, [
        cB('progress', `
          position: absolute;
          left: 8px;
          bottom: 8px;
          right: 8px;
          width: unset;
        `),
        cB('upload-file-info', `
          padding: 0;
          width: 100%;
          height: 100%;
        `, [
          cE('thumbnail', `
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 36px;
          `, [
            c('img', `
              width: 100%;
            `)
          ])
        ]),
        c('&::before', `
          position: absolute;
          z-index: 1;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity .2s var(--bezier);
          content: "";
        `),
        c('&:hover', [
          c('&::before', 'opacity: 1;'),
          cB('upload-file-info', [
            cE('thumbnail', 'opacity: .12;')
          ])
        ])
      ]),
      cM('error-status', [
        c('&:hover', `
          background-color: var(--item-color-hover-error);
        `),
        cB('upload-file-info', [
          cE('name', 'color: var(--item-text-color-error);'),
          cE('thumbnail', 'color: var(--item-text-color-error);')
        ]),
        cM('image-card-type', `
          border: var(--item-border-image-card-error);
        `)
      ]),
      cM('with-url', `
        cursor: pointer;
      `, [
        cB('upload-file-info', [
          cE('name', `
            color: var(--item-text-color-success);
            text-decoration-color: var(--item-text-color-success);
          `, [
            c('a', `
              text-decoration: underline;
            `)
          ])
        ])
      ]),
      cB('upload-file-info', `
        position: relative;
        padding-top: 6px;
        padding-bottom: 6px;
        display: flex;
        flex-wrap: nowrap;
      `, [
        cE('thumbnail', `
          font-size: 18px;
          opacity: 1;
          transition: opacity .2s var(--bezier);
          color: var(--item-icon-color);
        `, [
          cB('base-icon', `
            margin-right: 2px;
            vertical-align: middle;
            transition: color .3s var(--bezier);
          `)
        ]),
        cE('action', `
          padding-top: inherit;
          padding-bottom: inherit;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          display: flex;
          align-items: center;
          transition: opacity .2s var(--bezier);
          justify-content: flex-end;
          opacity: 0;
        `, [
          cB('button', [
            c('&:not(:last-child)', {
              marginRight: '4px'
            }),
            cB('base-icon', [
              c('svg', [
                createIconSwitchTransition()
              ])
            ])
          ]),
          cM('image-type', `
            position: relative;
            max-width: 80px;
            width: auto;
          `),
          cM('image-card-type', `
            z-index: 2;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          `)
        ]),
        cE('name', `
          color: var(--item-text-color);
          flex: 1;
          display: flex;
          justify-content: center;
          text-overflow: ellipsis;
          overflow: hidden;
          flex-direction: column;
          text-decoration-color: #0000;
          font-size: var(--font-size);
          transition:
            color .3s var(--bezier),
            text-decoration-color .3s var(--bezier); 
        `, [
          c('a', `
            color: inherit;
            text-decoration: underline;
          `)
        ])
      ])
    ])
  ]),
  cB('upload-file-input', `
    display: block;
    width: 0;
    height: 0;
    opacity: 0;
  `)
])
