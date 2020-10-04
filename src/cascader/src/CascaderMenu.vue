<template>
  <div
    ref="offsetContainerRef"
    v-zindexable="{ enabled: active }"
    class="n-positioning-container"
  >
    <div ref="trackingRef" class="n-positioning-content">
      <transition
        name="n-fade-in-scale-up-transition"
        :appear="NCascader.isMounted"
      >
        <div
          v-if="active"
          ref="bodyRef"
          v-clickoutside="handleClickOutside"
          class="n-cascader-menu"
          :class="{
            [`n-${theme}-theme`]: theme,
            [`n-cascader-menu--${size}-size`]: size
          }"
          @mousedown.capture="handleMenuMouseDown"
        >
          <n-cascader-submenu
            v-for="(submenuOptions, index) in menuModel"
            :ref="instance => { if (instance) submenuRefs[index] = instance }"
            :key="index"
            :size="size"
            :options="submenuOptions"
            :depth="index + 1"
          />
          <n-base-menu-mask
            ref="maskRef"
            :theme="theme"
            :duration="3000"
          />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import NBaseMenuMask from '../../_base/menu-mask'
import NCascaderSubmenu from './CascaderSubmenu.vue'
import { placeable } from '../../_mixins'
import { minus, merge, getPickerElement } from './utils'
import {
  zindexable,
  clickoutside
} from '../../_directives'
import {
  firstOptionId,
  menuModel
} from '../../_utils/component/cascader'

export default {
  name: 'NCascaderMenu',
  components: {
    NCascaderSubmenu,
    NBaseMenuMask
  },
  directives: {
    zindexable,
    clickoutside
  },
  mixins: [
    placeable
  ],
  inject: {
    NCascader: {
      default: null
    }
  },
  provide () {
    return {
      NCascaderMenu: this
    }
  },
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
    onLoad: {
      type: Function,
      default: () => {}
    },
    theme: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:loading': {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:loadingId': {
      type: Function,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:activeId': {
      type: Function,
      required: true
    }
  },
  setup () {
    return {
      submenuRefs: ref([]),
      maskRef: ref(null),
      trackingRef: ref(null),
      offsetContainerRef: ref(null),
      bodyRef: ref(null)
    }
  },
  data () {
    return {
      trackId: null
    }
  },
  computed: {
    __placeableEnabled () {
      return this.active
    },
    loadingId () {
      return this.NCascader.loadingId
    },
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
        this.$nextTick(() => {
          if (this.lazy && !this.options[0].children) {
            const option = this.options[0]
            if (!this.loading) {
              this.updateLoadingStatus(true)
              this.maskRef.show(this.NCascader.localeNamespace.loading)
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
      this.$nextTick(() => {
        this.__placeableSyncPosition()
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
      if (id === null || id === undefined) return
      /**
       * scroll to option element
       */
      this.$nextTick(() => {
        const option = this.idOptionMap.get(id)
        if (!option) return
        const submenuInstance = this.submenuRefs[option.depth - 1]
        if (submenuInstance) {
          const scrollbar = submenuInstance.scrollbarRef
          if (scrollbar) {
            const optionElement = submenuInstance.$el.querySelector(`[n-option-id="${id}"]`)
            scrollbar.scrollToElement(optionElement, {
              behavior: 'auto'
            })
          }
        }
      })
    }
  },
  methods: {
    __placeableTracked () {
      return getPickerElement(this)
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableBody () {
      return this.bodyRef
    },
    handleMenuMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    hideMask () {
      if (this.maskRef) {
        this.maskRef.hide()
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
    updateLoadingId (id) {
      const { 'onUpdate:loadingId': onUpdateLoadingId } = this
      onUpdateLoadingId(id)
    },
    updateLoadingStatus (loading) {
      const { 'onUpdate:loading': onUpdateLoading } = this
      onUpdateLoading(loading)
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
    handleOptionMouseEnter (e, option) {
      if (this.expandTriggeredByHover && !option.disabled) {
        this.updateActiveId(option.id)
      }
    },
    handleOptionMouseLeave (e, option) {
    },
    handleOptionClick (e, option) {
      if (!option.disabled) {
        this.updateActiveId(option.id)
        this.updateTrackId(option.id)
        if (option.isLeaf) {
          this.handleOptionCheck(option.id)
        }
      }
    },
    handleOptionCheck (optionId) {
      const option = this.idOptionMap.get(optionId)
      if (!option || option.disabled) return
      const {
        'onUpdate:value': onUpdateValue
      } = this
      if (this.type === 'multiple') {
        const newValues = []
        if (!option.determined) {
          this.maskRef.showOnce(
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
            onUpdateValue(merge(this.value, newValues))
          } else {
            onUpdateValue(minus(this.value, newValues))
          }
        } else {
          onUpdateValue(newValues)
        }
      } else if (this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          if (!option.checkboxChecked) {
            onUpdateValue(merge(this.value, [option.value]))
          } else {
            onUpdateValue(minus(this.value, [option.value]))
          }
        } else {
          onUpdateValue([option.value])
        }
      } else if (this.type === 'single-all-options') {
        onUpdateValue(option.value)
      } else if (this.type === 'single') {
        if (!option.hasChildren) {
          onUpdateValue(option.value)
        }
      }
    },
    deep () {
      if (this.trackId) {
        const option = this.idOptionMap.get(this.trackId)
        if (option && option.firstAvailableChildId) {
          this.updateTrackId(option.firstAvailableChildId)
          this.updateActiveId(option.firstAvailableChildId)
        }
      }
    },
    shallow () {
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
      const {
        'onUpdate:activeId': onUpdateActiveId
      } = this
      onUpdateActiveId(id)
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
        this.handleOptionCheck(this.trackId)
      }
    },
    handleClickOutside (e) {
      this.NCascader.handleCascaderMenuClickOutside(e)
    }
  }
}
</script>
