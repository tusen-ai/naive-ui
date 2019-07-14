<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        InputNumber
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          {{ value1 }}
          <n-input-number
            v-model="value1"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-input-number
  v-model="value1"
/>
<script>
export default {
  data () {
    return {
      value1: null
    }
  }
}
</script>
</textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Disabled
        </div>
        <div class="n-doc-section__view">
          <n-input-number
            v-model="value2"
            disabled
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-input-number
  v-model="value2"
  disabled
/>
<script>
export default {
  data () {
    return {
      value2: 1
    }
  }
}
</script>
</textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Step
        </div>
        <div class="n-doc-section__view">
          {{ value3 }}
          <n-input-number
            v-model="value3"
            :step="2"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-input-number
  v-model="value3"
  :step="2"
/>
<script>
export default {
  data () {
    return {
      value3: 2
    }
  }
}
</script>
</textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Event
        </div>
        <div class="n-doc-section__view">
          {{ value4 }}
          <n-input-number
            v-model="value4"
            @change="handleChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-input-number
  v-model="value4"
  @change="handleChange"
/>
<script>
handleChange (newValue, oldValue) {
  alert(`newValue: ${newValue}; oldValue: ${oldValue}`)
}
</script>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Size
        </div>
        <div class="n-doc-section__view">
          {{ value5 }}
          <n-input-number
            v-model="value5"
            size="small"
          />
          <n-input-number
            v-model="value5"
            size="medium"
          />
          <n-input-number
            v-model="value5"
            size="large"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-input-number
  v-model="value5"
  size="small"
/>
<n-input-number
  v-model="value5"
  size="medium"
/>
<n-input-number
  v-model="value5"
  size="large"
/></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Min and Max
        </div>
        <div class="n-doc-section__view">
          {{ value6 }}
          <n-input-number
            v-model="value6"
            :min="-2"
            :max="5"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-input-number
  v-model="value6"
  :min="-2"
  :max="5"
/></textarea>
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
      value1: null,
      value2: 1,
      value3: 2,
      value4: 3,
      value5: 4,
      value6: 5
    }
  },
  methods: {
    handleChange (newValue, oldValue) {
      alert(`newValue: ${newValue}; oldValue: ${oldValue}`)
    }
  }
}
</script>
