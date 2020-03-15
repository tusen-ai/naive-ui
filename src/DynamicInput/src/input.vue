<template>
  <div
    class="n-dynamic-input-pair"
  >
    <n-form-item v-if="NDynamicInput.NFormItem" :path="path" :rule-path="parentPath">
      <n-input
        v-model="item"
        class="n-dynamic-input-pair-input"
        :placeholder="NDynamicInput.placeholder"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item"
      class="n-dynamic-input-pair-input"
      :placeholder="NDynamicInput.placeholder"
    />
  </div>
</template>
<script>
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NDynamicInputInput',
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
      type: String,
      default: ''
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
