<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="emitInfo">
        Info
      </n-button>
      <n-button @click="emitError">
        Error
      </n-button>
      <n-button @click="emitWarning">
        Warning
      </n-button>
      <n-button @click="emitSuccess">
        Success
      </n-button>
      <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    emitInfo () {
      this.$NMessage.info('I don\'t know why nobody told you how to unfold your love')
    },
    emitError () {
      this.$NMessage.error('Once upon a time you dressed so fine')
    },
    emitWarning () {
      this.$NMessage.warning('How many roads must a man walk down')
    },
    emitSuccess () {
      this.$NMessage.success('\'Cause you walked hand in hand With another man in my place')
    }
  }
}
</script>
