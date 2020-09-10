
<script>
import Scrollbar from '../../../scrollbar'
import withapp from '../../../_mixins/withapp'
import themeable from '../../../_mixins/themeable'
import getDefaultSlot from '../../../_utils/vue/getDefaultSlot'
import SiderMenu from './SiderMenu'
import NLayout from '../../../layout/src/Layout.vue'
import NLayoutSider from '../../../layout/src/LayoutSider'
import { h } from 'vue'

export default {
  name: 'NNimbusServiceLayout',
  components: {
    Scrollbar
  },
  provide () {
    return {
      NNimbusServiceLayout: this
    }
  },
  mixins: [withapp, themeable],
  model: {
    prop: 'value',
    event: 'input'
  },
  emits: ['input'],
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
    },
    bodyThemedStyle: {
      type: Object,
      default: null
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
      // TODO fix
      traverse(this.items || [])
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
    },
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
  render () {
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
    // const scopedSlots = this.$slots
    return h(NLayout, {
      class: {
        'n-nbs': true,
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      },
      position: 'absolute'
    }, {
      default: () => [
      // scopedSlots.nav ? h('n-layoutHeader', {
      //   style: {
      //     height: '64px',
      //     zIndex: this.headerZIndex
      //   },
      //   bordered: true
      // }, scopedSlots.nav()) : null,
        h(NLayout, {
          style: {
            top: this.$slots.nav ? '64px' : null
          },
          themedStyle: this.bodyThemedStyle,
          position: 'absolute'
        }, {
          // [
          //   this.name ? h('div', {
          //     staticStyle: {
          //       alignItems: 'center',
          //       height: '64px',
          //       paddingLeft: '36px',
          //       fontSize: '16px',
          //       fontWeight: '500',
          //       display: 'flex',
          //       position: 'relative'
          //     }
          //   }, [
          //     this.$slots['drawer-header-icon'] ? h(
          //       'NConfigConsumer', {
          //         props: {
          //           abstract: true
          //         },
          //         scopedSlots: {
          //           default: ({ styleScheme }) => {
          //             return h('NIcon', {
          //               props: { size: 20 },
          //               staticStyle: {
          //                 position: 'absolute',
          //                 left: '10px',
          //                 top: '50%',
          //                 transform: 'translateY(-50%)'
          //               },
          //               style: {
          //                 fill: (styleScheme && styleScheme.secondaryTextColor) || null
          //               }
          //             }, this.$slots['drawer-header-icon'])
          //           }
          //         }
          //       }) : null,
          //     h('span', {}, this.name)
          //   ]) : null,
          //   this.name ? h('n-divider', {
          //     staticStyle: {
          //       margin: '0',
          //       padding: '0 20px 0 4px'
          //     }
          //   }) : null,
          //   h(SiderMenu)]
          // ),
          default: () => [
            h(NLayoutSider, {
              ...siderProps,
              style: {
                'display': 'flex',
                'justify-content': 'flex-end',
                ...this.siderStyle
              },
              onCollapse: () => {
                this.collapsed = true
              },
              onExpand: () => {
                this.collapsed = false
              }
            }),
            h(NLayout, {
              ref: 'body',
              style: { ...this.contentStyle },
              'use-native-scrollbar': false,
              themedStyle: this.bodyThemedStyle,
              'scroll-content-style': {
                width: '100%',
                boxSizing: 'border-box',
                padding: this.paddingBody ? '21px 48px' : null
              }
            }, {
              default: this.$slots.default
            })
          ]
        })
      ]
    })
  }
}
</script>
