import {
  rootedOptions,
  patchedOptions,
  linkedCascaderOptions,
  menuOptions
} from '../../../utils/data/menuModel'

const NTreeNodeExpandWrapper = {
  methods: {
    handleBeforeLeave () {
      this.$el.style.maxHeight = this.$el.offsetHeight + 'px'
      this.$el.style.height = this.$el.offsetHeight + 'px'
      this.$el.getBoundingClientRect()
    },
    handleLeave () {
      this.$el.style.maxHeight = 0
      this.$el.getBoundingClientRect()
    },
    handleEnter () {
      this.$nextTick().then(() => {
        this.$el.style.height = this.$el.offsetHeight + 'px'
        this.$el.style.maxHeight = 0
        this.$el.getBoundingClientRect()
        this.$el.style.maxHeight = this.$el.style.height
      })
    },
    handleAfterEnter () {
      this.$el.style.height = null
      this.$el.style.maxHeight = null
    }
  },
  render (h) {
    return h('transition', {
      props: {
        name: 'n-height-seamlessly-expand'
      },
      on: {
        beforeLeave: this.handleBeforeLeave,
        leave: this.handleLeave,
        enter: this.handleEnter,
        afterEnter: this.handleAfterEnter
      }
    }, this.$slots.default)
  }
}

const NTreeNode = {
  props: {
    data: {
      type: Object,
      required: true
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.data)
    }
  },
  render (h) {
    return h('span', {
      on: {
        click: this.handleClick
      }
    }, [
      this.data.isLeaf ? null : this.expand ? 'v ' : '> ',
      this.data.label
    ])
  }
}

function genSingleNode (node, h, self) {
  if (node.isLeaf) {
    return h('li', {
      staticClass: 'n-tree-node'
    }, [
      h(NTreeNode, {
        props: {
          data: node,
          expand: self.expandNodesId.includes(node.id)
        },
        on: {
          click: self.handleNodeClick
        }
      })
    ])
  } else if (node.children) {
    return h('li', {
      staticClass: 'n-tree-node'
    }, [
      h(NTreeNode, {
        props: {
          data: node,
          expand: self.expandNodesId.includes(node.id)
        },
        on: {
          click: self.handleNodeClick
        }
      }),
      h(NTreeNodeExpandWrapper, {},
        [self.expandNodesId.includes(node.id)
          ? h('ul', {
            staticClass: 'n-tree-children-wrapper'
          }, node.children.map(child => genSingleNode(child, h, self)))
          : null]
      )
    ])
  }
}

function convertRootedOptionsToVNodeTree (root, h, self) {
  return root.children.map(child => genSingleNode(child, h, self))
}

export default {
  name: 'NTree',
  props: {
    data: {
      type: Array,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      patches: new Map(),
      expandNodesId: []
    }
  },
  watch: {
    data () {
      this.patches = new Map()
      this.expandNodesId = []
    }
  },
  computed: {
    rootedOptions () {
      return rootedOptions(this.data)
    },
    patchedOptions () {
      return patchedOptions(this.rootedOptions, this.patches)
    },
    linkedCascaderOptions () {
      return linkedCascaderOptions(this.patchedOptions, 'multiple-all-options')
    },
    menuOptions () {
      return menuOptions(this.linkedCascaderOptions)
    }
  },
  mounted () {
    // console.log(this.menuOptions)
  },
  methods: {
    toggleExpand (node) {
      const index = this.expandNodesId.findIndex(expandNodeId => expandNodeId === node.id)
      if (~index) {
        this.expandNodesId.splice(index, 1)
      } else {
        if (!node.isLeaf) {
          this.expandNodesId.push(node.id)
        }
      }
    },
    handleNodeClick (node) {
      this.toggleExpand(node)
      // console.log(this.expandNodesId)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-tree'
    }, convertRootedOptionsToVNodeTree(this.menuOptions[0], h, this))
  }
}
