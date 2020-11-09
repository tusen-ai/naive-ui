import { h } from 'vue'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'
import { warn } from '../../_utils/naive/warn'
import { getSlot, getVNodeChildren } from '../../_utils/vue'
import { useCompitable } from 'vooks'
import { isDescriptionsItem } from './utils'

export default {
  name: 'Descriptions',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
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
    return {
      compitableColumn: useCompitable(
        props,
        [
          'columns',
          'column'
        ]
      )
    }
  },
  render () {
    let children = getSlot(this, 'default', [])
    const memorizedLength = children.length
    const {
      compitableColumn,
      mergedTheme,
      labelPlacement,
      labelAlign,
      size,
      bordered,
      title,
      mergedStyle
    } = this
    children = children.filter(child => isDescriptionsItem(child))
    if (__DEV__ && memorizedLength !== children.length) {
      warn('descriptions', '`n-descriptions` only takes `n-descriptions-item` as children.')
    }
    children = children.reduce((state, vNode, index) => {
      const props = vNode.props || {}
      const isLastIteration = children.length - 1 === index
      const itemLabel = ['label' in props ? props.label : getVNodeChildren(vNode, 'label')]
      const itemChildren = [getVNodeChildren(vNode)]
      const itemSpan = (props.span || 1)
      const memorizedSpan = state.span
      state.span += itemSpan
      if (labelPlacement === 'left') {
        if (bordered) {
          state.row.push(h('th', {
            class: 'n-descriptions-table-header',
            colspan: 1
          }, itemLabel), h('td', {
            class: 'n-descriptions-table-content',
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 + 1 : itemSpan * 2 - 1
          }, itemChildren))
        } else {
          state.row.push(h('td', {
            class: 'n-descriptions-table-content',
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2
          }, [
            h('span', {
              class: 'n-descriptions-table-content__label'
            }, itemLabel.concat([': '])), h('span', {
              class: 'n-descriptions-table-content__content'
            }, itemChildren)]))
        }
      } else {
        const colspan = isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2
        state.row.push(h('th', {
          class: 'n-descriptions-table-header',
          colspan
        }, itemLabel))
        state.secondRow.push(h('td', {
          class: 'n-descriptions-table-content',
          colspan
        }, itemChildren))
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
    }, {
      span: 0,
      row: [],
      secondRow: [],
      rows: []
    })
    children = children.rows.map(row => h('tr', {
      class: 'n-descriptions-table-row'
    }, row))
    return h('div', {
      style: mergedStyle,
      class: [
        'n-descriptions',
        `n-descriptions--${labelPlacement}-label-placement`,
        `n-descriptions--${labelAlign}-label-align`,
        `n-descriptions--${size}-size`,
        {
          [`n-${mergedTheme}-theme`]: mergedTheme,
          'n-descriptions--bordered': bordered
        }
      ]
    }, [
      (title || this.$slots.header) ? h('div', {
        class: 'n-descriptions-header'
      }, title ? [
        title
      ] : getSlot(this, 'header')) : null,
      h('div', {
        class: 'n-descriptions-table-wrapper'
      }, [
        h('table', {
          class: 'n-descriptions-table'
        }, [
          h('tbody', null, children)
        ])
      ])
    ])
  }
}
