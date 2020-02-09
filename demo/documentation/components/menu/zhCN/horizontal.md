# 水平菜单
一个水平菜单
```html
<n-menu
  v-model="activeName"
  mode="horizontal"
>
  <n-menu-item title="且听风吟" name="hear-the-wind-sing">
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
  </n-menu-item>
  <n-submenu title="1973年的弹珠玩具" name="pinball-1973" disabled>
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
    <n-menu-item title="鼠" name="rat" />
  </n-submenu>
  <n-menu-item title="寻羊冒险记" name="a-wild-sheep-chase" disabled>
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
  </n-menu-item>
  <n-submenu title="舞，舞，舞" name="dance-dance-dance">
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
    <n-menu-item-group title="人物">
      <n-menu-item title="叙事者" name="narrator">
        <template v-slot:icon>
          <n-icon>
            <person-icon />
          </n-icon>
        </template>
      </n-menu-item>
      <n-menu-item title="羊男" name="sheep-man">
        <template v-slot:icon>
          <n-icon>
            <person-icon />
          </n-icon>
        </template>
      </n-menu-item>
    </n-menu-item-group>
    <n-submenu title="饮品" name="beverage">
      <template v-slot:icon>
        <n-icon>
          <wine-icon />
        </n-icon>
      </template>
      <n-menu-item title="威士忌" name="whisky" />
    </n-submenu>
    <n-submenu title="食物" name="food">
      <n-menu-item title="三明治" name="sandwich" />
    </n-submenu>
    <n-menu-item title="过去增多，未来减少" name="the-past-increases-the-future-recedes" />
  </n-submenu>
</n-menu>
```
```js
import bookIcon from 'naive-ui/lib/icons/book-outline'
import personIcon from 'naive-ui/lib/icons/person-outline'
import wineIcon from 'naive-ui/lib/icons/wine-outline'

export default {
  components: {
    bookIcon,
    personIcon,
    wineIcon
  },
  data () {
    return {
      activeName: null,
      collapsed: true
    }
  }
}
```
