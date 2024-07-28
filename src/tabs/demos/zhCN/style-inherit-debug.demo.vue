<markdown>
# Style Inherit Debug
</markdown>

<script lang="ts">
import { NTabPane, NTabs } from 'naive-ui'

export default {
  name: 'App',
  components: {
    NTabs,
    NTabPane
  }
}
</script>

<template>
  <div id="app">
    <h2>one tab</h2>
    <NTabs type="line">
      <NTabPane name="One">
        1111
      </NTabPane>
      <NTabPane name="Two">
        1111
      </NTabPane>
    </NTabs>

    <h2>one tabs Parent/Child</h2>
    <NTabs type="card">
      <NTabPane name="POne">
        <NTabs type="line">
          <NTabPane name="COne">
            1111
          </NTabPane>
          <NTabPane name="CTwo">
            1111
          </NTabPane>
        </NTabs>
      </NTabPane>
      <NTabPane name="PTwo">
        1111
      </NTabPane>
    </NTabs>
  </div>
</template>
