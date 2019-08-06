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
      <basic-usage />
      <multiple-select />
      <disabled />
      <change-event />
      <change-event-emit-item />
      <search />
    </div>
  </div>
</template>

<script>
import disabled from './disabled.demo.vue'
import basicUsage from './basigUsage.demo.vue'
import multipleSelect from './multipleSelect.demo.vue'
import changeEvent from './changeEvent.demo'
import changeEventEmitItem from './changeEventEmitItem.demo'
import search from './search.demo.vue'

export default {
  components: {
    basicUsage,
    multipleSelect,
    changeEvent,
    changeEventEmitItem,
    search,
    disabled
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
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: 'I\'m looking through you',
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
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
