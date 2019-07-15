<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Radio
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Single Radio
        </div>
        <div class="n-doc-section__view">
          <n-radio
            v-model="value1"
            value="Definitely Maybe"
          >
            Definitely Maybe
          </n-radio>
          <n-radio
            v-model="value1"
            value="Be Here Now"
          >
            Be Here Now
          </n-radio>
        </div>
        <pre class="n-doc-section__inspect">value: {{ JSON.stringify(value1) }}</pre>
        <div class="n-doc-section__source">
          <textarea><n-radio
  v-model="value"
  value="Definitely Maybe"
>
  Definitely Maybe
</n-radio>
<n-radio
  v-model="value"
  value="Be Here Now"
>
  Be Here Now
</n-radio>

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
</textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Radio Group
        </div>
        <div class="n-doc-section__view">
          <n-radio-group v-model="value2">
            <n-radio
              v-for="song in songs"
              :key="song.value"
              :value="song.value"
            >
              {{ song.label }}
            </n-radio>
          </n-radio-group>
        </div>
        <pre class="n-doc-section__inspect">value: {{ JSON.stringify(value2) }}</pre>
        <div class="n-doc-section__source">
          <textarea v-pre><n-radio-group v-model="value">
  <n-radio
    v-for="song in songs"
    :key="song.value"
    :value="song.value"
  >
    {{ song.label }}
  </n-radio>
</n-radio-group>

<script>
export default {
  data () {
    return {
      value: null,
      songs: [
        {
          value: 'Rock\'n\'Roll Star',
          label: 'Rock\'n\'Roll Star'
        },
        {
          value: 'Shakermaker',
          label: 'Shakermaker'
        },
        {
          value: 'Live Forever',
          label: 'Live Forever'
        },
        {
          value: 'Up in the Sky',
          label: 'Up in the Sky'
        },
        {
          value: '...',
          label: '...'
        }
      ].map(s => {
        s.value = s.value.toLowerCase()
        return s
      }
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
      value1: null,
      value2: null,
      songs: [
        {
          value: 'Rock\'n\'Roll Star',
          label: 'Rock\'n\'Roll Star'
        },
        {
          value: 'Shakermaker',
          label: 'Shakermaker'
        },
        {
          value: 'Live Forever',
          label: 'Live Forever'
        },
        {
          value: 'Up in the Sky',
          label: 'Up in the Sky'
        },
        {
          value: '...',
          label: '...'
        }
      ].map(s => {
        s.value = s.value.toLowerCase()
        return s
      })
    }
  },
  methods: {
  }
}
</script>
