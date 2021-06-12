<template>
  <n-nimbus-form-card
    width="1032"
    title="Parklife"
    :deactivate="() => (isActive = false)"
  >
    <template #header>
      {{ time }}
    </template>
    <template #footer> #footer </template>
    <template #content>
      <n-input v-model="time" />
      <n-select
        v-model="selectedValue"
        size="small"
        placeholder="Please Select Type"
        :items="items"
        style="flex-grow: 1"
      />
      <n-tooltip placement="bottom" trigger="click" style="margin-right: 12px">
        <template #activator>
          <n-button style="margin: 0"> California Girls(Click) </n-button>
        </template>
        <span> I wish they all could be California girls </span>
      </n-tooltip>
    </template>
  </n-nimbus-form-card>
</template>

<script>
export default {
  data () {
    return {
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
