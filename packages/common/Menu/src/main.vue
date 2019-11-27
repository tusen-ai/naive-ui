
<script>
import Menu from './menu.vue'
import MenuItem from './menuItem.vue'
import SubMenu from './subMenu.vue'
import ItemGroup from './itemGroup.vue'

export default {
  name: 'NMenu',
  functional: true,
  render (h, context) {
    if (context.props.items && !(context.$slots && context.$slots.default && context.$slots.default.length)) {
      let test = function (list) {
        return list.map(function (item, index) {
          let props = {
            title: item.title,
            name: item.name,
            disabled: !!item.disabled
          }
          if (item.children) {
            if (item.groupTitle) {
              let groupProps = {
                title: item.groupTitle
              }
              return h(SubMenu, {
                props: props
              },
              [
                h(ItemGroup, {
                  props: groupProps
                }, test(item.children))
              ]
              )
            } else {
              return h(SubMenu, {
                props: props
              },
              test(item.children)
              )
            }
          } else {
            return h(MenuItem, {
              props: props
            })
          }
        })
      }
      return h(Menu,
        {
          props: context.props,
          scopedSlots: context.scopedSlots,
          on: context.listeners
        },
        test(context.props.items)
      )
    } else {
      return h(Menu, {
        props: context.props,
        scopedSlots: context.scopedSlots,
        on: context.listeners
      })
    }
  }
}
</script>
