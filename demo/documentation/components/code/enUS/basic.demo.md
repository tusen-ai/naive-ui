# Basic

For example, javascript, python and cpp.

```html
<div style="overflow: auto;">
  <n-code
    :code="`
function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
`"
    language="javascript"
  />

  <n-code
    :code="`
def say_hello():
    print('Hello Naive UI')
`"
    language="python"
  />

  <n-code :code="cppCode" language="cpp" />
</div>
```

```js
export default {
  data() {
    return {
      cppCode: `int main () {
  std::cout << "Hello Naive UI";
  return 0;
}`
    }
  }
}
```

```css
.n-code {
  margin-bottom: 16px;
}
```
