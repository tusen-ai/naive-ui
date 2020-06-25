import { c, cB, cTB, cE, cM, cNotM, namespace } from '../../../_utils/cssr'
import { composite, read } from '../../../_utils/color/index'

export default c([
  ({ props }) => {
    cB(
      props.renderedTheme === props.fallbackTheme
        ? 'button'
        : `button.${namespace}-${props.theme}-theme`,
      [
        props => cM(`${props.extra.value}-colored`, {}, [

        ])
      ])
  }
])
