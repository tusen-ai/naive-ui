<template>
  <n-modal v-model="value">
    <template #header>
      <n-input v-model="time" /> {{ time }}
      <n-button>Look at it</n-button>
    </template>
    <n-input v-model="time" /> {{ time }}
    <template #footer>
      <n-input v-model="time" /> {{ time }}
      <n-button>Look at it</n-button>
    </template>
  </n-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      time: '666',
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
