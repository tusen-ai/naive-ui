# Namespace
Some parts of component are detached to `document.body`. If you want to add a class to those detached elements, use `namespace` prop of app. Open devtools to see detached content.
```html
<n-config-provider :namespace="ns">
  <n-button
    @click="isActive = true"
  >
    Activate Component with Detached Content
  </n-button>
  <n-modal v-model="isActive">
    <n-nimbus-form-card
      width="1032"
      title="Parklife"
      :deactivate="() => isActive = false"
    >
      <template v-slot:header>
        v-slot:header
      </template>
      <template v-slot:footer>
        v-slot:footer
      </template>
      <template v-slot:content>
        <n-date-picker
          v-model="time"
          type="datetime"
        />
        <n-select
          v-model="selectedValue"
          size="small"
          placeholder="Please Select Type"
          :items="items"
          style="flex-grow: 1;"
        />
        <n-tooltip
          placement="bottom"
          trigger="click"
          style="margin-right: 12px;"
        >
          <template v-slot:activator>
            <n-button style="margin: 0;">
              California Girls(Click)
            </n-button>
          </template>
          <span>
            I wish they all could be California girls
          </span>
        </n-tooltip>
      </template>
    </n-nimbus-form-card>
  </n-modal>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      ns: 'custom-app-namespace1',
      isActive: false,
      time: null,
      selectedValue: null,
      items: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0'
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  }
}
```