import { h, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import type { TreeInjection } from './interface'

export default defineComponent({
  name: 'NTreeNodeCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    onCheck: Function as PropType<(value: boolean) => void>
  },
  setup (props) {
    const NTree = inject<TreeInjection>('NTree') as TreeInjection
    function doCheck (value: boolean): void {
      const { onCheck } = props
      if (onCheck) return onCheck(value)
    }
    function handleUpdateValue (value: boolean): void {
      if (props.indeterminate) {
        doCheck(false)
      } else {
        doCheck(value)
      }
    }
    return {
      handleUpdateValue,
      NTree
    }
  },
  render () {
    const { NTree, checked, indeterminate, handleUpdateValue } = this
    return (
      <span class="n-tree-node-checkbox">
        <NCheckbox
          unstableTheme={NTree.mergedTheme.peers.Checkbox}
          unstableThemeOverrides={NTree.mergedTheme.overrides.Checkbox}
          checked={checked}
          indeterminate={indeterminate}
          onUpdateChecked={handleUpdateValue}
        />
      </span>
    )
  }
})
