<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Nimbus Confirm Card / n-nimbus-confirm-card
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-modal v-model="isActive">
            <template v-slot:activator>
              <n-button
                size="small"
                @click="isActive = true"
              >
                Johnny B. Goode
              </n-button>
            </template>
            <n-nimbus-confirm-card
              width="446"
              title="Johnny B. Goode"
              :deactivate="() => isActive = false"
            >
              <template v-slot:action>
                <n-button
                  size="small"
                  round
                  style="margin-right: 12px"
                >
                  Cancel
                </n-button>
                <n-button
                  type="primary"
                  size="small"
                  round
                >
                  Delete
                </n-button>
              </template>
              <template v-slot:content>
                Deep down in Louisiana, close to New Orleans.<br>
                Way back up in the woods among the evergreens.<br>
                There stood a log cabin made of earth and wood.<br>
                Where lived a country boy named Johny B. Goode.
              </template>
            </n-nimbus-confirm-card>
          </n-modal>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<n-modal v-model="isActive">
  <template v-slot:activator>
    <n-button
      size="small"
      @click="isActive = true"
    >
      Johnny B. Goode
    </n-button>
  </template>
  <n-nimbus-confirm-card
    width="446"
    title="Johnny B. Goode"
    :deactivate="() => isActive = false"
  >
    <template v-slot:action>
      <n-button
        size="small"
        round
        style="margin-right: 12px"
      >
        Cancel
      </n-button>
      <n-button
        type="primary"
        size="small"
        round
      >
        Delete
      </n-button>
    </template>
    <template v-slot:content>
      Deep down in Louisiana, close to New Orleans.<br>
      Way back up in the woods among the evergreens.<br>
      There stood a log cabin made of earth and wood.<br>
      Where lived a country boy named Johny B. Goode.
    </template>
  </n-nimbus-confirm-card>
</n-modal>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  }
}
</script>
          </textarea>
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
      isActive: false
    }
  },
  methods: {
  }
}
</script>
