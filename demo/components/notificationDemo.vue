<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>Message</h1>
    <hr>
    <h2>基本用法</h2>
    <button @click="emitMessage">
      爱你那么用力，却好像一场闹剧
    </button>
    <br><br>
    <textarea rows="5"><button @click="emitMessage">
  爱你那么用力，却好像一场闹剧
</button>

<script>
emitMessage () {
  this.$NMessage.error('Oops, here is a error')
  this.$NMessage.success('Cloned Successfully')
}
</script>

</textarea>
    <hr>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  methods: {
    emitMessage () {
      this.$NNotification.notify({
        title: 'Notification',
        titleMeta: 'From Xingyue Feng',
        content: 'VTS has been edited by admin',
        meta: '2019-5-27 15:11',
        action: 'Mark as read',
        actionCallback: () => {}
      })
    }
  }
}
</script>

<style scoped lang="scss">
.doc {
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
