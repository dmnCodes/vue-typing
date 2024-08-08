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
  eraseDelay: 500,
  writeDelay: 150,
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
        :minTypeSpeed="settings.minTypeSpeed"
        :maxTypeSpeed="settings.maxTypeSpeed"
        :eraseSpeed="settings.eraseSpeed"
        :eraseDelay="settings.eraseDelay"
        :writeDelay="settings.writeDelay"
        :caret="settings.caret"
        :loop="settings.loop"
      />
    </h2>
  </header>

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
    </div>

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
          v-model="settings.eraseDelay"
          id="eraseDelay"
          :min="50"
          :max="3000"
          :step="50"
          :label="`:eraseDelay='${settings.eraseDelay}'`"
        />

        <dmnToggle
          v-model="settings.loop"
          :label="`:loop='${settings.loop}'`"
        />

        <dmnRange
          v-if="settings.loop"
          v-model="settings.eraseSpeed"
          id="eraseSpeed"
          :min="10"
          :max="500"
          :step="10"
          :label="`:eraseSpeed='${settings.eraseSpeed}'`"
        />
      </div>
    </div>

    <div class="container">
      <div class="examples-grid">
        <div>
          <h3>Dynamic Typing</h3>
          <VueTyping
            class="typing-text"
            :sentences="[
              'Type out a list of sentences with random typing speed',
              ' within a specified range.',
            ]"
            :writeDelay="800"
          />
        </div>

        <div>
          <h3>Erasing</h3>
          <VueTyping
            class="typing-text"
            :sentences="[
              'Erase sentences after typing, with configurable speed and delay.',
            ]"
            :eraseSpeed="25"
            :eraseDelay="3000"
            loop
          />
        </div>

        <div>
          <h3>Looping</h3>
          <VueTyping
            class="typing-text"
            :sentences="[
              'Option',
              'to loop through',
              'the sentences indefinitely.',
            ]"
            loop
          />
        </div>

        <div>
          <h3>Customizable Caret</h3>
          <VueTyping
            class="typing-text"
            :sentences="['Customize the caret character and its appearance.']"
            :caret="'|'"
          />
        </div>

        <div>
          <h3>Event Emission</h3>
          <VueTyping
            class="typing-text"
            :sentences="['Emits an event after typing each sentence.']"
            @sentence:typed="onSentenceTyped"
          />
          <VueTyping
            v-if="typedSentence"
            class="typing-text"
            :sentences="['Useful for triggering additional actions.']"
            :minTypeSpeed="50"
            :maxTypeSpeed="50"
            :caret="''"
          />
        </div>

        <div>
          <h3>Tag and Slots</h3>
          <VueTyping
            tag="code"
            class="typing-text"
            :sentences="[
              'npm install @dmnCodes/vue-typing',
              'yarn add @dmnCodes/vue-typing',
            ]"
            :eraseDelay="3000"
            loop
          >
            <template #before>
              <div class="inline-flex text-green-800 font-bold">
                me@dmnCodes:
              </div>
            </template>
          </VueTyping>
        </div>
      </div>
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
  @apply grid justify-center items-center gap-1 p-4 md:p-12;
  @apply bg-gray-100 dark:bg-gray-900;
}

h1 {
  @apply text-center text-2xl md:text-4xl;
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
  @apply mt-10 mb-1;
  @apply font-bold text-xl dark:text-gray-300;
}

main {
  @apply min-h-screen;
  @apply py-2 md:py-6 lg:py-8 xl:py-12;
  @apply text-sm text-gray-600 dark:text-gray-400;
  @apply md:text-base;
  @apply bg-white dark:bg-gray-800;
}

footer {
  @apply flex justify-center items-center p-4;
  @apply text-center text-sm text-gray-500;
  @apply bg-gray-100 dark:bg-gray-900;
}

a {
  @apply text-blue-600 hover:text-blue-700;
}

.container {
  @apply max-w-6xl mx-auto p-4;
}

.settings-grid {
  @apply grid grid-cols-2 gap-4;
  @apply md:grid-cols-4;
}

.examples-grid {
  @apply grid grid-cols-1 gap-4;
  @apply md:grid-cols-2;
}

.typing-text {
  @apply text-sm;
}

code {
  @apply block rounded p-2;
  @apply text-sm;
  @apply font-mono;
  @apply bg-gray-100 dark:bg-gray-900;
}
</style>
