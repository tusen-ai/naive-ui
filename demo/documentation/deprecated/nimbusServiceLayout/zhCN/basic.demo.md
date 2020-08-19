# Basic
```html
<div style="position: relative; height: 600px">
 <n-nimbus-service-layout
    name="Oasis"
    :items="items"
    :disable-menu="disableMenu"
    v-model="selected"
    @expandedNamesChange="changeOpen"
    @select="changeSelect"
  >
    <template v-slot:drawer-header-icon>
      <md-musical-notes />
    </template>
    Take me to the place where you go<br>
    Where nobody knows if it's night or day<br>
    But please don't put your life in the hands<br>
    Of a Rock n Roll band<br>
    Who'll throw it all away
    <n-button @click="disableMenu = !disableMenu">
      toggleDisableMenu
    </n-button>
  </n-nimbus-service-layout>
</div>

```
```js
import mdMusicalNotes from 'naive-ui/lib/icons/md-musical-notes'

export default {
  components: {
    mdMusicalNotes
  },
  data () {
    return {
       disableMenu: false,
       selected: null,
      items: [
        {
          name: 'n-config-provider',
          path: '/en-US/dark/n-config-provider'
        },
        {
          name: `Morning Glory`,
          childItems: [
            {
              name: 'Hello',
              path: '/en-US/dark/n-nimbus-service-layout?param=777'
            },
          ]
        },
      ]
    }
  },
  methods: {
    changeOpen (names) {
      // console.log('names', names)
    },
    changeSelect (val) {
      // console.log('changeSelect', val)
    }
  }
};
```
```css

```