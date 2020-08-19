# 控制器
有时在非受控状态下，你可能也想控制弹出信息的显示状态。

可以通过传入 `controller` 属性来获取一个能控制弹出信息的对象，这个对象上会被添加 `show` 和 `hide` 方法来允许你控制它的显示。（这种方式可能看起来很奇怪，但是这和实现方式有一些联系）
```html
<n-button
  @click="controller.show()"
  style="margin-right: 8px;"
>
  打开
</n-button>
<n-popover
  placement="bottom"
  trigger="click"
  :controller="controller"
>
  <template v-slot:activator>
    <n-button>
      点击
    </n-button>
  </template>
  <span>
    <n-button
      @click="controller.hide()"
    >
      关闭
    </n-button>
  </span>
</n-popover>
```
```js
export default {
  data () {
    return {
      controller: {}
    }
  }
}
```