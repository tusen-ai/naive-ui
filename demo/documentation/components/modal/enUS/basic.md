# Basic
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive" preset="confirm" title="lalala" :closable="false" cancel-text="test">
  <template v-slot:footer>
    <div slot="header">111</div>
  </template>
  <div style="background: rgb(46, 52, 68); padding: 24px; border-radius: 8px; color: white;">
    <div>If1 you start me up, If you start me up, I'll never stop.</div>
    <n-input v-model="inputValue" />
    inputValue: {{ inputValue }}<br>
    <n-tooltip>
      <template v-slot:activator>
        <n-button
          size="small"
          @click="isActive = false"
        >
          Close it
        </n-button>
      </template>
      Why do you want to close it?
    </n-tooltip>
    <section class="markdown footer-part"><h2 id="api">API</h2><table><thead><tr><th>Property</th><th>Description</th><th>Type</th><th>Default</th><th>Version</th></tr></thead><tbody><tr><td>type</td><td>Type of button.</td><td>string</td><td><code>'default'</code></td><td></td></tr></tbody></table></section>
  </div>
</n-modal>
```
```js
export default {
  data () {
    return {
      isActive: false,
      inputValue: ''
    }
  }
}
```