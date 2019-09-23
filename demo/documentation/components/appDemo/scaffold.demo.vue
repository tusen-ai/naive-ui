<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-app :namespace="ns">
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
              <n-date-picker
                v-model="time"
                type="datetime"
              />
              <n-select
                v-model="selectedValue"
                size="small"
                placeholder="Please Select Type"
                :items="items"
                style="flex-grow: 1;"
              />
              <n-tooltip
                placement="bottom"
                trigger="click"
                style="margin-right: 12px;"
              >
                <template v-slot:activator>
                  <n-button style="margin: 0;">
                    California Girls(Click)
                  </n-button>
                </template>
                <span>
                  I wish they all could be California girls
                </span>
              </n-tooltip>
            </template>
          </n-nimbus-form-card>
        </n-modal>
      </n-app>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect"><n-button @click="ns='custom-app-namespace1'">custom-app-namespace1</n-button><n-button @click="ns='custom-app-namespace2'">custom-app-namespace2</n-button></pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ns: 'custom-app-namespace1',
      isActive: false,
      time: null,
      selectedValue: null,
      items: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0'
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  }
}
</script>
