# Basic

```html
<div style="position: relative; height: 600px">
  <n-nimbus-service-layout
    name="Oasis"
    :items="items"
    v-model:value="selected"
    @expandedNamesChange="changeOpen"
    @select="changeSelect"
  >
    <template #drawer-header-icon>
      <md-musical-notes />
    </template>
    Take me to the place where you go<br />
    Where nobody knows if it's night or day<br />
    But please don't put your life in the hands<br />
    Of a Rock n Roll band<br />
    Who'll throw it all away
  </n-nimbus-service-layout>
</div>
```

```js
import { MdMusicalNotes } from '@vicons/ionicons4'

export default {
  components: {
    MdMusicalNotes
  },
  data () {
    return {
      disableMenu: false,
      selected: null,
      items: [
        {
          name: 'n-config-provider',
          path: '/en-US/dark/config-provider'
        },
        {
          name: 'Morning Glory',
          children: [
            {
              name: 'Hello',
              path: '/en-US/dark/nimbus-service-layout?param=777'
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeOpen (names) {
      console.log('names', names)
    },
    changeSelect (val) {
      console.log('changeSelect', val)
    }
  }
}
```
