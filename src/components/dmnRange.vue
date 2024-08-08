<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Number,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  emit('update:modelValue', Number(value))
}
</script>

<template>
  <div>
    <label
      :for="$attrs.id"
      class="block -mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ $attrs.label }}</label
    >
    <input
      v-bind="$attrs"
      :value="modelValue"
      :id="$attrs.id"
      type="range"
      class="w-full h-2 mb-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>
