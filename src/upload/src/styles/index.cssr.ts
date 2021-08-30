import { c, cM, cB, cE } from '../../../_utils/cssr'
import fadeInHeightExpand from '../../../_styles/transitions/fade-in-height-expand.cssr'
import createIconSwitchTransition from '../../../_styles/transitions/icon-switch.cssr'

export default cB('upload', [
  cE('file-input', `
    display: block;
    width: 0;
    height: 0;
    opacity: 0;
  `),
  cE('trigger', `
    display: inline-block;
  `, [
    cM('picture-card', `
      position: relative;
      display: inline-block;
      width: 96px;
      height: 96px;
      margin: 0 8px 8px 0;
      vertical-align: top;
      padding: 8px;
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color .3s var(--bezier), background-color .3s var(--bezier);
      background-color: var(--dragger-color);
      border: var(--dragger-border);
      border-radius: var(--border-radius);
    `, [
      c('&:hover', `
        border: var(--dragger-border-hover);
      `)
    ])
  ]),
  cM('dragger-inside', [
    cE('trigger', `
      display: block;
    `)
  ]),
  cB('upload-dragger', `
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 24px;
    transition:
      border-color .3s var(--bezier),
      background-color .3s var(--bezier);
    background-color: var(--dragger-color);
    border: var(--dragger-border);
  `, [
    c('&:hover', `
      border: var(--dragger-border-hover);
    `)
  ]),
  cB('upload-file-list', `
    margin-top: 8px;
    line-height: var(--line-height);
  `, [
    cB('upload-file', `
      display: block;
      box-sizing: border-box;
      cursor: default;
      padding: 0px 12px 0 6px;
      transition: background-color .3s  var(--bezier);
      border-radius: var(--border-radius);
    `, [
      fadeInHeightExpand(),
      cB('progress', `
        box-sizing: border-box;
        padding-bottom: 6px;
        margin-bottom: 6px;
      `, [
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
      cM('picture-type', `
        border: 1px solid;
        border-color: var(--border-color);
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
        `, [
          cE('thumbnail', `
            width: 48px;
            height: 48px;
            font-size: 36px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          `, [
            cB('base-icon', `
              font-size: inherit;
            `),
            c('img', `
              width: 100%;
            `)
          ])
        ])
      ]),
      cM('picture-card-type', `
        position: relative;
        display: inline-block;
        width: 96px;
        height: 96px;
        margin: 0 8px 8px 0;
        vertical-align: top;
        padding: 8px;
        border: 1px solid;
        border-color: var(--border-color);
        border-radius: var(--border-radius);
      `, [
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
          `, [
            cB('base-icon', `
              font-size: 36px;
            `),
            c('img', `
              width: 100%;
            `)
          ])
        ]),
        c('&::before', `
          position: absolute;
          z-index: 1;
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          background-color: rgb(243, 243, 245, 0.9);
          opacity: 0;
          transition: opacity .2s var(--bezier);
          content: "";
          left: 4px;
          top: 4px;
        `),
        c('&:hover', `
          background-color: initial !important;
        `, [
          c('&::before', 'opacity: 1;')
        ])
      ]),
      cM('error-status', [
        c('&:hover', `
          background-color: var(--item-color-hover-error);
        `),
        cB('upload-file-info', [
          cE('name', [
            c('a, span', `
              color: var(--item-text-color-error);
            `)
          ]),
          cE('thumbnail', [
            cB('base-icon', `
              color: var(--item-icon-error-color);
            `)
          ])
        ]),
        cM('picture-card-type, picture-type', `
          border-color: var(--item-icon-error-color);
        `)
      ]),
      cM('with-url', `
        cursor: pointer;
      `, [
        cB('upload-file-info', [
          cE('name', [
            c('a', `
              text-decoration: underline;
              color: var(--item-text-color-success);
              text-decoration-color: var(--item-text-color-success);
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
        cE('thumbnail', [
          cB('base-icon', `
            font-size: 18px;
            margin-right: 2px;
            vertical-align: middle;
            color: var(--item-icon-color);
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
          cM('picture-type', `
            position: relative;
            max-width: 80px;
            width: auto;
          `),
          cM('picture-card-type', `
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
          flex: 1;
          display: flex;
          justify-content: center;
          text-overflow: ellipsis;
          overflow: hidden;
          flex-direction: column;
        `, [
          c('a', `
            text-decoration: underline;
            text-decoration-color: #0000;
            font-size: var(--font-size);
            transition:
              color .3s var(--bezier),
              text-decoration-color .3s var(--bezier);
            color: var(--item-text-color);    
          `)
        ])
      ]),
      cM('info-status, pending-status, uploading', [
        cM('picture-card-type', ` 
          transition:
            border-color .3s var(--bezier),
            background-color .3s var(--bezier);
          background-color: var(--dragger-color);
          border: var(--dragger-border);
        `)
      ])
    ])
  ]),
  cM('disabled', `
    opacity: var(--item-disabled-opacity);
  `, [
    cE('trigger', `
      cursor: not-allowed;
    `),
    cB('upload-file', `
      cursor: not-allowed;
    `),
    cB('upload-file-list', `
      cursor: not-allowed;
    `),
    cB('upload-dragger', `
      cursor: not-allowed;
    `),
    cE('picture-card', `
      cursor: not-allowed;
    `)
  ]),
  cM('drag-over', [
    cB('upload-dragger', `
      border: var(--dragger-border-hover);
    `)
  ])
])
