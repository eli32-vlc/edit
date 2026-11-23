<script setup lang="ts">
import { useT } from '../composables/i18n'
import Field from './CardField.vue'
import InputField from './InputField.vue'
import ToggleIndexes from './ToggleIndexes.vue'
import ToggleStarred from './ToggleStarred.vue'

const t = useT()
</script>

<template>
  <div
    class="bg-$vp-c-bg hover:bg-$vp-c-bg/40 border-$vp-c-default-soft hover:border-primary transition-border relative z-0 rounded-lg border-2 border-solid p-5 duration-500"
  >
    <div class="align-center mb-4 flex justify-between">
      <div class="text-$vp-c-text-1 lh-relaxed text-sm font-bold">
        {{ t('Emoji Legend') }}
      </div>
    </div>
    <Field icon="i-twemoji-globe-with-meridians">{{ t('Indexes') }}</Field>
    <Field icon="i-twemoji-repeat-button">{{ t('Section Links') }}</Field>
    <Field icon="i-twemoji-star">{{ t('Recommendations') }}</Field>
    <div class="align-center mb-4 mt-4 flex justify-between">
      <div class="text-$vp-c-text-1 lh-relaxed text-sm font-bold">
        {{ t('Options') }}
      </div>
    </div>
    <InputField id="toggle-starred" :label="t('Toggle Starred')">
      <template #display>
        <ToggleStarred />
      </template>
    </InputField>
    <InputField id="toggle-indexes" :label="t('Toggle Indexes')">
      <template #display>
        <ToggleIndexes />
      </template>
    </InputField>
  </div>
</template>
