# Disabled
```html
<div>
  Slot:
  <n-menu 
    v-model="selected" 
    :defaultOpenNames="initOpenKeys"
    @openNamesChange="changeOpen"
    @select="changeSelect"
  >
    <template v-slot:drawer-header-icon>
      <div style="overflow:hidden">1111</div>
    </template>
    <n-menu-item title="num1" name="num1"></n-menu-item>
    <n-menu-item title="num2" name="num2"></n-menu-item>
    <n-menu-item title="num3" name="num3"></n-menu-item>
    <n-sub-menu title="subMenu" name="subMenu" disabled>
      <n-menu-item title="sub1" name="sub1"></n-menu-item>
    </n-sub-menu>
    <n-sub-menu title="subMenu2" name="subMenu2">
      <n-sub-menu title="subMenu22" name="subMenu22">
        <n-menu-item title="sub222" name="sub222" disabled></n-menu-item>
      </n-sub-menu>
    </n-sub-menu>
    <n-sub-menu title="subMenu3" name="subMenu3">
      <n-menu-item-group title="group">
        <n-menu-item title="sub1" name="sub6"></n-menu-item>
        <n-menu-item title="sub1" name="sub7"></n-menu-item>
      </n-menu-item-group>
    </n-sub-menu>
  </n-menu>
  Items:
  <n-menu
    v-model="selected" 
    :openNames="opens"
    :items="items"
    @select="changeSelect"
    @openNamesChange="changeOpen"
  />
</div>

```
```js
export default {
  data () {
    return {
      selected: 'sub1',
      initOpenKeys: [],
      opens: [],
      items: [
        {
          title: 'menu1',
          name: 'menu1',
          disabled: true,
        },
        {
          title: 'subMenu',
          name: 'subMenu',
          children: [
            {
              title:'sub1',
              group: true,
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
    changeOpen (names) {
      this.opens = names
      console.log('names', names)
    },
    changeSelect (name) {
      this.selected = name
      console.log('changeSelect', val)
    }
  }
};
```
```css

```