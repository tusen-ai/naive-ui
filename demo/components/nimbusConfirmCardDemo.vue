<template>
  <div
    ref="doc"
    class="doc"
  >
    <h1>Nimbus 确认框 / n-nimbus-confirm-card</h1>
    <hr>
    <h2>基本用法</h2>
    <n-modal v-model="isActive">
      <template v-slot:activator>
        <button @click="isActive = true">
          打开它！
        </button>
      </template>
      <n-nimbus-confirm-card
        width="446"
        title="Confirm"
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
          Are you sure to batch delete these clusters?
        </template>
      </n-nimbus-confirm-card>
    </n-modal>
    <br>
    <textarea rows="30">
<n-modal v-model="isActive">
  <template v-slot:activator>
    <button @click="isActive = true">
      打开它！
    </button>
  </template>
  <n-nimbus-confirm-card
    width="446"
    title="Confirm"
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
      Are you sure to batch delete these clusters?
    </template>
  </n-nimbus-confirm-card>
</n-modal>

<script>
export default {
  data () {
    return {
      isActive: false,
    }
  }
}
</script>
    </textarea>
    <hr>
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
  }
}
</script>

<style scoped lang="scss">
.doc {
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}
</style>
