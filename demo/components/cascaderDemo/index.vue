<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Cascader / n-cascader
      </n-gradient-text>
    </div>
    <div
      class="n-doc-body"
    >
      <multiple />
      <multiple-all />
      <single />
      <single-all />
      <single-search />
      <single-all-search />
      <multiple-search />
      <multiple-all-search />
    </div>
  </div>
</template>

<script>

import multiple from './multipleCascader.demo.vue'
import multipleAll from './multipleAll.demo.vue'
import single from './single.demo.vue'
import singleAll from './singleAll.demo.vue'
import singleSearch from './singleSearch.demo'
import singleAllSearch from './singleAllSearch.demo'
import multipleSearch from './multipleSearch.demo'
import multipleAllSearch from './multipleAllSearch.demo'

export default {
  components: {
    multiple,
    multipleAll,
    single,
    singleAll,
    singleSearch,
    singleAllSearch,
    multipleSearch,
    multipleAllSearch
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
