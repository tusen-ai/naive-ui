<script>
import { h } from 'vue'

export default {
  name: 'NNimbusServiceLayoutSiderMenu',
  inject: {
    NNimbusServiceLayout: {
      default: false
    }
  },
  computed: {
    content () {
      const ServiceLayout = this.NNimbusServiceLayout
      return this.createMenu(h, ServiceLayout.items)
    },
    subMenuNames () {
      const ServiceLayout = this.NNimbusServiceLayout
      const subMenuNames = []
      function traverse (items) {
        items.forEach(item => {
          if (item.childItems) {
            subMenuNames.push(item.name)
            traverse(item.childItems)
          }
        })
      }
      traverse(ServiceLayout.items || [])
      return subMenuNames
    }
  },
  methods: {
    createMenu (h, items) {
      return items.map(item => {
        const props = {
          title: item.title || item.name,
          titleExtra: item.titleExtra,
          name: item.name,
          disabled: !!item.disabled
        }
        if (item.group) {
          return h('NMenuItemGroup', {
            props
          },
          this.createMenu(h, item.childItems)
          )
        }
        if (item.childItems) {
          return h('NSubmenu', {
            props
          },
          this.createMenu(h, item.childItems)
          )
        } else {
          return h('NMenuItem', {
            props: props,
            on: {
              click: () => {
                if (this.$router && item.path) {
                  Promise.resolve(
                    this.$router.push(item.path)
                  ).catch(() => {})
                }
              }
            }
          })
        }
      })
    }
  },
  render () {
    const ServiceLayout = this.NNimbusServiceLayout
    return null
    // return h('NMenu',
    //   {
    //     ...ServiceLayout.$attrs,
    //     value: ServiceLayout.value || ServiceLayout.activeItem,
    //     expandedNames: ServiceLayout.expandedNames,
    //     defaultExpandedNames: ServiceLayout.defaultExpandedNames || this.subMenuNames,
    //     rootIndent: 36,
    //     indent: 40
    //   },
    //   {
    //     default: () => this.content
    //   }
    // )
  }
}
</script>
