import { NMenu } from '../../../menu'
import { h } from 'vue'

export default {
  name: 'ServiceLayoutSider',
  inject: [
    'ServiceLayout'
  ],
  methods: {
    handleMenuUpdateValue (value, item) {
      if (this.$router && item.path) {
        Promise.resolve(
          this.$router.push(item.path)
        ).catch(err => {
          console.log(err)
        })
      }
      this.ServiceLayout.doUpdateValue(value)
    }
  },
  computed: {
    items () {
      function createItems (items) {
        return items.map(item => {
          const isGroup = (item.group || item.type === 'group')
          return {
            path: item.path,
            title: item.title || item.name,
            extra: item.extra || item.titleExtra,
            key: item.name,
            disabled: item.disabled,
            children: item.childItems ? createItems(item.childItems) : undefined,
            type: isGroup ? 'group' : undefined
          }
        })
      }
      return createItems(this.ServiceLayout.items)
    }
  },
  render () {
    const { ServiceLayout, items } = this
    return h(NMenu,
      {
        value: ServiceLayout.mergedValue,
        defaultExpandAll: true,
        rootIndent: 36,
        indent: 40,
        items,
        'onUpdate:expandedKeys': ServiceLayout.onExpandedNamesChange,
        'onUpdate:value': this.handleMenuUpdateValue
      }
    )
  }
}
