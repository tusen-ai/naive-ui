<template>
  <div
    ref="default"
    class="n-custom-add-pair"
  >
    <n-form-item v-if="NCustomAdd.NFormItem" :path="path + '.key'" :rule-path="parentPath + '.key'">
      <n-input
        v-model="item.key"
        class="n-custom-add-pair-input"
        :placeholder="NCustomAdd.placeholderKey"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item.key"
      class="n-custom-add-pair-input"
      :placeholder="NCustomAdd.placeholderKey"
    />
    <n-form-item v-if="NCustomAdd.NFormItem" :path="path +'.value'" :rule-path="parentPath + '.key'">
      <n-input
        v-model="item.value"
        class="n-custom-add-pair-input"
        :placeholder="NCustomAdd.placeholderValue"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item.value"
      class="n-custom-add-pair-input"
      :placeholder="NCustomAdd.placeholderValue"
    />
  </div>
</template>
<script>
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NCustomAddItem',
  inject: {
    NCustomAdd: {
      default: []
    }
  },
  mixins: [asformitem({
    change: 'change',
    blur: 'blur',
    focus: 'focus',
    input: 'input'
  }, 'medium', 'isGroup')],
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      required: true
    },
    parentPath: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      labels: [
        {
          key: 'key1',
          value: 'value1'
        },
        {
          key: 'key2',
          value: 'value2'
        }
      ]
    }
  },
  computed: {
    arrayValue: {
      get () {
        return this.NCustomAdd.value
      },
      set (value) {
        this.$emit('change-value', value)
      }
    }
  },
  methods: {
    add () {
      this.$emit('on-add')
      this.$set(this.arrayValue, this.arrayValue.length, {})
    },
    remove (index) {
      this.$emit('on-remove', index)
      if (index === 0 && this.arrayValue.length <= 1) {
        Object.keys(this.arrayValue[0]).forEach((key) => {
          let type = typeof (this.arrayValue[0][key])
          switch (type) {
            case 'boolean':
              this.$set(this.arrayValue[0], key, false)
              break
            default:
              this.$set(this.arrayValue[0], key, null)
              break
          }
        })
        return
      }
      this.arrayValue.splice(index, 1)
    }
  }
}
</script>
