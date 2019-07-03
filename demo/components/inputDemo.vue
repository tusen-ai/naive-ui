<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Input / n-input
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="value"
            type="input"
            size="small"
          />
          <br>
          <n-input
            v-model="value"
            type="input"
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  type="input"
  size="small"
/>
<n-input
  v-model="value"
  type="input"
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Icon
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="value"
            type="input"
            size="large"
            icon="ios-search"
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  type="input"
  size="small"
  icon="ios-search"
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Round
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="value"
            type="input"
            size="small"
            round
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  type="input"
  size="small"
  round
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          placeholder
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="value"
            type="input"
            size="small"
            placeholder="Stairway to Heaven"
            round
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  type="input"
  size="small"
  placeholder="Stairway to Heaven"
  round
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          disabled
        </div>
        <div class="n-doc-section__view">
          <n-input
            v-model="value"
            type="input"
            size="small"
            placeholder="Stairway to Heaven"
            disabled
            round
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  type="input"
  size="small"
  placeholder="Stairway to Heaven"
  round
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Textarea
        </div>
        <div class="n-doc-section__view not-code">
          <n-input
            v-model="value"
            placeholder="Nowhere Man"
            type="textarea"
            size="small"
            :rows="5"
          />
          <br>
          <n-input
            v-model="value"
            type="textarea"
            :rows="3"
          />
          <br>
          value: {{ value }}
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-input
  v-model="value"
  placeholder="Nowhere Man"
  type="textarea"
  size="small"
  :rows="5"
/>
<n-input
  v-model="value"
  type="textarea"
  :rows="3"
/>
value: {{ value }}

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
          </textarea>
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
      value: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.n-doc-section__view {
  display: block!important;
}
</style>
