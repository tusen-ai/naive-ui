<template>
  <div
    class="n-positioning-container"
  >
    <div ref="content" class="n-positioning-content">
      <transition name="n-cascader-menu-transition">
        <div
          v-if="active"
          class="n-cascader-menu"
          :class="{
            [`n-${theme}-theme`]: theme
          }"
          @mousedown.prevent="() => {}"
        >
          <n-cascader-submenu
            v-for="(submenuOptions, index) in menuModel"
            :key="index"
            :size="size"
            :options="submenuOptions"
            :depth="index + 1"
            :menu-is-loading="loading"
            @option-click="handleOptionClick"
            @option-mouseenter="handleOptionMouseEnter"
            @option-mouseleave="handleOptionMouseLeave"
            @option-check="handleCascaderOptionCheck"
          />
          <n-base-menu-mask
            ref="mask"
            :theme="theme"
            :duration="3000"
          />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import NBaseMenuMask from '../../_base/MenuMask'
import NCascaderSubmenu from './CascaderSubmenu'
import placeable from '../../_mixins/placeable'
import { minus, merge, getPickerElement } from './utils'
import zindexable from '../../_mixins/zindexable'

import {
  firstOptionId,
  menuModel
} from '../../_utils/data/menuModel'

export default {
  name: 'NCascaderMenu',
  inject: {
    NCascader: {
      default: null
    }
  },
  components: {
    NCascaderSubmenu,
    NBaseMenuMask
  },
  mixins: [ placeable, zindexable ],
  props: {
    type: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    pattern: {
      type: String,
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    activeId: {
      type: String,
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    },
    patches: {
      validator (patches) {
        return patches instanceof Map
      },
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingId: {
      type: String,
      default: null
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    theme: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      trackId: null,
      /** for zindexable, shouldn't be changed */
      detached: true
    }
  },
  computed: {
    expandTriggeredByHover () {
      return this.expandTrigger === 'hover'
    },
    expandTriggeredByClick () {
      return this.expandTrigger === 'click'
    },
    menuModel () {
      return menuModel(this.options, this.activeId, this.trackId, this.loadingId)
    },
    firstCascaderOption () {
      if (this.menuModel && this.menuModel[0] && this.menuModel[0][0]) {
        return this.menuModel[0][0]
      } else {
        return null
      }
    },
    idOptionMap () {
      const idOptionMap = new Map()
      for (const submenu of this.menuModel) {
        for (const option of submenu) {
          idOptionMap.set(option.id, option)
        }
      }
      return idOptionMap
    },
    firstOptionId () {
      return firstOptionId(this.options)
    }
  },
  watch: {
    active (value) {
      if (value) {
        this.$nextTick().then(() => {
          if (this.lazy && !this.options[0].children) {
            const option = this.options[0]
            if (!this.loading) {
              this.updateLoadingStatus(true)
              this.$refs.mask.show(`Loading`)
              this.onLoad(option, (children) => this.NCascader.resolveLoad(option, children, () => {
                this.hideMask()
              }), () => this.rejectLoad(() => {
                this.hideMask()
              }))
            }
          }
        })
      }
    },
    menuModel () {
      this.$nextTick().then(() => {
        // console.log('menu model')
        this.updatePosition()
      })
    },
    activeId (id) {
      if (!id) return
      /**
       * lazy load
       */
      const option = this.idOptionMap.get(id)
      if (option && !option.loaded) {
        this.loadOptionChildren(option)
      }
    },
    trackId (id) {
      if (!id) return
      /**
       * scroll to option element
       */
      this.$nextTick().then(() => {
        const option = this.idOptionMap.get(id)
        if (!option) return
        const submenuInstance = this.$children.find(child => child.depth === option.depth)
        if (submenuInstance) {
          const scrollbar = submenuInstance.$refs.scrollbar
          if (scrollbar) {
            const optionElement = this.$el.querySelector(`[data-n-cascader-option-id="${id}"]`)
            scrollbar.scrollToElement(optionElement)
          }
        }
      })
    }
  },
  methods: {
    getZindexableContent () {
      return this.$el
    },
    getTrackedElement () {
      return getPickerElement(this)
    },
    hideMask () {
      if (this.$refs.mask) {
        this.$refs.mask.hide()
      }
    },
    optionPath (optionId) {
      const path = []
      if (optionId === null) return path
      let done = false
      function traverseOptions (options) {
        if (!Array.isArray(options) || !options.length) return
        for (const option of options) {
          if (done) return
          path.push(option)
          if (option.id === optionId) {
            done = true
            return
          }
          if (option.children) {
            traverseOptions(option.children)
          }
          if (done) return
          path.pop(option)
        }
      }
      traverseOptions(this.options)
      return path
    },
    handleOptionMouseEnter (e, option) {
      if (this.expandTriggeredByHover && !option.disabled) {
        this.updateActiveId(option.id)
      }
    },
    handleOptionMouseLeave (e, option) {
    },
    updateLoadingId (id) {
      // console.log('updateLoadingId', id)
      this.$emit('update:loadingId', id)
    },
    updateLoadingStatus (loading) {
      this.$emit('update:loading', loading)
    },
    loadOptionChildren (option) {
      if (this.lazy) {
        if (!option.loaded) {
          if (!this.loading) {
            this.updateLoadingStatus(true)
            this.updateLoadingId(option.id)
            this.onLoad(option, (children) => this.NCascader.resolveLoad(option, children), () => this.rejectLoad())
          }
        }
      }
    },
    handleOptionClick (e, option) {
      if (!option.disabled) {
        this.updateActiveId(option.id)
        this.updateTrackId(option.id)
        if (option.isLeaf) {
          this.handleCascaderOptionCheck(option.id)
        }
      }
    },
    handleCascaderOptionCheck (optionId) {
      const option = this.idOptionMap.get(optionId)
      if (!option || option.disabled) return
      if (this.type === 'multiple') {
        const newValues = []
        if (!option.determined) {
          this.$refs.mask.showOnce(
            this.NCascader.localeNamespace.loadingRequiredMessage(option.label)
          )
          return
        }
        const traverseMultiple = item => {
          if (!item || item.disabled) return
          if (Array.isArray(item.children)) {
            for (const child of item.children) {
              traverseMultiple(child)
            }
          }
          if (!item.children) {
            newValues.push(item.value)
          }
        }
        traverseMultiple(option)
        if (Array.isArray(this.value)) {
          if (!option.checkboxChecked && !option.checkboxIndeterminate) {
            this.$emit('input', merge(this.value, newValues))
          } else {
            this.$emit('input', minus(this.value, newValues))
          }
        } else {
          this.$emit('input', newValues)
        }
      } else if (this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          if (!option.checkboxChecked) {
            this.$emit('input', merge(this.value, [option.value]))
          } else {
            this.$emit('input', minus(this.value, [option.value]))
          }
        } else {
          this.$emit('input', [option.value])
        }
      } else if (this.type === 'single-all-options') {
        this.$emit('input', option.value)
      } else if (this.type === 'single') {
        if (!option.hasChildren) {
          this.$emit('input', option.value)
        }
      }
    },
    deep () {
      if (this.trackId) {
        const option = this.idOptionMap.get(this.trackId)
        // console.log('currentOption', option)
        if (option && option.firstAvailableChildId) {
          this.updateTrackId(option.firstAvailableChildId)
          this.updateActiveId(option.firstAvailableChildId)
        }
      }
    },
    shallow () {
      // console.log('shallow: cascader menu')
      if (this.trackId) {
        const option = this.idOptionMap.get(this.trackId)
        if (option && option.availableParentId) {
          this.updateTrackId(option.availableParentId)
          this.updateActiveId(option.availableParentId)
        }
      }
    },
    updateTrackId (id) {
      this.trackId = id
    },
    updateActiveId (id) {
      this.$emit('update:activeId', id)
    },
    prev () {
      if (!this.filterable || (this.filterable && !this.pattern.length)) {
        if (this.trackId) {
          const option = this.idOptionMap.get(this.trackId)
          if (option && option.prevAvailableSiblingId) {
            this.updateTrackId(option.prevAvailableSiblingId)
            this.updateActiveId(option.prevAvailableSiblingId)
          }
        } else {
          const option = this.idOptionMap.get(this.firstOptionId)
          if (option) {
            this.updateTrackId(this.firstOptionId)
            this.updateActiveId(this.firstOptionId)
          }
        }
      }
    },
    next () {
      if (!this.filterable || (this.filterable && !this.pattern.length)) {
        if (this.trackId) {
          const option = this.idOptionMap.get(this.trackId)
          if (option && option.nextAvailableSiblingId) {
            this.updateTrackId(option.nextAvailableSiblingId)
            this.updateActiveId(option.nextAvailableSiblingId)
          }
        } else {
          const option = this.idOptionMap.get(this.firstOptionId)
          if (option) {
            this.updateTrackId(this.firstOptionId)
            this.updateActiveId(this.firstOptionId)
          }
        }
      }
    },
    enter () {
      if (this.trackId) {
        this.handleCascaderOptionCheck(this.trackId)
      }
    }
  }
}
</script>
