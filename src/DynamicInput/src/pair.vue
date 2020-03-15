<template>
  <div
    class="n-dynamic-input-pair"
  >
    <n-form-item v-if="NDynamicInput.NFormItem" :path="path + '.key'" :rule-path="parentPath + '.key'">
      <n-input
        v-model="item.key"
        class="n-dynamic-input-pair-input"
        :placeholder="NDynamicInput.placeholderKey"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item.key"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.placeholderKey"
    />
    <n-form-item v-if="NDynamicInput.NFormItem" :path="path +'.value'" :rule-path="parentPath + '.key'">
      <n-input
        v-model="item.value"
        class="n-dynamic-input-pair-input"
        :placeholder="NDynamicInput.placeholderValue"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item.value"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.placeholderValue"
    />
  </div>
</template>
<script>
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NDynamicInputPair',
  inject: {
    NDynamicInput: {
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
