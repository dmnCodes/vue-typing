<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed, nextTick, onUnmounted } from 'vue'

// Define props with default values and types
const props = withDefaults(
  defineProps<{
    array: string[]
    minTypeSpeed?: number
    maxTypeSpeed?: number
    eraseSpeed?: number
    delayBetween?: number
    intervals?: number
    start?: number
    caret?: string
    iterations?: number
  }>(),
  {
    minTypeSpeed: 50,
    maxTypeSpeed: 150,
    eraseSpeed: 100,
    delayBetween: 2000,
    intervals: 2,
    start: 0,
    caret: 'cursor',
    iterations: Infinity
  }
)

const emit = defineEmits(['typed'])

const typeValue = ref('')
const count = ref(0)
const typeStatus = ref(false)
const arrayIndex = ref(0)
const charIndex = ref(0)
let loop = 0
let typingTimeout: ReturnType<typeof setTimeout>
let erasingTimeout: ReturnType<typeof setTimeout>

// Computed property for caret class
const caretClass = computed(() => ({
  [props.caret]: true,
  typing: typeStatus.value
}))

// Helper function to start typing
function startTyping() {
  nextTick(() => {
    typingTimeout = setTimeout(typewriter, props.start)
  })
}

// Main typing function
function typewriter() {
  if (charIndex.value < props.array[arrayIndex.value]?.length) {
    typeStatus.value = true // Set typing status to true
    typeCharacter()
  } else {
    handleTypingComplete()
  }
}

// Function to type a single character with random speed
function typeCharacter() {
  typeValue.value += props.array[arrayIndex.value].charAt(charIndex.value)
  charIndex.value += 1
  const typingSpeed = randomInterval(props.minTypeSpeed, props.maxTypeSpeed)
  typingTimeout = setTimeout(typewriter, typingSpeed)
}

// Function to handle typing completion
function handleTypingComplete() {
  emit('typed', props.array[arrayIndex.value])
  if (++count.value === props.array.length) {
    count.value = 0
    if (props.iterations && ++loop === props.iterations) {
      typeStatus.value = false
      return
    }
  }
  typeStatus.value = false // Set typing status to false after completing a word
  erasingTimeout = setTimeout(eraser, props.delayBetween)
}

// Main erasing function
function eraser() {
  if (charIndex.value > 0) {
    typeStatus.value = true // Set typing status to true during erasing
    eraseCharacter()
  } else {
    typeStatus.value = false // Set typing status to false after erasing is complete
    prepareNextWord()
  }
}

// Function to erase a single character
function eraseCharacter() {
  typeValue.value = props.array[arrayIndex.value].substring(0, charIndex.value - 1)
  charIndex.value -= 1
  erasingTimeout = setTimeout(eraser, props.eraseSpeed)
}

// Function to prepare for the next word
function prepareNextWord() {
  arrayIndex.value = (arrayIndex.value + 1) % props.array.length
  typingTimeout = setTimeout(typewriter, props.intervals)
}

// Helper function to generate a random interval between min and max
function randomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Cleanup function to clear timeouts
function clearTimers() {
  clearTimeout(typingTimeout)
  clearTimeout(erasingTimeout)
}

// Start typing when the component is mounted
startTyping()

// Clear timers when the component is unmounted to prevent memory leaks
onUnmounted(() => {
  clearTimers()
})
</script>

<template>
  <div class="dmn-typing">
    <slot name="before" />
    <span class="typed">{{ typeValue }}</span>
    <span :class="caretClass">&nbsp;</span>
    <slot name="after" />
  </div>
</template>

<style>
.dmn-typing span.cursor {
  display: inline-block;
  width: 2px;
  margin-left: 4px;
  @apply bg-slate-400;
  animation: blink 1s infinite;
}

.dmn-typing span.underscore {
  display: inline-flex;
  width: 10px;
  height: 1px;
  align-items: flex-end;
  @apply bg-slate-400;
  animation: blink 1s infinite;
}

.dmn-typing span.typing,
.dmn-typing span.typing {
  animation: none;
}

@keyframes blink {
  50% {
    background-color: transparent;
  }
}
</style>
