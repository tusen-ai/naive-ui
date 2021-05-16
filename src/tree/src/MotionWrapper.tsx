import { h, defineComponent, PropType } from 'vue'
import FadeInExpandTransition from '../../_internal/fade-in-expand-transition'
import { TmNode } from './interface'
import TreeNode from './TreeNode'

export default defineComponent({
  name: 'TreeMotionWrapper',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    nodes: {
      type: Array as PropType<TmNode[]>,
      required: true
    },
    mode: {
      type: String as PropType<'expand' | 'collapse'>,
      required: true
    },
    onAfterEnter: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <FadeInExpandTransition
        onAfterEnter={this.onAfterEnter}
        appear
        reverse={this.mode === 'collapse'}
      >
        {{
          default: () => (
            <div
              class={[
                `${clsPrefix}-tree-motion-wrapper`,
                `${clsPrefix}-tree-motion-wrapper--${this.mode}`
              ]}
            >
              {this.nodes.map((node) => (
                <TreeNode clsPrefix={clsPrefix} tmNode={node} />
              ))}
            </div>
          )
        }}
      </FadeInExpandTransition>
    )
  }
})
