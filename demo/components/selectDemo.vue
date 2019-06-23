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
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <div style="width: 30%; margin-right: 14px;">
            <n-select
              v-model="selectedValue"
              placeholder="Please Select Type"
              :items="items"
            />
          </div>
          <div style="width: 30%; margin-right: 14px;">
            <n-select
              v-model="selectedValue"
              size="small"
              placeholder="Please Select Type"
              :items="items"
            />
          </div>
          <div>selectedValue: {{ selectedValue }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<div style="width: 40%; margin-right: 14px;">
  <n-select
    v-model="selectedValue"
    placeholder="Please Select Type"
    :items="items"
  />
</div>
<div style="width: 40%; margin-right: 14px;">
  <n-select
    v-model="selectedValue"
    size="small"
    placeholder="Please Select Type"
    :items="items"
  />
</div>
<script>
export default {
  data () {
    return {
      selectedValue: null,
      items: [
        {
          label: 'Artifactory',
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
      ]
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Multiple Select
        </div>
        <div class="n-doc-section__view">
          <n-select
            v-model="selectedArray"
            multiple
            placeholder="Please Select Type"
            :items="items"
          />
          <br><br>
          <n-select
            v-model="selectedArray"
            multiple
            size="small"
            placeholder="Please Select Type"
            :items="items"
          />
          <br><br>
          <div>selectedArray: {{ selectedArray }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-select
  v-model="selectedArray"
  multiple
  placeholder="Please Select Type"
  :items="items"
/>
<n-select
  v-model="selectedArray"
  multiple
  size="small"
  placeholder="Please Select Type"
  :items="items"
/>
<div>selectedArray: {{ selectedArray }}</div>
<script>
export default {
  data () {
    return {
      selectedArray: [],
      items: [
        {
          label: 'Artifactory',
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
      ]
    }
  }
}
</script></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      selectedValue: null,
      selectedArray: [],
      items: [
        {
          label: 'Artifactory',
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
      ]
    }
  },
  methods: {
  }
}
</script>
