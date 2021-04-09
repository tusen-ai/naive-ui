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
  `),
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
      cM('error-status', [
        c('&:hover', `
          background-color: var(--item-color-hover-error);
        `),
        cB('upload-file-info', [
          cE('name', `
            color: var(--item-text-color-error);
          `)
        ])
      ]),
      cM('with-url', `
        cursor: pointer;
      `, [
        cB('upload-file-info', [
          cE('name', `
            text-decoration: underline;
            color: var(--item-text-color-success);
            text-decoration-color: var(--item-text-color-success);
          `)
        ])
      ]),
      cB('upload-file-info', `
        position: relative;
        padding-top: 6px;
        padding-bottom: 6px;
      `, [
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
          ])
        ]),
        cE('name', `
          display: flex;
          align-items: center;
          text-overflow: ellipsis;
          overflow: hidden;
          text-decoration: underline;
          text-decoration-color: transparent;
          font-size: var(--font-size);
          transition:
            color .3s var(--bezier),
            text-decoration-color .3s var(--bezier);
          color: var(--item-text-color);    
        `, [
          cB('base-icon', `
            font-size: 18px;
            margin-right: 2px;
            vertical-align: middle;
            color: var(--item-icon-color);
          `)
        ])
      ])
    ])
  ]),
  cM('disabled', `
    opacity: var(--item-disabled-opacity);
  `, [
    cE('trigger', `
      cursor: not-allowed;
    `),
    cB('upload-file-list', `
      cursor: not-allowed;
    `),
    cB('upload-dragger', `
      cursor: not-allowed;
    `)
  ]),
  cM('drag-over', [
    cB('upload-dragger', `
      border: var(--dragger-border-hover);
    `)
  ])
])
