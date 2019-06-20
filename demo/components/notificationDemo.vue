<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>Notification</h1>
    <hr>
    <h2>基本用法</h2>
    <p>如果消息主体的高度不超过400px，动画不会有问题，如果超过了，会有小问题</p>
    <button @click="emitMessage">
      这绚烂新世纪，深情已不受欢迎
    </button>
    <br><br>
    <textarea rows="5"><button @click="emitMessage">
  这绚烂新世纪，深情已不受欢迎
</button>

<script>
  this.$NNotification.notify({
    title: 'Notification',
    titleMeta: 'From Xingyue Feng',
    content: 'VTS has been edited by admin',
    meta: '2019-5-27 15:11',
    action: 'Mark as read',
    avator: null,
    actionCallback: (notification) => {
      console.log('mark read!')
      notification.close()
    }
  })
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
      this.$notify({
        title: 'Notification',
        titleMeta: 'From Xingyue Feng',
        content: 'VTS has been edited by admin',
        meta: '2019-5-27 15:11',
        action: 'Mark as read',
        avator: null,
        actionCallback: (notification) => {
          console.log('mark read!')
          notification.close()
        }
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
