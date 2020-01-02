# items
```html
<n-menu
  v-model="selected" 
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
      items: [
        {
          title: 'num1',
          name: 'num1',
        },
        {
          title: 'num2',
          name: 'num2',
        },
        {
          title: 'num3',
          name: 'num3',
        },
        {
          title: 'subMenu',
          name: 'subMenu',
          children: [
            {
              title:'sub1',
              name: 'sub1',
              group: true,
              children: [
                {
                  title: 'subsub001',
                  name: 'subsub001'
                },
              ]
            }
          ]
        },
        {
          title: 'subMenu2',
          name: 'subMenu2',
          children: [
            {
              group: true,
              title:'sub2',
              name: 'sub2',
              children: [
                {
                  title: 'subsub002',
                  name: 'subsub002'
                },
              ]
            }
          ]
        },
        {
          title: 'subMenu3',
          name: 'subMenu3',
          children: [
            {
              group: true,
              title:'sub3',
              name: 'sub3',
              children: [
                {
                  title: 'subsub003',
                  name: 'subsub003'
                },
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