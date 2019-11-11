<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-modal v-model="isActive">
        <template v-slot:activator>
          <n-button
            size="small"
            @click="isActive = true, buttons = ['666']"
          >
            Parklife
          </n-button>
        </template>
        <n-nimbus-form-card
          width="1032"
          title="Parklife"
          sticky
          :deactivate="() => isActive = false"
        >
          <template v-slot:header>
            v-slot:header
          </template>
          <template v-slot:footer>
            v-slot:footer
          </template>
          <template v-slot:content>
            <n-button
              v-for="(button, index) of buttons"
              :key="index"
              style="display: block; margin-bottom: 40px;"
              @click="buttons.push('666')"
            >
              {{ button }}
            </n-button>
          </template>
        </n-nimbus-form-card>
      </n-modal>
      <!--EXAMPLE_END-->
    </div>
    <pre>
      <!--SOURCE-->
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: ['666'],
      isActive: false
    }
  }
}
</script>
