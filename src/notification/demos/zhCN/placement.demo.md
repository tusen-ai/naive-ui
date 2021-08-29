# 位置

```html
<n-notification-provider :placement="placement">
  <Buttons @changePlacement="changePlacement" />
</n-notification-provider>
```

```js
import { useNotification, NButton } from 'naive-ui'
import { h, ref, nextTick } from 'vue'

const Buttons = {
  emits: ['changePlacement'],
  setup () {
    const notification = useNotification()
    return {
      notification
    }
  },
  render () {
    return [
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong
You know its gonna make it that much better
When we can say goodnight and stay together
Wouldn't it be nice if we could wake up
In the morning when the day is new
And after having spent the day together
Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '顶部' }
      ),
      h(
        NButton,
        {
          onClick: async () => {
            this.$emit('changePlacement', 'bottom')
            await nextTick()
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
      Then we wouldn't have to wait so long
      And wouldn't it be nice to live together
      In the kind of world where we belong
      You know its gonna make it that much better
      When we can say goodnight and stay together
      Wouldn't it be nice if we could wake up
      In the morning when the day is new
      And after having spent the day together
      Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '底部' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-left')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
      Then we wouldn't have to wait so long
      And wouldn't it be nice to live together
      In the kind of world where we belong
      You know its gonna make it that much better
      When we can say goodnight and stay together
      Wouldn't it be nice if we could wake up
      In the morning when the day is new
      And after having spent the day together
      Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '左上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-right')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
      Then we wouldn't have to wait so long
      And wouldn't it be nice to live together
      In the kind of world where we belong
      You know its gonna make it that much better
      When we can say goodnight and stay together
      Wouldn't it be nice if we could wake up
      In the morning when the day is new
      And after having spent the day together
      Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '右上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-left')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
      Then we wouldn't have to wait so long
      And wouldn't it be nice to live together
      In the kind of world where we belong
      You know its gonna make it that much better
      When we can say goodnight and stay together
      Wouldn't it be nice if we could wake up
      In the morning when the day is new
      And after having spent the day together
      Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '左下' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-right')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
      Then we wouldn't have to wait so long
      And wouldn't it be nice to live together
      In the kind of world where we belong
      You know its gonna make it that much better
      When we can say goodnight and stay together
      Wouldn't it be nice if we could wake up
      In the morning when the day is new
      And after having spent the day together
      Hold each other close the whole night through`
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '右下' }
      )
    ]
  }
}

export default {
  components: {
    Buttons
  },
  setup () {
    const placement = ref('bottom-right')
    return {
      placement,
      changePlacement: (val) => {
        console.log('xxxx', val)
        placement.value = val
      }
    }
  }
}
```
