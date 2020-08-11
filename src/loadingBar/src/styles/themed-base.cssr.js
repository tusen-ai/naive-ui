import { cTB, c, cB, cM } from '../../../_utils/cssr'
import fadeInTransition from '../../../styles/_transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      barHeight,
      backgroundColor
    } = props.$local
    return cTB('loading-bar-container', {
      raw: `
        z-index: 5999;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
      `
    }, [
      fadeInTransition({
        enterDuration: '0.3s',
        leaveDuration: '0.8s'
      }),
      cB('loading-bar', {
        raw: `
          width: 100%;
          transition: max-width 4s linear, background-color .2s linear;
          max-width: 0;
          height: ${barHeight};
        `
      }, [
        cM('starting', {
          raw: `
            background-color: ${backgroundColor['loading']};
            transition: max-width 4s linear, background-color .2s linear;
          `
        }),
        cM('finishing', {
          raw: `
            background-color: ${backgroundColor['loading']};
            transition: max-width .2s linear, background-color .2s linear;
          `
        }),
        cM('error', {
          raw: `
            background-color: ${backgroundColor['error']};
            transition: max-width .2s linear, background-color .2s linear;
          `
        })
      ])
    ])
  }

])
