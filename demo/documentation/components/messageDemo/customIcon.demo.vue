<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="emitMessage">
        Custom Icon
      </n-button>
      <!-- <n-button @click="emitMessageByRenderFunction">
        Custom Icon(by render function)
      </n-button> -->
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
    emitMessage () {
      this.$NMessage.warning('I never needed anybody\'s help in any way', { icon: 'ios-hourglass' })
    }
    // emitMessageByRenderFunction () {
    //   this.$NMessage.warning('I never needed anybody\'s help in any way', { icon: 'ios-hourglass' })
    // }
  }
}
</script>
