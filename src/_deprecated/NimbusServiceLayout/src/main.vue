
<script>
import Scrollbar from '../../../Scrollbar'
import withapp from '../../../_mixins/withapp'
import themeable from '../../../_mixins/themeable'

export default {
  name: 'NNimbusServiceLayout',
  components: {
    Scrollbar
  },
  mixins: [withapp, themeable],
  props: {
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
    value: {
      type: String,
      default: null
    },
    expandedNames: {
      type: Array,
      default: () => {
        return undefined
      }
    },
    defaultExpandedNames: {
      type: Array,
      default: () => {
        return undefined
      }
    },
    headerZIndex: {
      type: Number,
      default: undefined
    },
    siderStyle: {
      type: Object,
      default: null
    },
    contentStyle: {
      type: Object,
      default: null
    },
    siderBordered: {
      type: Boolean,
      default: true
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
    scrollTo (...args) {
      this.$refs.body.scrollTo(...args)
    },
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
      'collapse-mode': 'width',
      'bordered': this.siderBordered,
      'show-content': !this.collapsed,
      'use-native-scrollbar': false,
      'collapsed-width': 0,
      'width': 288,
      'trigger-style': {
        top: 'calc(50% - 78px)'
      },
      'scroll-container-style': {
        width: '288px'
      }
    }
    const createMenu = items => {
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
          createMenu(item.childItems)
          )
        }
        if (item.childItems) {
          return h('NSubmenu', {
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
                  this.$router.push(item.path).catch(() => {})
                }
              }
            }
          })
        }
      })
    }
    return h('NLayout', {
      staticClass: 'n-nbs',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      },
      props: {
        position: 'absolute'
      }
    }, [
      this.$slots.nav ? h('NLayoutHeader', {
        staticStyle: {
          height: '64px',
          zIndex: this.headerZIndex
        },
        props: {
          bordered: true
        }
      }, this.$slots.nav) : null,
      h('NLayout', {
        style: {
          top: this.$slots.nav ? '64px' : null
        },
        props: {
          position: 'absolute'
        }
      }, [
        h('NLayoutSider', {
          style: {
            'display': 'flex',
            'justify-content': 'flex-end',
            ...this.siderStyle
          },
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
          this.name ? h('div', {
            staticStyle: {
              alignItems: 'center',
              height: '64px',
              paddingLeft: '32px',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              position: 'relative'
            }
          }, [
            this.$slots['drawer-header-icon'] ? h(
              'NConfigConsumer', {
                props: {
                  abstract: true
                },
                scopedSlots: {
                  default: ({ styleScheme }) => {
                    return h('NIcon', {
                      props: { size: 20 },
                      staticStyle: {
                        position: 'absolute',
                        left: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                      },
                      style: {
                        fill: (styleScheme && styleScheme.secondaryTextColor) || null
                      }
                    }, this.$slots['drawer-header-icon'])
                  }
                }
              }) : null,
            h('span', {}, this.name)
          ]) : null,
          this.name ? h('n-divider', {
            staticStyle: {
              margin: '0',
              padding: '0 24px 0 6px'
            }
          }) : null,
          h('NMenu',
            {
              props: {
                value: this.value || this.activeItem,
                expandedNames: this.expandedNames,
                defaultExpandedNames: this.defaultExpandedNames || this.subMenuNames,
                rootIndent: 36,
                indent: 40
              },
              on: this.$listeners
            },
            createMenu(this.items)
          )]
        ),
        h('NLayout', {
          ref: 'body',
          style: { ...this.contentStyle },
          props: {
            'use-native-scrollbar': false,
            'scroll-content-style': {
              width: '100%',
              boxSizing: 'border-box',
              padding: this.paddingBody ? '21px 48px' : null
            }
          }
        }, this.$slots.default)
      ])
    ])
  }
}
</script>
