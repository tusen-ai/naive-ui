# Controller
Sometimes in a uncontrolled manner, you may want to control the display status of the popover.

You can pass a `controller` prop to obtain an object that controls the display status of the popover. `show` and `hide` methods will be added to the object.(The way probably looks wired but its related to its implementation)
```html
<n-button
  @click="controller.show()"
  style="margin-right: 8px;"
>
  Show
</n-button>
<n-popover
  placement="bottom"
  trigger="click"
  :controller="controller"
>
  <template v-slot:activator>
    <n-button>
      Click
    </n-button>
  </template>
  <span>
    <n-button
      @click="controller.hide()"
    >
      Hide
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