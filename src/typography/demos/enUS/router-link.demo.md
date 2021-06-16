# Use NA with Router Link

Sometimes you need `<n-a />` works like router-link.

If you find the following method is complex, you can create a new component.

```html
<router-link to="/" #="{ navigate, href }" custom>
  <n-a :href="href" @click="navigate">Back Home</n-a>
</router-link>
```
