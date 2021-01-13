<template>
  <div ref="doc" class="n-doc" style="padding: 150px">
    <n-button @click="show = !show">
      show
    </n-button>
    <n-button @click="i = 0">
      cash
    </n-button>
    <n-button @click="i = 1">
      contacts
    </n-button>
    <n-button @click="i = 2">
      contacts2
    </n-button>
    <div style="position: relative">
      <n-base-icon-transition v-if="show">
        <n-icon v-if="i === 0" :size="60">
          <md-cash />
        </n-icon>
        <n-icon v-else-if="i === 1" :size="60">
          <md-contacts />
        </n-icon>
        <span v-else-if="i === 2" style="display: inline-block"> 123 </span>
      </n-base-icon-transition>
    </div>
  </div>
</template>

<script>
import { MdCash, MdContacts } from '@vicons/ionicons-v4'

export default {
  components: {
    MdCash,
    MdContacts
  },
  data () {
    return {
      i: 0,
      show: false
    }
  }
}
</script>
