<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tooltip
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-tooltip>
            <template v-slot:activator>
              <n-button style="margin: 0;">
                hello tooltip
              </n-button>
            </template>
          </n-tooltip>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-tooltip>
  <template v-slot:activator>
    <n-button style="margin: 0;">
      hello tooltip
    </n-button>
  </template>
  This is the contextual help
</n-tooltip></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Arrow
        </div>
        <div class="n-doc-section__view">
          <n-tooltip arrow>
            <template v-slot:activator>
              <n-button style="margin: 0;">
                hello tooltip
              </n-button>
            </template>
            This is the contextual help
          </n-tooltip>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-tooltip arrow>
  <template v-slot:activator>
    <n-button style="margin: 0;">
      hello tooltip
    </n-button>
  </template>
  This is the contextual help
</n-tooltip></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Placement
        </div>
        <div class="n-doc-section__view">
          <n-tooltip placement="top-start">
            <template v-slot:activator>
              <n-button style="margin: 0;">
                hello tooltip
              </n-button>
            </template>
            This is the contextual help
          </n-tooltip>
        </div>
        <div class="n-doc-section__source">
          <textarea>/**
  * If you want to see more placement options, see Popover
  */
<n-tooltip placement="top-start">
  <template v-slot:activator>
    <n-button style="margin: 0;">
      hello tooltip
    </n-button>
  </template>
  This is the contextual help
</n-tooltip></textarea>
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
