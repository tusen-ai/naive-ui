import { c, cB } from '../../_utils/cssr'
import virtualScrollerStyle from './vue-virtual-scroller.cssr'
import commonVariables from '../base/_common'

export default c([
  virtualScrollerStyle,
  c('body', {
    margin: 0,
    fontSize: '14px',
    fontFamily: commonVariables.fontFamily
  }, [
    c('>', [
      cB('positioning-container', {
        position: 'fixed'
      })
    ])
  ]),
  c('input', {
    fontSize: 'inherit',
    fontFamily: commonVariables.fontFamily
  }),
  cB('positioning-container', {
    raw: `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      transform: translateZ(0);
    `
  }, [
    cB('positioning-content', {
      pointerEvents: 'all'
    })
  ])
])
