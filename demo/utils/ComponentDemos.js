import { h } from 'vue'
import NCol from '../../src/legacy-grid/src/Col'
import NRow from '../../src/legacy-grid/src/Row'

export default {
  name: 'ComponentDemos',
  props: {
    singleColumn: {
      type: Boolean,
      default: false
    }
  },
  render () {
    const defaultSlot = (this.$slots.default && this.$slots.default()) || []
    if (this.singleColumn) {
      return h(
        NRow,
        {
          gutter: 16
        },
        {
          default: () => h(NCol, { span: 24 }, this.$slots)
        }
      )
    } else {
      const leftColumn = defaultSlot.filter((value, index) => index % 2 === 0)
      const rightColumn = defaultSlot.filter((value, index) => index % 2 === 1)
      return h(
        NRow,
        {
          gutter: 16
        },
        {
          default: () => [
            h(
              NCol,
              { span: 12 },
              {
                default: () => leftColumn
              }
            ),
            h(
              NCol,
              { span: 12 },
              {
                default: () => rightColumn
              }
            )
            // h(NCol, { props: { span: 4 } }, anchor)
          ]
        }
      )
    }
  }
}
