<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
// import VueTyping from '/dist/vue-typing'
import VueTyping from '/lib/dmnTyping.vue'

import dmnRange from '@/components/dmnRange.vue'
import dmnToggle from '@/components/dmnToggle.vue'

const settings = reactive({
  minTypeSpeed: 50,
  maxTypeSpeed: 150,
  eraseSpeed: 50,
  eraseDelay: 1500,
  writeDelay: 100,
  caret: undefined,
  loop: false,
})

const key = ref(1)
const typedSentence = ref(false)
const onSentenceTyped = () => {
  typedSentence.value = true
}

watch(
  settings,
  () => {
    key.value++
  },
  { deep: true },
)
</script>

<template>
  <header>
    <h1>
      <a href="https://github.com/dmnCodes/vue-typing" target="_blank">
        @dmnCodes/vue-typing
      </a>
    </h1>
    <h2>
      <VueTyping
        :key="key"
        :sentences="[
          'Vue',
          ' component',
          ' simulating',
          ' a',
          ' realistic',
          ' typewriter',
          ' effect!',
        ]"
        v-model:minTypeSpeed="settings.minTypeSpeed"
        v-model:maxTypeSpeed="settings.maxTypeSpeed"
        v-model:eraseSpeed="settings.eraseSpeed"
        v-model:eraseDelay="settings.eraseDelay"
        v-model:writeDelay="settings.writeDelay"
        v-model:caret="settings.caret"
        v-model:loop="settings.loop"
      />
    </h2>
  </header>

  <div class="container">
    <div class="settings-grid">
      <dmnRange
        v-model="settings.minTypeSpeed"
        id="minTypeSpeed"
        :min="50"
        :max="250"
        :step="50"
        :label="`:minTypeSpeed='${settings.minTypeSpeed}'`"
      />

      <dmnRange
        v-model="settings.maxTypeSpeed"
        id="maxTypeSpeed"
        :min="50"
        :max="500"
        :step="50"
        :label="`:maxTypeSpeed='${settings.maxTypeSpeed}'`"
      />

      <dmnRange
        v-model="settings.writeDelay"
        id="writeDelay"
        :min="50"
        :max="3000"
        :step="50"
        :label="`:writeDelay='${settings.writeDelay}'`"
      />

      <dmnRange
        v-model="settings.eraseSpeed"
        id="eraseSpeed"
        :min="50"
        :max="500"
        :step="10"
        :label="`:eraseSpeed='${settings.eraseSpeed}'`"
      />

      <dmnRange
        v-model="settings.eraseDelay"
        id="eraseDelay"
        :min="50"
        :max="3000"
        :step="50"
        :label="`:eraseDelay='${settings.eraseDelay}'`"
      />

      <dmnToggle v-model="settings.loop" :label="`:loop='${settings.loop}'`" />
    </div>
  </div>

  <main>
    <div class="container">
      <p>
        This <a href="https://vuejs.org/" target="_blank">Vue.js</a> component
        simulates a realistic typewriter effect by typing and erasing sentences
        with customizable typing speed, delay, caret style, and looping options.
        The component is built with the
        <a
          href="https://vuejs.org/guide/extras/composition-api-faq.html"
          target="_blank"
          >Vue 3 Composition API</a
        >
        and
        <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a
        >.
      </p>

      <h3>Dynamic Typing</h3>
      <VueTyping
        class="text-sm text-gray-600"
        :sentences="[
          'Type out a list of sentences with random typing speed',
          ' within a specified range.',
        ]"
        :writeDelay="800"
      />

      <h3>Erasing</h3>
      <VueTyping
        class="text-sm text-gray-600"
        :sentences="[
          'Erase sentences after typing, with configurable speed and delay.',
        ]"
        :eraseSpeed="25"
        :eraseDelay="3000"
        loop
      />

      <h3>Looping</h3>
      <VueTyping
        class="text-sm text-gray-600"
        :sentences="[
          'Option',
          'to loop through',
          'the sentences indefinitely.',
        ]"
        loop
      />

      <h3>Customizable Caret</h3>
      <VueTyping
        class="text-sm text-gray-600"
        :sentences="['Customize the caret character and its appearance.']"
        :caret="'|'"
      />

      <h3>Event Emission</h3>
      <VueTyping
        class="text-sm text-gray-600"
        :sentences="['Emits an event after typing each sentence.']"
        @sentence:typed="onSentenceTyped"
      />
      <VueTyping
        v-if="typedSentence"
        class="text-sm text-gray-600"
        :sentences="['Useful for triggering additional actions.']"
        :minTypeSpeed="50"
        :maxTypeSpeed="50"
        :caret="''"
      />

      <h3>Tag and Slots</h3>
      <VueTyping
        tag="code"
        class="text-sm text-gray-600"
        :sentences="[
          'npm install @dmnCodes/vue-typing',
          'yarn add @dmnCodes/vue-typing',
        ]"
        :eraseDelay="3000"
        loop
      >
        <template #before>
          <div class="inline-flex text-green-800 font-bold">me@dmnCodes:</div>
        </template>
      </VueTyping>
    </div>
  </main>

  <footer>
    Made with 🔥 by &nbsp;
    <a href="https://github.com/dmnCodes" target="_blank">
      <img
        class="inline-block w-4 h-4 rounded-full"
        src="https://avatars.githubusercontent.com/u/29764638?s=32&v=4"
        alt="dmnCodes"
      />
      dmnCodes
    </a>
  </footer>
</template>

<style scoped>
header {
  @apply grid justify-center items-center bg-gray-900 gap-1 p-4;
  @apply md:p-12;
}

h1 {
  @apply text-2xl;
  @apply md:text-4xl text-center text-white;
  @apply font-bold;
}

h1 a {
  @apply text-blue-600 hover:text-blue-700 transition duration-300;
}

h2 {
  @apply text-center text-base text-gray-500;
  @apply md:text-xl;
}

h3 {
  @apply mt-10 mb-1 font-bold text-xl;
}

main {
  @apply text-sm;
  @apply md:text-base;
}

.container {
  @apply max-w-6xl mx-auto px-4 py-6;
}

footer {
  @apply flex justify-center items-center bg-gray-100 p-2;
  @apply text-center text-sm text-gray-900 text-opacity-60;
}
/* main {
  @apply max-w-5xl;
  @apply py-10;
} */

a {
  @apply text-blue-600 hover:text-blue-700;
}

code {
  @apply block;
  @apply text-sm font-mono;
  @apply bg-gray-100 rounded p-2;
}

.settings-grid {
  @apply grid grid-cols-2 gap-4;
  @apply md:grid-cols-4;
}
</style>
