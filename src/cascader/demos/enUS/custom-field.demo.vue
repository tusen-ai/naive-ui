<markdown>
# Customizing Fields

Various data would come from backend.
</markdown>

<template>
  <n-cascader
    :options="options"
    default-value="Drive My Car"
    label-field="whateverLabel"
    value-field="whateverValue"
    children-field="whateverChildren"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          whateverLabel: 'Rubber Soul',
          whateverValue: 'Rubber Soul',
          whateverChildren: [
            {
              whateverLabel:
                "Everybody's Got Something to Hide Except Me and My Monkey",
              whateverValue:
                "Everybody's Got Something to Hide Except Me and My Monkey"
            },
            {
              whateverLabel: 'Drive My Car',
              whateverValue: 'Drive My Car',
              disabled: true
            },
            {
              whateverLabel: 'Norwegian Wood',
              whateverValue: 'Norwegian Wood'
            },
            {
              whateverLabel: "You Won't See",
              whateverValue: "You Won't See",
              disabled: true
            },
            {
              whateverLabel: 'Nowhere Man',
              whateverValue: 'Nowhere Man'
            },
            {
              whateverLabel: 'Think For Yourself',
              whateverValue: 'Think For Yourself'
            },
            {
              whateverLabel: 'The Word',
              whateverValue: 'The Word'
            },
            {
              whateverLabel: 'Michelle',
              whateverValue: 'Michelle',
              disabled: true
            },
            {
              whateverLabel: 'What goes on',
              whateverValue: 'What goes on'
            },
            {
              whateverLabel: 'Girl',
              whateverValue: 'Girl'
            },
            {
              whateverLabel: "I'm looking through you",
              whateverValue: "I'm looking through you"
            },
            {
              whateverLabel: 'In My Life',
              whateverValue: 'In My Life'
            },
            {
              whateverLabel: 'Wait',
              whateverValue: 'Wait'
            }
          ]
        },
        {
          whateverLabel: 'Let It Be',
          whateverValue: 'Let It Be Album',
          whateverChildren: [
            {
              whateverLabel: 'Two Of Us',
              whateverValue: 'Two Of Us'
            },
            {
              whateverLabel: 'Dig A Pony',
              whateverValue: 'Dig A Pony'
            },
            {
              whateverLabel: 'Across The Universe',
              whateverValue: 'Across The Universe'
            },
            {
              whateverLabel: 'I Me Mine',
              whateverValue: 'I Me Mine'
            },
            {
              whateverLabel: 'Dig It',
              whateverValue: 'Dig It'
            },
            {
              whateverLabel: 'Let It Be',
              whateverValue: 'Let It Be'
            },
            {
              whateverLabel: 'Maggie Mae',
              whateverValue: 'Maggie Mae'
            },
            {
              whateverLabel: "I've Got A Feeling",
              whateverValue: "I've Got A Feeling"
            },
            {
              whateverLabel: 'One After 909',
              whateverValue: 'One After 909'
            },
            {
              whateverLabel: 'The Long And Winding Road',
              whateverValue: 'The Long And Winding Road'
            },
            {
              whateverLabel: 'For You Blue',
              whateverValue: 'For You Blue'
            },
            {
              whateverLabel: 'Get Back',
              whateverValue: 'Get Back'
            }
          ]
        }
      ]
    }
  }
})
</script>
