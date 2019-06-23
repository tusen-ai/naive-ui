<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Notification / $nNotify
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-button @click="notify1">
            Wouldn't it be Nice
          </n-button>
          <n-button @click="notify2">
            Satisfaction
          </n-button>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<n-button @click="notify1">
  Wouldn't it be Nice
</n-button>
<n-button @click="notify2">
  Satisfaction
</n-button>
<script>
export default {
  methods: {
    notify1 () {
      this.$nNotify({
        title: `Wouldn't it be Nice`,
        titleMeta: 'From the Beach Boys',
        content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong`,
        meta: '2019-5-27 15:11',
        action: 'Mark as read',
        avator: null,
        actionCallback: (notification) => {
          console.log('mark read!')
          notification.close()
        }
      })
    },
    notify2 () {
      this.$nNotify({
        title: 'Satisfaction',
        content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
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
  methods: {
    notify1 () {
      this.$nNotify({
        title: `Wouldn't it be Nice`,
        titleMeta: 'From the Beach Boys',
        content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong`,
        meta: '2019-5-27 15:11',
        action: 'Mark as read',
        avator: null,
        actionCallback: (notification) => {
          console.log('mark read!')
          notification.close()
        }
      })
    },
    notify2 () {
      this.$nNotify({
        title: 'Satisfaction',
        content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
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
