<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Nimbus Form Card / n-nimbus-form-card
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
                Parklife
              </n-button>
            </template>
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
                All the people<br>
                So many people<br>
                And the all go hand in hand<br>
                Hand in hand throught their parklife
              </template>
            </n-nimbus-form-card>
          </n-modal>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-modal v-model="isActive">
  <template v-slot:activator>
    <n-button
      size="small"
      @click="isActive = true"
    >
      Parklife
    </n-button>
  </template>
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
      All the people<br>
      So many people<br>
      And they all go hand in hand<br>
      Hand in hand throught their parklife
    </template>
  </n-nimbus-form-card>
</n-modal>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  }
}
</script></textarea>
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
