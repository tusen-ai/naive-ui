import {
  computed,
  h,
  defineComponent,
  PropType,
  VNode,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, getSlot, getVNodeChildren, createKey } from '../../_utils'
import { descriptionsLight } from '../styles'
import type { DescriptionsTheme } from '../styles'
import { isDescriptionsItem } from './utils'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Descriptions',
  props: {
    ...(useTheme.props as ThemeProps<DescriptionsTheme>),
    title: {
      type: String,
      default: undefined
    },
    column: {
      type: Number,
      default: 3
    },
    columns: {
      type: Number,
      default: undefined
    },
    labelPlacement: {
      type: String as PropType<'left' | 'top'>,
      default: 'top'
    },
    labelAlign: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'left'
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Descriptions',
      'Descriptions',
      style,
      descriptionsLight,
      props
    )
    return {
      cssVars: computed(() => {
        const { size, bordered } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            thColor,
            thTextColor,
            thFontWeight,
            tdTextColor,
            tdColor,
            tdColorModal,
            borderColor,
            borderRadius,
            lineHeight,
            [createKey('fontSize', size)]: fontSize,
            [createKey(
              bordered ? 'thPaddingBordered' : 'thPadding',
              size
            )]: thPadding,
            [createKey(
              bordered ? 'tdPaddingBordered' : 'tdPadding',
              size
            )]: tdPadding
          }
        } = themeRef.value
        return {
          '--th-padding': thPadding,
          '--td-padding': tdPadding,
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--th-font-weight': thFontWeight,
          '--line-height': lineHeight,
          '--th-text-color': thTextColor,
          '--td-text-color': tdTextColor,
          '--th-color': thColor,
          '--td-color': tdColor,
          '--td-color-modal': tdColorModal,
          '--border-radius': borderRadius,
          '--border-color': borderColor
        }
      }),
      compitableColumn: useCompitable(props, ['columns', 'column'])
    }
  },
  render () {
    const children = getSlot(this, 'default', [])
    const memorizedLength = children.length
    const {
      compitableColumn,
      labelPlacement,
      labelAlign,
      size,
      bordered,
      title,
      cssVars
    } = this
    const filteredChildren: VNode[] = children.filter((child) =>
      isDescriptionsItem(child)
    ) as VNode[]
    if (__DEV__ && memorizedLength !== filteredChildren.length) {
      warn(
        'descriptions',
        '`n-descriptions` only takes `n-descriptions-item` as children.'
      )
    }
    const defaultState: {
      span: number
      row: VNode[]
      secondRow: VNode[]
      rows: VNode[][]
    } = {
      span: 0,
      row: [],
      secondRow: [],
      rows: []
    }
    const itemState = filteredChildren.reduce((state, vNode, index) => {
      const props = vNode.props || {}
      const isLastIteration = filteredChildren.length - 1 === index
      const itemLabel = [
        'label' in props ? props.label : getVNodeChildren(vNode, 'label')
      ]
      const itemChildren = [getVNodeChildren(vNode)]
      const itemSpan = (props.span as number) || 1
      const memorizedSpan = state.span
      state.span += itemSpan
      if (labelPlacement === 'left') {
        if (bordered) {
          state.row.push(
            <th class="n-descriptions-table-header" colspan={1}>
              {itemLabel}
            </th>,
            <td
              class="n-descriptions-table-content"
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2 + 1
                  : itemSpan * 2 - 1
              }
            >
              {itemChildren}
            </td>
          )
        } else {
          state.row.push(
            <td
              class="n-descriptions-table-content"
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2
                  : itemSpan * 2
              }
            >
              <span class="n-descriptions-table-content__label">
                {[
                  ...itemLabel,
                  <span class="n-descriptions-separator">:</span>
                ]}
              </span>
              <span class="n-descriptions-table-content__content">
                {itemChildren}
              </span>
            </td>
          )
        }
      } else {
        const colspan = isLastIteration
          ? (compitableColumn - memorizedSpan) * 2
          : itemSpan * 2
        state.row.push(
          <th class="n-descriptions-table-header" colspan={colspan}>
            {itemLabel}
          </th>
        )
        state.secondRow.push(
          <td class="n-descriptions-table-content" colspan={colspan}>
            {itemChildren}
          </td>
        )
      }
      if (state.span >= compitableColumn || isLastIteration) {
        state.span = 0
        if (state.row.length) {
          state.rows.push(state.row)
          state.row = []
        }
        if (labelPlacement !== 'left') {
          if (state.secondRow.length) {
            state.rows.push(state.secondRow)
            state.secondRow = []
          }
        }
      }
      return state
    }, defaultState)
    const rows = itemState.rows.map((row) => (
      <tr class="n-descriptions-table-row">{row}</tr>
    ))
    return (
      <div
        style={cssVars as CSSProperties}
        class={[
          'n-descriptions',
          `n-descriptions--${labelPlacement}-label-placement`,
          `n-descriptions--${labelAlign}-label-align`,
          `n-descriptions--${size}-size`,
          bordered && 'n-descriptions--bordered'
        ]}
      >
        {title || this.$slots.header ? (
          <div class="n-descriptions-header">
            {title || getSlot(this, 'header')}
          </div>
        ) : null}
        <div class="n-descriptions-table-wrapper">
          <table class="n-descriptions-table">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    )
  }
})
