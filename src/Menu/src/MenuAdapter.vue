
<script>
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
import MenuItemGroup from './MenuItemGroup.vue'

export default {
  name: 'NMenu',
  functional: true,
  render (h, context) {
    if (context.props.items) {
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
            if (item.group) {
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
            return h(MenuItem, {
              props,
              scopedSlots
            })
          }
        })
      }
      return h(Menu,
        {
          props: context.props,
          scopedSlots: { ...context.scopedSlots },
          on: context.listeners,
          attrs: context.data.attrs
        },
        createItems(context.props.items)
      )
    } else {
      return h(Menu, {
        props: context.props,
        scopedSlots: { ...context.scopedSlots },
        on: context.listeners,
        attrs: context.data.attrs
      })
    }
  }
}
</script>
