# Target
```html
<n-button-group>
  <n-button @click="activate('top')">Top</n-button>
  <n-button @click="activate('right')">Right</n-button>
  <n-button @click="activate('bottom')">Bottom</n-button>
  <n-button @click="activate('left')">Left</n-button>
</n-button-group>
<div 
  ref="target" 
  style="
    position:relative;
    width: 100%;
    height: 300px;
    border: 1px solid rgba(128, 128, 128, .2);
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  "
>
  Target Area
</div>
<n-drawer
  v-model="active"
  :width="200"
  :height="200"
  :placement="placement" 
  :target="target"
>
  <n-h1>Stoner</n-h1>
  <n-p>Stoner is a 1965 novel by the American writer John Williams.</n-p>
</n-drawer>
```
```js
export default {
  data () {
    return {
      active: false,
      placement: 'right'
    }
  },
  methods: {
    activate (placement) {
      this.active = true
      this.placement = placement
    },
    target () {
      return this.$refs.target
    }
  }
}
```