import { computed, h, defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import style from './styles/index.cssr.js'
import { warn, getSlot, getVNodeChildren, createKey } from '../../_utils'
import { useCompitable } from 'vooks'
import { isDescriptionsItem } from './utils'
import { descriptionsLight } from '../styles'

export default defineComponent({
  name: 'Descriptions',
  props: {
    ...useTheme.props,
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
      default: 'top',
      validator (value) {
        return ['left', 'top'].includes(value)
      }
    },
    labelAlign: {
      default: 'left',
      validator (value) {
        return ['left', 'right', 'center'].includes(value)
      }
    },
    size: {
      default: 'medium',
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Description',
      'Description',
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
    let children = getSlot(this, 'default', [])
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
    children = children.filter((child) => isDescriptionsItem(child))
    if (__DEV__ && memorizedLength !== children.length) {
      warn(
        'descriptions',
        '`n-descriptions` only takes `n-descriptions-item` as children.'
      )
    }
    children = children.reduce(
      (state, vNode, index) => {
        const props = vNode.props || {}
        const isLastIteration = children.length - 1 === index
        const itemLabel = [
          'label' in props ? props.label : getVNodeChildren(vNode, 'label')
        ]
        const itemChildren = [getVNodeChildren(vNode)]
        const itemSpan = props.span || 1
        const memorizedSpan = state.span
        state.span += itemSpan
        if (labelPlacement === 'left') {
          if (bordered) {
            state.row.push(
              h(
                'th',
                {
                  class: 'n-descriptions-table-header',
                  colspan: 1
                },
                itemLabel
              ),
              h(
                'td',
                {
                  class: 'n-descriptions-table-content',
                  colspan: isLastIteration
                    ? (compitableColumn - memorizedSpan) * 2 + 1
                    : itemSpan * 2 - 1
                },
                itemChildren
              )
            )
          } else {
            state.row.push(
              h(
                'td',
                {
                  class: 'n-descriptions-table-content',
                  colspan: isLastIteration
                    ? (compitableColumn - memorizedSpan) * 2
                    : itemSpan * 2
                },
                [
                  h(
                    'span',
                    {
                      class: 'n-descriptions-table-content__label'
                    },
                    itemLabel.concat([': '])
                  ),
                  h(
                    'span',
                    {
                      class: 'n-descriptions-table-content__content'
                    },
                    itemChildren
                  )
                ]
              )
            )
          }
        } else {
          const colspan = isLastIteration
            ? (compitableColumn - memorizedSpan) * 2
            : itemSpan * 2
          state.row.push(
            h(
              'th',
              {
                class: 'n-descriptions-table-header',
                colspan
              },
              itemLabel
            )
          )
          state.secondRow.push(
            h(
              'td',
              {
                class: 'n-descriptions-table-content',
                colspan
              },
              itemChildren
            )
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
      },
      {
        span: 0,
        row: [],
        secondRow: [],
        rows: []
      }
    )
    children = children.rows.map((row) =>
      h(
        'tr',
        {
          class: 'n-descriptions-table-row'
        },
        row
      )
    )
    return h(
      'div',
      {
        style: cssVars,
        class: [
          'n-descriptions',
          `n-descriptions--${labelPlacement}-label-placement`,
          `n-descriptions--${labelAlign}-label-align`,
          `n-descriptions--${size}-size`,
          {
            'n-descriptions--bordered': bordered
          }
        ]
      },
      [
        title || this.$slots.header
          ? h(
            'div',
            {
              class: 'n-descriptions-header'
            },
            title ? [title] : getSlot(this, 'header')
          )
          : null,
        h(
          'div',
          {
            class: 'n-descriptions-table-wrapper'
          },
          [
            h(
              'table',
              {
                class: 'n-descriptions-table'
              },
              [h('tbody', null, children)]
            )
          ]
        )
      ]
    )
  }
})
