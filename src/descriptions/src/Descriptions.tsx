import {
  computed,
  h,
  defineComponent,
  PropType,
  VNode,
  CSSProperties
} from 'vue'
import { useCompitable } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  warn,
  getSlot,
  getVNodeChildren,
  createKey,
  flatten
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { descriptionsLight } from '../styles'
import type { DescriptionsTheme } from '../styles'
import { isDescriptionsItem } from './utils'
import style from './styles/index.cssr'

const descriptionProps = {
  ...(useTheme.props as ThemeProps<DescriptionsTheme>),
  title: String,
  column: {
    type: Number,
    default: 3
  },
  columns: Number,
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'top'
  },
  labelAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left'
  },
  separator: {
    type: String,
    default: ':'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: Boolean,
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentStyle: [Object, String] as PropType<string | CSSProperties>
} as const

export type DescriptionProps = ExtractPublicPropTypes<typeof descriptionProps>

export default defineComponent({
  name: 'Descriptions',
  props: descriptionProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Descriptions',
      'Descriptions',
      style,
      descriptionsLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const { size, bordered } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            thColor,
            thColorModal,
            thColorPopover,
            thTextColor,
            thFontWeight,
            tdTextColor,
            tdColor,
            tdColorModal,
            tdColorPopover,
            borderColor,
            borderColorModal,
            borderColorPopover,
            borderRadius,
            lineHeight,
            [createKey('fontSize', size)]: fontSize,
            [createKey(bordered ? 'thPaddingBordered' : 'thPadding', size)]:
              thPadding,
            [createKey(bordered ? 'tdPaddingBordered' : 'tdPadding', size)]:
              tdPadding
          }
        } = themeRef.value
        return {
          '--n-th-padding': thPadding,
          '--n-td-padding': tdPadding,
          '--n-font-size': fontSize,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-th-font-weight': thFontWeight,
          '--n-line-height': lineHeight,
          '--n-th-text-color': thTextColor,
          '--n-td-text-color': tdTextColor,
          '--n-th-color': thColor,
          '--n-th-color-modal': thColorModal,
          '--n-th-color-popover': thColorPopover,
          '--n-td-color': tdColor,
          '--n-td-color-modal': tdColorModal,
          '--n-td-color-popover': tdColorPopover,
          '--n-border-radius': borderRadius,
          '--n-border-color': borderColor,
          '--n-border-color-modal': borderColorModal,
          '--n-border-color-popover': borderColorPopover
        }
      }),
      compitableColumn: useCompitable(props, ['columns', 'column'])
    }
  },
  render () {
    const defaultSlots = this.$slots.default
    const children = defaultSlots ? flatten(defaultSlots()) : []
    const memorizedLength = children.length
    const {
      compitableColumn,
      labelPlacement,
      labelAlign,
      size,
      bordered,
      title,
      cssVars,
      mergedClsPrefix,
      separator
    } = this
    const filteredChildren: VNode[] = children.filter((child) =>
      isDescriptionsItem(child)
    )
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
      const labelStyle =
        props.labelStyle || props['label-style'] || this.labelStyle
      const contentStyle =
        props.contentStyle || props['content-style'] || this.contentStyle
      if (labelPlacement === 'left') {
        if (bordered) {
          state.row.push(
            <th
              class={`${mergedClsPrefix}-descriptions-table-header`}
              colspan={1}
              style={labelStyle}
            >
              {itemLabel}
            </th>,
            <td
              class={`${mergedClsPrefix}-descriptions-table-content`}
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2 + 1
                  : itemSpan * 2 - 1
              }
              style={contentStyle}
            >
              {itemChildren}
            </td>
          )
        } else {
          state.row.push(
            <td
              class={`${mergedClsPrefix}-descriptions-table-content`}
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2
                  : itemSpan * 2
              }
            >
              <span
                class={`${mergedClsPrefix}-descriptions-table-content__label`}
                style={labelStyle}
              >
                {[
                  ...itemLabel,
                  separator && (
                    <span class={`${mergedClsPrefix}-descriptions-separator`}>
                      {separator}
                    </span>
                  )
                ]}
              </span>
              <span
                class={`${mergedClsPrefix}-descriptions-table-content__content`}
                style={contentStyle}
              >
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
          <th
            class={`${mergedClsPrefix}-descriptions-table-header`}
            colspan={colspan}
            style={labelStyle}
          >
            {itemLabel}
          </th>
        )
        state.secondRow.push(
          <td
            class={`${mergedClsPrefix}-descriptions-table-content`}
            colspan={colspan}
            style={contentStyle}
          >
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
      <tr class={`${mergedClsPrefix}-descriptions-table-row`}>{row}</tr>
    ))
    return (
      <div
        style={cssVars as CSSProperties}
        class={[
          `${mergedClsPrefix}-descriptions`,
          `${mergedClsPrefix}-descriptions--${labelPlacement}-label-placement`,
          `${mergedClsPrefix}-descriptions--${labelAlign}-label-align`,
          `${mergedClsPrefix}-descriptions--${size}-size`,
          bordered && `${mergedClsPrefix}-descriptions--bordered`
        ]}
      >
        {title || this.$slots.header ? (
          <div class={`${mergedClsPrefix}-descriptions-header`}>
            {title || getSlot(this, 'header')}
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-descriptions-table-wrapper`}>
          <table class={`${mergedClsPrefix}-descriptions-table`}>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    )
  }
})
