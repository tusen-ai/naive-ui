<template>
  <form 
    class="n-form"
    :class="{
      'n-form--inline': inline,
    }"
  >
    <slot v-bind:form="this"></slot>
  </form>
</template>
<script>
import { debuglog } from 'util';
export default {
  name: 'NForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number,
      default: 200
    },
    labelPosition: {
      type: String,
      default: 'right' // ['top', 'right', 'left', 'center']
    },
    model: {
      type: Object
    }, 
    disabled: {
      type: Boolean,
      default: null 
    },
    rules: {
      type: Object 
    }
  },
  data () {
    return {
      initialValue: '' 
    }
  },
  watch: {
    disabled: {
      handler (n) {
        this.disabledToggle(n)
      }
    }
  },
  created() {
    this.initialValue = JSON.parse(JSON.stringify(this.model || ''))
  },
  mounted () {
    this.disabledToggle(this.disabled)
  },
  methods: {
    disabledToggle (flag) {
      let sel = ['input', 'select', 'textarea'].map(i => '.n-form-item ' + i).join(',')
      let el = this.$el.querySelectorAll(sel)
      el.forEach(i => {
        i.disabled = flag

        if (flag) {
          i.classList.toggle('n-form--disable')
        }
      })
    },
    getLabelPosClass (labelPosition) {
      return 'n-form--lable-' + labelPosition
    },
    /** 
     * 收集所有prop属性的formitem,在提交的时候进行一次检查验证
     */
    validate (cb) {
      let flag = true
      this.$children.forEach(child => {
        if (child.prop) {
          let res = child.validate('', this.model[child.prop], true)
          if (!res) {
            flag = res
          }
        }
      })
      cb(flag)
    },
    resetForm () {
      this.$children.forEach(child => {
        if (child.prop) {
          this.model[child.prop] = this.initialValue[child.prop]
          if (child.validateFlag) {
            child.clearValidateClass()
          }
        }
      })
    }
  }
}
</script>