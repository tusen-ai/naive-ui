
<script>
import { h } from 'vue'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import MenuItemGroup from './MenuItemGroup.vue'

// Todo remove unnecessary attrs
// Todo refactor to remove slot
export default {
  name: 'Menu',
  props: Menu.props,
  render () {
    if (this.$props.items) {
      const createItems = items => {
        return items.map(item => {
          const props = {
            title: item.title,
            titleExtra: item.titleExtra,
            name: item.name,
            disabled: !!item.disabled
          }
          if (item.children) {
            const scopedSlots = {}
            if (typeof item.title === 'function') {
              delete props.title
              scopedSlots.header = item.title
            }
            if (typeof item.icon === 'function') {
              scopedSlots.icon = () => item.icon(h)
            }
            if (item.group || item.type === 'group') {
              return h(MenuItemGroup, {
                props,
                scopedSlots
              }, createItems(item.children))
            } else {
              return h(Submenu, {
                props,
                scopedSlots
              }, createItems(item.children))
            }
          } else {
            const scopedSlots = {}
            if (typeof item.title === 'function') {
              delete props.title
              scopedSlots.default = item.title
            }
            if (typeof item.icon === 'function') {
              scopedSlots.icon = () => item.icon(h)
            }
            return h(MenuItem, {
              props,
              scopedSlots
            })
          }
        })
      }
      return h(Menu,
        {
          props: this.$props,
          scopedSlots: { ...this.$slots },
          on: this.$listeners,
          attrs: this.$data.attrs
        },
        createItems(this.$props.items)
      )
    } else {
      return h(Menu, {
        props: this.$props,
        scopedSlots: { ...this.$slots },
        on: this.$listeners,
        attrs: this.$data.attrs
      })
    }
  }
}
</script>
