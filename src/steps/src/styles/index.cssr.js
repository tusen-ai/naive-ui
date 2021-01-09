import { c, cB, cE, cM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

// vars:
// --bezier
// --description-text-color
// --header-text-color
// --indicator-border-color
// --indicator-color
// --indicator-icon-size
// --indicator-index-font-size
// --indicator-size
// --indicator-text-color
// --splitor-color
// --step-header-font-size
// --step-header-font-weight
export default cB('steps', `
  width: 100%;
  display: flex;
`, [
  cB('step', `
    position: relative;
    display: flex;
    flex: 1;
  `, [
    c('&:last-child', [
      cB('step-splitor', {
        display: 'none'
      })
    ])
  ]),
  cB('step-splitor', `
    background-color: var(--splitor-color);
    margin-top: calc(var(--step-header-font-size) / 2);
    height: 1px;
    flex: 1;
    align-self: flex-start;
    margin-left: 12px;
    margin-right: 12px;
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier);
  `),
  cB('step-content', {
    flex: 1
  }, [
    cB('step-content-header', `
      color: var(--header-text-color);
      margin-top: calc(var(--indicator-size) / 2 - var(--step-header-font-size) / 2);
      line-height: var(--step-header-font-size);
      font-size: var(--step-header-font-size);
      position: relative;
      display: flex;
      font-weight: var(--step-header-font-weight);
      margin-left: 9px;
      transition:
        color .3s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      cE('title', `
        white-space: nowrap;
        flex: 0;
      `)
    ]),
    cE('description', `
      color: var(--description-text-color);
      margin-top: 12px;
      margin-left: 9px;
      transition:
        color .3s var(--bezier),
        background-color .3s var(--bezier);
    `)
  ]),
  cB('step-indicator', `
    background-color: var(--indicator-color);
    box-shadow: 0 0 0 1px var(--indicator-border-color);
    height: var(--indicator-size);
    width: var(--indicator-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color .3s var(--bezier),
      box-shadow .3s var(--bezier);
  `, [
    cB('step-indicator-slot', `
      position: relative;
      width: var(--indicator-icon-size);
      height: var(--indicator-icon-size);
      font-size: var(--indicator-icon-size);
      line-height: var(--indicator-icon-size);
    `, [
      cE('index', `
        display: inline-block;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        font-size: var(--indicator-index-font-size);
        width: var(--indicator-icon-size);
        height: var(--indicator-icon-size);
        line-height: var(--indicator-icon-size);
        color: var(--indicator-text-color);
        transition: color .3s var(--bezier);
      `, [
        iconSwitchTransition()
      ]),
      cB('base-icon', `
        color: var(--indicator-text-color);
        transition: color .3s var(--bezier);
      `, [
        iconSwitchTransition()
      ])
    ])
  ]),
  cM('vertical', {
    flexDirection: 'column'
  }, [
    cB('step', {
      marginBottom: '16px'
    }, [
      c('&:last-child', {
        marginBottom: 0
      })
    ]),
    cB('step-splitor', `
      left: calc(var(--indicator-size) / 2);
      height: calc(100% - var(--indicator-size));
    `),
    cB('step-indicator', [
      cB('step-splitor', `
        position: absolute;
        bottom: -8px;
        width: 1px;
        margin: 0 !important;
      `)
    ]),
    cB('step-content', [
      cE('description', {
        marginTop: '8px'
      })
    ])
  ])
])
