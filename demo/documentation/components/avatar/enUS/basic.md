# Basic
```html
<n-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg"/>
<n-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg" circle/>
<n-avatar>{{ value }}</n-avatar>
<n-avatar>Liu<br>Dehua</n-avatar>
<n-input v-model="value"/>
```
```js
export default {
  data () {
    return {
      value: '牛'
    }
  }
}
```