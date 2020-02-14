<template>
  <div
    class="n-thing"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="syntheticStyle"
  >
    <div v-if="$slots.avatar && contentIndented" class="n-thing-avatar">
      <slot name="avatar" />
    </div>
    <div class="n-thing-main">
      <div
        v-if="!contentIndented && ($slots.header || title || $slots['header-extra'] || titleExtra || $slots.avatar)"
        class="n-thing-avatar-header-wrapper"
      >
        <div v-if="$slots.avatar && !contentIndented" class="n-thing-avatar">
          <slot name="avatar" />
        </div>
        <div v-if="$slots.header || title || $slots['header-extra'] || titleExtra" class="n-thing-header-wrapper">
          <div class="n-thing-header">
            <div v-if="$slots.header || title" class="n-thing-header__title">
              <slot name="header">
                {{ title }}
              </slot>
            </div>
            <div v-if="$slots['header-extra'] || titleExtra" class="n-thing-header__extra">
              <slot name="header-extra">
                {{ titleExtra }}
              </slot>
            </div>
          </div>
          <div v-if="$slots.description || description" class="n-thing-main__description">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <template v-else>
        <div v-if="$slots.header || title || $slots['header-extra'] || titleExtra" class="n-thing-header">
          <div v-if="$slots.header || title" class="n-thing-header__title">
            <slot name="header">
              {{ title }}
            </slot>
          </div>
          <div v-if="$slots['header-extra'] || titleExtra" class="n-thing-header__extra">
            <slot name="header-extra">
              {{ titleExtra }}
            </slot>
          </div>
        </div>
        <div v-if="$slots.description || description" class="n-thing-main__description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>
      <div v-if="$slots.default || content" class="n-thing-main__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div v-if="$slots.footer" class="n-thing-main__footer">
        <slot name="footer" />
      </div>
      <div v-if="$slots.action" class="n-thing-main__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NThing',
  mixins: [ withapp, themeable ],
  props: {
    title: {
      type: String,
      default: null
    },
    titleExtra: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    contentIndented: {
      type: Boolean,
      default: false
    }
  }
}
</script>
