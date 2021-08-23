# Use NA with Router Link

You can also use `<n-a />` with a router-link.

If you find the following method is verbose, you can just put make it a new component.

```html
<router-link to="/" #="{ navigate, href }" custom>
  <n-a :href="href" @click="navigate">Back Home</n-a>
</router-link>
```
