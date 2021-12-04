# 加载失败时显示的图像

通过设置 `fallback-src` 来指定头像加载失败时显示的图像的地址。

下面的头像加载失败时会展示 07akioni。

```html
<n-avatar
  round
  size="small"
  src="empty.png"
  fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
/>
```
