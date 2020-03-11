<template>
  <div
    class="n-custom-add-pair"
  >
    <n-form-item v-if="NCustomAdd.NFormItem" :path="path" :rule-path="parentPath">
      <n-input
        v-model="item"
        class="n-custom-add-pair-input"
        :placeholder="NCustomAdd.placeholder"
      />
    </n-form-item>
    <n-input
      v-else
      v-model="item"
      class="n-custom-add-pair-input"
      :placeholder="NCustomAdd.placeholder"
    />
  </div>
</template>
<script>
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NCustomAddInput',
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
