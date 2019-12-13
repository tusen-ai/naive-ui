# Basic
```html
<n-code :code="`
function sleep (ms = 1000) {
  return new Promise(res => setTimeout(res, ms))
}
`" language="javascript" />

<n-code :code="`
def say_hello():
    print('Hello Naive UI')
`" language="python" />

<n-code :code="cppCode" language="cpp" />
```
```js
import NCode from 'naive-ui/lib/common/Code'

export default {
  components: {
    NCode
  },
  data () {
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