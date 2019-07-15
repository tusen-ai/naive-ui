<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        NimbusIcon / n-nimbus-icon
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-nimbus-icon
            type="share"
            color="#63e2b7"
            size="24"
          />
          <n-nimbus-icon
            type="ban"
            size="24"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea>
/**
 * Valid type: share, ban
 */
<n-nimbus-icon
  type="share"
  size="24"
/>
<n-nimbus-icon
  type="ban"
  size="24"
/>
<style lang="scss" scoped>
.n-nimbus-icon-ban /deep/ g {
  fill: red;
  transition: fill .3s ease-in-out;
}

.n-nimbus-icon-ban:hover /deep/ g {
  fill: green;
}
</style>
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

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.n-nimbus-icon-ban /deep/ g {
  fill: red;
  transition: fill .3s ease-in-out;
}

.n-nimbus-icon-ban:hover /deep/ g {
  fill: green;
}
</style>
