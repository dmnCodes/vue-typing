<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed, nextTick, onUnmounted } from 'vue'

// Define props with default values and types
const props = withDefaults(
  defineProps<{
    sentences: string[]
    minTypeSpeed?: number
    maxTypeSpeed?: number
    eraseSpeed?: number
    eraseDelay?: number
    writeDelay?: number
    caret?: string
    loop?: boolean
  }>(),
  {
    minTypeSpeed: 50,
    maxTypeSpeed: 150,
    eraseSpeed: 100,
    eraseDelay: 1500,
    writeDelay: 0,
    caret: '_',
    loop: false
  }
)

const emit = defineEmits(['sentence:typed'])

const typeValue = ref('')
const count = ref(0)
const typeStatus = ref(false)
const sentencesIndex = ref(0)
const charIndex = ref(0)
let typingTimeout: ReturnType<typeof setTimeout>
let erasingTimeout: ReturnType<typeof setTimeout>

// Computed property for caret class
const caretClass = computed(() => ({
  caret: true,
  [props.caret]: true,
  typing: typeStatus.value
}))

// Helper function to start typing
function startTyping() {
  nextTick(() => {
    typingTimeout = setTimeout(typewriter, props.writeDelay)
  })
}

// Main typing function
function typewriter() {
  if (charIndex.value < props.sentences[sentencesIndex.value]?.length) {
    typeStatus.value = true // Set typing status to true
    typeCharacter()
  } else {
    handleTypingComplete()
  }
}

// Function to type a single character with random speed
function typeCharacter() {
  typeValue.value += props.sentences[sentencesIndex.value].charAt(charIndex.value)
  charIndex.value += 1
  const typingSpeed = randomInterval(props.minTypeSpeed, props.maxTypeSpeed)
  typingTimeout = setTimeout(typewriter, typingSpeed)
}

// Function to handle typing completion
function handleTypingComplete() {
  emit('sentence:typed', props.sentences[sentencesIndex.value])
  count.value += 1
  if (!props.loop && count.value === props.sentences.length) {
    typeStatus.value = false
    return
  }
  if (props.loop) {
    typeStatus.value = false // Set typing status to false after completing a word
    erasingTimeout = setTimeout(eraser, props.eraseDelay)
  } else {
    prepareNextWord()
  }
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
  typeValue.value = props.sentences[sentencesIndex.value].substring(0, charIndex.value - 1)
  charIndex.value -= 1
  erasingTimeout = setTimeout(eraser, props.eraseSpeed)
}

// Function to prepare for the next word
function prepareNextWord() {
  sentencesIndex.value = (sentencesIndex.value + 1) % props.sentences.length
  if (props.loop || sentencesIndex.value > 0) {
    typeStatus.value = true // Set typing status to true before typing the next word
    charIndex.value = 0
    typingTimeout = setTimeout(typewriter, props.writeDelay)
  }
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
  <div class="dmn-typing" data-id="dmn-typing">
    <slot name="before" data-id="dmn-typing-before" />
    <span class="sentence" data-id="dmn-typing-sentence">{{ typeValue }}</span>
    <span :class="caretClass" data-id="dmn-typing-caret">&nbsp;{{ props.caret }}</span>
    <slot name="after" data-id="dmn-typing-after" />
  </div>
</template>

<style>
.dmn-typing span.caret {
  color: inherit;
  animation: blink 1s infinite;
}

.dmn-typing span.typing {
  animation: none;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
