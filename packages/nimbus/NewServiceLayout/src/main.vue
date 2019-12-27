
<script>
import Scrollbar from '../../../common/Scrollbar'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import toggleButton from './toggleButton'

export default {
  name: 'NNimbusServiceLayout',
  components: {
    Scrollbar,
    toggleButton
  },
  mixins: [withapp, themeable],
  props: {
    icon: {
      type: String,
      default: 'md-settings'
    },
    name: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true
    },
    paddingBody: {
      type: Boolean,
      default: true
    },
    disableMenu: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    openNames: {
      type: Array,
      default: () => {
        return null
      }
    },
    defaultOpenNames: {
      type: Array,
      default: () => {
        return null
      }
    }

  },
  data () {
    return {
      activeItem: null,
      collapsed: false
    }
  },
  computed: {
    subMenuNames () {
      const subMenuNames = []
      function traverse (items) {
        items.forEach(item => {
          if (item.childItems) {
            subMenuNames.push(item.name)
            traverse(item.childItems)
          }
        })
      }
      traverse(this.items)
      return subMenuNames
    }
  },
  watch: {
    $route (to, from) {
      this.syncActiveItemWithPath(to.path, this.items)
    }
  },
  created () {
    if (this.$route) {
      this.syncActiveItemWithPath(this.$route.path, this.items)
    }
  },
  methods: {
    syncActiveItemWithPath (path, items) {
      for (const item of items) {
        if (item.childItems) {
          this.syncActiveItemWithPath(path, item.childItems)
        } else if (item.path === path) {
          this.$emit('input', item.name)
          this.activeItem = item.name
          return
        }
      }
    }
  },
  render (h) {
    const siderProps = {
      'show-toggle-button': true,
      'show-trigger': true,
      'collapsed': this.collapsed,
      'collapse-mode': 'transform',
      'bordered': true,
      'mode': 'absolute',
      'show-content': !this.collapsed,
      'use-native-scrollbar': false
    }
    const createMenu = items => {
      return items.map(item => {
        const props = {
          title: item.name,
          name: item.name,
          disabled: !!item.disabled
        }
        if (item.childItems) {
          return h('NSubMenu', {
            props
          },
          createMenu(item.childItems)
          )
        } else {
          return h('NMenuItem', {
            props: props,
            on: {
              click: () => {
                if (this.$router && item.path) {
                  this.$router.push(item.path)
                }
              }
            }
          })
        }
      })
    }
    return h('NLayout', {
      staticClass: 'n-new-nimbus-service-layout',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      },
      props: {
        mode: 'absolute'
      }
    }, [
      h('NLayoutHeader', {
        staticClass: 'n-new-nimbus-service-layout__header',
        class: {
          'n-new-nimbus-service-layout__header--hide': !this.$slots.nav
        },
        props: {
          bordered: true
        }
      }, this.$slots.nav),

      h('NLayout', {
        staticClass: 'n-nimbus-service-layout-container',
        class: {
          'n-nimbus-service-layout-container--has-top': this.$slots.nav
        },
        props: {
          mode: 'absolute'
        }
      }, [
        h('NLayoutSider', {
          class: 'n-nimbus-service-layout-container-sider',
          props: siderProps,
          on: {
            collapse: () => {
              this.collapsed = true
            },
            expand: () => {
              this.collapsed = false
            }
          }
        },
        [
          h('div', {
            style: { 'padding-left': '24px', 'font-size': '16px', 'font-weight': 700 },
            class: 'n-nimbus-service-layout-container-sider-header'
          }, [
            h('NIcon', {
              staticClass: 'n-nimbus-service-layout-container-sider-header__icon',
              class: {
                'n-nimbus-service-layout-container-sider-header__icon--hide': !this.$slots['drawer-header-icon']
              },
              props: { size: 22 }
            },
            this.$slots['drawer-header-icon']),
            h('span', {}, this.name)
          ]
          ),
          h('NMenu',
            {
              props: {
                value: this.value || this.activeItem,
                openNames: this.openNames,
                defaultOpenNames: this.defaultOpenNames || this.subMenuNames,
                indent: 24
              },
              on: this.$listeners
            },
            createMenu(this.items)
          )]
        ),
        // this.$slots.default
        h('NLayout', {
          props: {
            'mode': 'absolute',
            'use-native-scrollbar': false
          },
          class: 'n-new-nimbus-service-layout-container__content'
        }, this.$slots.default)
      ])
    ])
  }
}
</script>
