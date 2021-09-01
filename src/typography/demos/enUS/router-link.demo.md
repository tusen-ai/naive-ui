# Use NA with Router Link

You can also use `<n-a />` within a router-link.

If you think the following method is verbose, you can just make it a new component.

```html
<router-link to="/" #="{ navigate, href }" custom>
  <n-a :href="href" @click="navigate">Back Home</n-a>
</router-link>
```
