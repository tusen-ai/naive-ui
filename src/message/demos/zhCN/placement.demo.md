# 位置

```html
<n-message-provider>
  <Top />
</n-message-provider>
<n-message-provider placement="bottom">
  <Bottom />
</n-message-provider>
<n-message-provider placement="top-left">
  <TopLeft />
</n-message-provider>
<n-message-provider placement="top-right">
  <TopRight />
</n-message-provider>
<n-message-provider placement="bottom-left">
  <BottomLeft />
</n-message-provider>
<n-message-provider placement="bottom-right">
  <BottomRight />
</n-message-provider>
```

```js
import { useMessage, NButton } from 'naive-ui'
import { h } from 'vue'

const Top = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '顶部' }
    )
  }
}

const Bottom = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '底部' }
    )
  }
}

const TopLeft = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '左上' }
    )
  }
}

const TopRight = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '右上' }
    )
  }
}

const BottomLeft = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '左下' }
    )
  }
}

const BottomRight = {
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info('How many roads must a man walk down')
        },
        style: {
          marginRight: '10px'
        }
      },
      { default: () => '右下' }
    )
  }
}

export default {
  components: {
    Top,
    Bottom,
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
  }
}
```
