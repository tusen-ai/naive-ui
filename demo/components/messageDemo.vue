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
          <n-button @click="emitMessage3">
            No Reply
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-button @click="emitMessage1">
  Like a Rolling Stone
</n-button>
<n-button @click="emitMessage2">
  Blowing in the Wind
</n-button>
<n-button @click="emitMessage3">
  No Reply
</n-button>
<script>
export default {
  methods: {
    emitMessage1 () {
      this.$NMessage.error('Once upon a time you dressed so fine', { duration: 1000 })
    },
    emitMessage2 () {
      this.$NMessage.warning('How many roads must a man walk down')
    },
    emitMessage3 () {
      this.$NMessage.success('\'Cause you walked hand in hand With another man in my place')
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Custom Icon
        </div>
        <div class="n-doc-section__view">
          <n-button @click="emitMessage4">
            Help!
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<n-button @click="emitMessage4">
  Help!
</n-button>
<script>
export default {
  methods: {
    emitMessage4 () {
      this.$NMessage.warning('I never needed anybody\'s help in any way', { icon: 'ios-alert' })
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
      this.$NMessage.error('Once upon a time you dressed so fine', { duration: 1000 })
    },
    emitMessage2 () {
      this.$NMessage.warning('How many roads must a man walk down')
    },
    emitMessage3 () {
      this.$NMessage.success('\'Cause you walked hand in hand With another man in my place')
    },
    emitMessage4 () {
      this.$NMessage.warning('I never needed anybody\'s help in any way', { icon: 'ios-hourglass' })
    }
  }
}
</script>
