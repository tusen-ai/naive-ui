<template>
  <div class="n-base-select-menu-light-bar-wrapper">
    <transition name="n-base-select-menu-light-bar--transition">
      <div
        v-if="showLightBar"
        class="n-base-select-menu-light-bar"
        :style="{ top: lightBarStyleTop }"
      />
    </transition>
  </div>
</template>

<script>
import withlightbar from '../../../mixins/withlightbar'

export default {
  name: 'NBaseSelectMenuLightBar',
  mixins: [ withlightbar ],
  data () {
    return {
      active: true
    }
  }
}
</script>
