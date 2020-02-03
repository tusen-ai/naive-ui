# 基础用法
```html
<n-layout>
  <n-layout-header>
    酷的页头
  </n-layout-header>
  <n-layout-content>
    酷的内容
  </n-layout-content>
  <n-layout-footer>
    酷的页脚
  </n-layout-footer>
</n-layout>
<br>
<n-layout>
  <n-layout-header>
    酷的页头
  </n-layout-header>
  <n-layout>
    <n-layout-sider>
      酷的边栏
    </n-layout-sider>
    <n-layout-content>
      酷的内容
    </n-layout-content>
  </n-layout>
  <n-layout-footer>
    酷的页脚
  </n-layout-footer>
</n-layout>
<br>
<n-layout>
  <n-layout-sider>
    酷的边栏
  </n-layout-sider>
  <n-layout>
    <n-layout-header>
      酷的页头
    </n-layout-header>
    <n-layout-content>
      酷的内容
    </n-layout-content>
    <n-layout-footer>
      酷的页脚
    </n-layout-footer>
  </n-layout>
</n-layout>
```
```js
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
```
