<script>
import { h, resolveComponent } from 'vue'

export default {
  name: 'NNimbusServiceLayoutSiderMenu',
  inject: {
    NNimbusServiceLayout: {
      default: false
    }
  },
  computed: {
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
    createItems (items) {
      return items.map(item => {
        return {
          title: item.title || item.name,
          titleExtra: item.titleExtra,
          name: item.name,
          disabled: !!item.disabled,
          children: item.childItems ? this.createItems(item.childItems) : undefined,
          group: item.group,
          onClick: !(item.group && item.childItems) ? () => {
            if (this.$router && item.path) {
              Promise.resolve(
                this.$router.push(item.path)
              ).catch(err => {
                console.log(err)
              })
            }
          } : undefined
        }
      })
    }
  },
  render () {
    const ServiceLayout = this.NNimbusServiceLayout
    return h(resolveComponent('NMenu'),
      {
        value: ServiceLayout.value || ServiceLayout.activeItem,
        expandedNames: ServiceLayout.expandedNames,
        defaultExpandedNames: ServiceLayout.defaultExpandedNames || this.subMenuNames,
        rootIndent: 36,
        indent: 40,
        items: this.createItems(ServiceLayout.items)
      }
    )
  }
}
</script>
