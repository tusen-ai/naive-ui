import { c, cE, cTB, cM, cB, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $local
    } = props
    const {
      borderRadius,
      color: backgroundColor
    } = $local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return cTB('avatar', {
      raw: `
        color: #FFF;
        font-size: 14px;
        display: inline-block;
        position: relative;
        overflow: hidden;
        text-align: center;
      `,
      borderRadius,
      transition: `
        background-color .3s ${cubicBezierEaseInOut},
        color .3s ${cubicBezierEaseInOut}
      `,
      backgroundColor
    }, [
      c('img', {
        width: '100%',
        height: '100%'
      }),
      cE('text', {
        raw: `
          white-space: nowrap;
          display: inline-block;
          position: absolute;
          left: 50%;
          top: 50%;
        `
      }),
      cTB('icon', {
        color: '#FFF',
        verticalAlign: 'bottom'
      }),
      ['tiny', 'small', 'medium', 'large', 'huge'].map(size => {
        const height = $local[createKey('height', size)]
        return cM(`${size}-size`, {
          height,
          width: height
        }, [
          cM('circle-shaped, round-shaped', {
            borderRadius: '50%'
          }),
          cE('text', {
            lineHeight: 1.25
          }),
          cB('icon', {
            fontSize: height
          })
        ])
      })
    ])
  }])
