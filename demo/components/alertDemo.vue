<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Alert
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Custom Icon
        </div>
        <div class="n-doc-section__view">
          <n-alert>
            <template v-slot:icon>
              <img
                src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOS44IDE4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmOTJhNDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFsZXJ0IC0gSWNvbiAyPC90aXRsZT48ZyBpZD0iUGFnZS0xIj48ZyBpZD0iR3JvdXAtNC1Db3B5LTQiPjxnIGlkPSJHcm91cC01Ij48ZyBpZD0iTm90aWZpY2F0aW9uIj48cGF0aCBpZD0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTS43NSw1LjE5QTEuMzQsMS4zNCwwLDAsMCwwLDYuMzF2NS42MUExLjMsMS4zLDAsMCwwLC43NiwxM2wxMiw0LjkxYS41MS41MSwwLDAsMCwuNzYtLjQ5Vi41NGEuNDkuNDksMCwwLDAtLjc1LS40OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNS4zLDQuNWE0LjUsNC41LDAsMCwxLDAsOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
                style="height: 20px; width: 22px;"
              >
            </template>
            Will you still need me, will you still feed me When I'm sixty four?
          </n-alert>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-alert>
  <template v-slot:icon>
    <img
      src="data:image/svg+xml;base64,PHN2Zy...nPjwvZz48L3N2Zz4="
      style="height: 20px; width: 22px;"
    >
  </template>
  Will you still need me, will you still feed me When I'm sixty four?
</n-alert></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Buildin Icon
        </div>
        <div class="n-doc-section__view">
          <n-alert icon="md-alert">
            Well the Ukraine girls really knock me out. They leave the West behind
          </n-alert>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-alert icon="md-alert">
  Well the Ukraine girls really knock me out They leave the West behind
</n-alert></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          No Icon
        </div>
        <div class="n-doc-section__view">
          <n-alert>
            Lucy in the sky with diamonds
          </n-alert>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-alert>
  Lucy in the sky with diamonds
</n-alert></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
