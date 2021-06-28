import { h, defineComponent, PropType, VNode } from 'vue'
import { pxfy } from 'seemly'
import FadeInExpandTransition from '../../_internal/fade-in-expand-transition'
import { TmNode } from './interface'
import NTreeNode from './TreeNode'

export default defineComponent({
  name: 'TreeMotionWrapper',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    height: Number,
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
    },
    selectable: {
      type: Boolean,
      default: true
    },
    checkable: Boolean,
    leafOnly: {
      type: Boolean,
      default: false
    }
  },
  render () {
    const { clsPrefix, selectable, checkable, leafOnly } = this
    const createNode = (tmNode: TmNode): VNode => {
      let mergeSelectable = selectable
      let mergeCheckable = checkable
      if (leafOnly) {
        mergeSelectable = tmNode.isLeaf
        mergeCheckable = mergeCheckable ? tmNode.isLeaf : false
      }
      return (
        <NTreeNode
          key={tmNode.key}
          tmNode={tmNode}
          clsPrefix={clsPrefix}
          selectable={mergeSelectable}
          checkable={mergeCheckable}
        />
      )
    }
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
              style={{
                height: pxfy(this.height)
              }}
            >
              {this.nodes.map((node) => createNode(node))}
            </div>
          )
        }}
      </FadeInExpandTransition>
    )
  }
})
