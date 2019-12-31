# DefaultOpenNames
```html
<n-menu
  v-model="selected" 
  :defaultOpenNames="opens"
  :items="items"
  @select="changeSelect"
  @openNamesChange="changeOpen"
  >
</n-menu>
```
```js
export default {
  data () {
    return {
      selected: 'sub1',
      initOpenKeys: ['subMenu', "subMenu2","subMenu22"],
      opens: ['subMenu'],
      items: [
        {
          title: 'menu1',
          name: 'menu1',
        },
        {
          title: 'subMenu',
          name: 'subMenu',
          groupTitle: 'group1',
          children: [
            {
              title:'sub1',
              name: 'sub1',
              children: [
                {
                  title: 'subsub001',
                  name: 'subsub001'
                },
                {
                  title: 'subsub002',
                  name: 'subsub002'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeSelect (val) {
      console.log('changeSelect', val)
    },
    changeOpen (val) {
      console.log('changeOpen', val)
      this.opens = val
    }
  }
};
```
```css

```