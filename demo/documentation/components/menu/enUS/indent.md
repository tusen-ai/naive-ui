# Indent
You can specify `indent` & `root-indent` of the menu. `root-indent` only determines the first-leveled children.
```html
<n-menu
  v-model="activeName"
  :root-indent="36"
  :indent="12"
>
  <n-menu-item title="Hear the Wind Sing" name="hear-the-wind-sing">
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
  </n-menu-item>
  <n-submenu title="Pinball, 1973" name="pinball-1973" disabled>
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
    <n-menu-item title="Rat" name="rat" />
  </n-submenu>
  <n-menu-item title="A Wild Sheep Chase" name="a-wild-sheep-chase" disabled>
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
  </n-menu-item>
  <n-submenu title="Dance Dance Dance" name="dance-dance-dance">
    <template v-slot:icon>
      <n-icon>
        <book-icon />
      </n-icon>
    </template>
    <n-menu-item-group title="Characters">
      <n-menu-item title="Narrator" name="narrator">
        <template v-slot:icon>
          <n-icon>
            <person-icon />
          </n-icon>
        </template>
      </n-menu-item>
      <n-menu-item title="Sheep Man" name="sheep-man">
        <template v-slot:icon>
          <n-icon>
            <person-icon />
          </n-icon>
        </template>
      </n-menu-item>
    </n-menu-item-group>
    <n-submenu title="Beverage" name="beverage">
      <template v-slot:icon>
        <n-icon>
          <wine-icon />
        </n-icon>
      </template>
      <n-menu-item title="Whisky" name="whisky" />
    </n-submenu>
    <n-submenu title="Food" name="food">
      <n-menu-item title="Sandwich" name="sandwich" />
    </n-submenu>
    <n-menu-item title="The past increases. The future recedes." name="the-past-increases-the-future-recedes" />
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
      activeName: null
    }
  }
}
```