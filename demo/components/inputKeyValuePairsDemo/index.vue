<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Select / n-select
      </n-gradient-text>
    </div>
    <div
      class="n-doc-body"
    >
      <input-key-value-pairs />
      <custom-input-key-value-pairs />
    </div>
  </div>
</template>

<script>

import inputKeyValuePairs from './inputKeyValuePairs.demo.vue'
import customInputKeyValuePairs from './customInputKeyValuePairs.demo.vue'

export default {
  components: {
    inputKeyValuePairs,
    customInputKeyValuePairs
  },
  data () {
    return {
      selectedValue: null,
      selectedArray: [],
      items: [
        {
          label: 'ArtifactoryLabel',
          value: 'Artifactory'
        },
        {
          label: 'Registry',
          value: 'Registry'
        },
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Custom',
          value: 'Custom'
        }
      ],
      items2: [
        {
          label: 'Drive My Car',
          children: [
            {
              label: 'test1',
              value: 'test1'
            },
            {
              label: 'test2',
              value: 'test2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleChange (newValue) {
      alert(String(newValue))
    },
    handleChange2 (newValue) {
      alert(JSON.stringify(newValue))
    }
  }
}
</script>
