<template>
  <div
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
  name: 'NCustomAddPair',
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
  }, 'medium')],
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
  }
}
</script>
