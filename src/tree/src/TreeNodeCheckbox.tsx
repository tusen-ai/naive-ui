import { h, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import { treeInjectionKey } from './interface'

export default defineComponent({
  name: 'NTreeNodeCheckbox',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NTree = inject(treeInjectionKey)!
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
      mergedTheme: NTree.mergedThemeRef
    }
  },
  render () {
    const {
      mergedTheme,
      checked,
      indeterminate,
      handleUpdateValue,
      clsPrefix
    } = this
    return (
      <span class={`${clsPrefix}-tree-node-checkbox`}>
        <NCheckbox
          theme={mergedTheme.peers.Checkbox}
          themeOverrides={mergedTheme.peerOverrides.Checkbox}
          checked={checked}
          indeterminate={indeterminate}
          onUpdateChecked={handleUpdateValue}
        />
      </span>
    )
  }
})
