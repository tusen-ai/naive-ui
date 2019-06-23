<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Message / $NMessage
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-button @click="emitMessage1">
            Like a Rolling Stone
          </n-button>
          <n-button @click="emitMessage2">
            Blowing in the Wind
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-button @click="emitMessage1">
  Like a Rolling Stone
</n-button>
<n-button @click="emitMessage2">
  Blowing in the Wind
</n-button>
<script>
export default {
  methods: {
    emitMessage1 () {
      this.$NMessage.error('Once upon a time you dressed so fine')
    },
    emitMessage2 () {
      this.$NMessage.success('How many roads must a man walk down')
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

    }
  },
  methods: {
    emitMessage1 () {
      this.$NMessage.error('Once upon a time you dressed so fine')
    },
    emitMessage2 () {
      this.$NMessage.success('How many roads must a man walk down')
    }
  }
}
</script>
