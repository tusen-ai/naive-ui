import { h, defineComponent, inject, type PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import { treeInjectionKey } from './interface'

export default defineComponent({
  name: 'NTreeNodeCheckbox',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    right: Boolean,
    focusable: Boolean,
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
    onCheck: Function as PropType<(value: boolean) => void>
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NTree = inject(treeInjectionKey)!
    function doCheck (value: boolean): void {
      const { onCheck } = props
      if (onCheck) {
        onCheck(value)
      }
    }
    function handleUpdateValue (value: boolean): void {
      doCheck(value)
    }
    return {
      handleUpdateValue,
      mergedTheme: NTree.mergedThemeRef
    }
  },
  render () {
    const {
      clsPrefix,
      mergedTheme,
      checked,
      indeterminate,
      disabled,
      focusable,
      indent,
      handleUpdateValue
    } = this
    return (
      <span
        class={[
          `${clsPrefix}-tree-node-checkbox`,
          this.right && `${clsPrefix}-tree-node-checkbox--right`
        ]}
        style={{
          width: `${indent}px`
        }}
        data-checkbox
      >
        <NCheckbox
          focusable={focusable}
          disabled={disabled}
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
