<markdown>
# Custom Cell

You can use the `cell` slot to customize the data to be rendered.
    </markdown>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useMessage, useThemeVars } from 'naive-ui'
import { addDays, format, isYesterday } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Checkmark } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Checkmark
  },
  setup() {
    const message = useMessage()
    const themeVars = useThemeVars()
    const primaryColor = computed(() => themeVars.value.primaryColor)

    return {
      zhCN,
      format,
      primaryColor,
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue(
        _: number,
        { year, month, date }: { year: number, month: number, date: number }
      ) {
        message.success(`${year}-${month}-${date}`)
      },
      isDateDisabled(timestamp: number) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      }
    }
  }
})
</script>

<template>
  <n-calendar
    v-model:value="value"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue"
  >
    <template #cell="{ date, data }">
      <div>
        <div class="flex-center">
          <span>
            <n-avatar
              :size="24"
              round
              :color="
                data.isSelected
                  ? primaryColor
                  : data.isDisabled
                    ? '#ccc'
                    : '#959697'
              "
            >
              {{ data.day }}
            </n-avatar>
            <n-icon
              v-if="data.isSelected"
              :color="primaryColor"
              :size="24"
              style="margin-left: 6px"
            >
              <Checkmark />
            </n-icon>
          </span>
          <span>{{ format(data.timestamp, 'EEE', { locale: zhCN }) }}</span>
        </div>
        {{ date.year }} / {{ date.month }} / {{ date.date }}
        <div v-if="data.day === 16 || data.day === 18">
          <div class="flex-col-center">
            <n-badge dot />
            <span style="margin-left: 6px">A high priority task</span>
          </div>
          <div class="flex-col-center">
            <n-badge dot color="orange" />
            <span style="margin-left: 6px">A medium priority task</span>
          </div>
          <div class="flex-col-center">
            <n-badge dot color="#18a058" />
            <span style="margin-left: 6px">A low priority task</span>
          </div>
        </div>
      </div>
    </template>
  </n-calendar>
</template>

<style>
.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-col-center {
  display: flex;
  align-items: center;
}
</style>
