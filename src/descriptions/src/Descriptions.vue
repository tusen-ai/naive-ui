<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

function isDescriptionsItem (vNode) {
  return (
    vNode.componentOptions &&
    vNode.componentOptions.Ctor &&
    vNode.componentOptions.Ctor.extendOptions &&
    vNode.componentOptions.Ctor.extendOptions.name === 'DescriptionsItem'
  )
}

export default {
  name: 'Descriptions',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    title: {
      type: String,
      default: null
    },
    column: {
      type: Number,
      default: 3
    },
    columns: {
      type: Number,
      default: null
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
  computed: {
    syntheticColumn () {
      return this.columns || this.column
    }
  },
  render (h) {
    let children = this.$slots.default ? this.$slots.default() : []
    if (children.some(child => !isDescriptionsItem(child))) {
      console.error(
        '[naive-ui/descriptions]: `n-descriptions` only takes `n-descriptions-item` as children.'
      )
    }
    children = children.filter(child => isDescriptionsItem(child))
    children = children.reduce((state, item, index) => {
      const isLastIteration = children.length - 1 === index
      const propsData = item.componentOptions.propsData
      const itemLabel = (item.data.scopedSlots && item.data.scopedSlots.label) ? item.data.scopedSlots.label() : [propsData.label]
      const itemChildren = item.componentOptions.children
      const itemSpan = (propsData.span || 1)
      const memorizedSpan = state.span
      state.span += itemSpan
      if (this.labelPlacement === 'left') {
        if (this.bordered) {
          state.row.push(h('th', {
            staticClass: 'n-descriptions-table-header',
            attr: {
              colspan: 1
            }
          }, itemLabel), h('td', {
            staticClass: 'n-descriptions-table-content',
            attrs: {
              colspan: isLastIteration ? (this.syntheticColumn - memorizedSpan) * 2 + 1 : itemSpan * 2 - 1
            }
          }, itemChildren))
        } else {
          state.row.push(h('td', {
            staticClass: 'n-descriptions-table-content',
            attrs: {
              colspan: isLastIteration ? (this.syntheticColumn - memorizedSpan) * 2 : itemSpan * 2
            }
          }, [
            h('span', {
              staticClass: 'n-descriptions-table-content__label'
            }, itemLabel.concat([':'])), h('span', {
              staticClass: 'n-descriptions-table-content__content'
            }, itemChildren)]))
        }
      } else {
        const colspan = isLastIteration ? (this.syntheticColumn - memorizedSpan) * 2 : itemSpan * 2
        state.row.push(h('th', {
          staticClass: 'n-descriptions-table-header',
          attrs: {
            colspan
          }
        }, itemLabel))
        state.secondRow.push(h('td', {
          staticClass: 'n-descriptions-table-content',
          attrs: {
            colspan
          }
        }, itemChildren))
      }
      if (state.span >= this.syntheticColumn || isLastIteration) {
        state.span = 0
        if (state.row.length) {
          state.rows.push(state.row)
          state.row = []
        }
        if (!(this.labelPlacement === 'left')) {
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
      staticClass: 'n-descriptions-table-row'
    }, row))
    return h('div', {
      staticClass: 'n-descriptions',
      style: this.syntheticStyle,
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
        [`n-descriptions--${this.labelPlacement}-label-placement`]: true,
        [`n-descriptions--${this.labelAlign}-label-align`]: true,
        [`n-descriptions--${this.size}-size`]: true,
        [`n-descriptions--bordered`]: this.bordered
      }
    }, [
      (this.title || this.$slots.header) ? h('div', {
        staticClass: 'n-descriptions-header'
      }, this.title ? [
        this.title
      ] : this.$slots.header()) : null,
      h('div', {
        staticClass: 'n-descriptions-table-wrapper'
      }, [
        h('table', {
          staticClass: 'n-descriptions-table'
        }, [
          h('tbody', {}, children)
        ])
      ])
    ])
  }
}
</script>
