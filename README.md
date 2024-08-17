# Vue Typewriter Component

This Vue component simulates a typewriter effect by typing and erasing sentences with customizable typing speed, delay, caret style, and looping options. The component is built with the [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) and [TypeScript](https://www.typescriptlang.org/).

## Demo Page
[https://dmncodes.github.io/vue-typing/](https://dmncodes.github.io/vue-typing/)


## Features

- **Dynamic Typing:** Type out a list of sentences with random typing speed within a specified range.
- **Erasing:** Erase sentences after typing, with configurable speed and delay.
- **Looping:** Option to loop through the sentences indefinitely.
- **Customizable Caret:** Customize the caret character and its appearance.
- **Event Emission:** Emits an event after typing each sentence, useful for triggering additional actions.


## Usage
Here’s how you can use the Typewriter component in your Vue application:


### 1. Install

With NPM Package Manager
```bash
npm i @dmncodes/vue-typing
```

With Yarn
```bash
yarn add @dmncodes/vue-typing
```


### 2. Import the Component
You can import the component into your Vue component:

```javascript
import VueTyping from "@dmncodes/vue-typing"
```


### 3. Use the Component in Your Template

```javascript
<template>
  <VueTyping 
    :sentences="['Hello World!', 'Welcome to Vue.js']"
    :minTypeSpeed="50"
    :maxTypeSpeed="150"
    :eraseSpeed="100"
    :eraseDelay="1500"
    :writeDelay="0"
    caret="_"
    :loop="true"
    @sentence:typed="onSentenceTyped"
  />
</template>

<script setup>
function onSentenceTyped(sentence: string) {
  console.log(`Typed sentence: ${sentence}`);
}
</script>
```

### 4. Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| sentences | string[] | [] | List of sentences to type out. |
| minTypeSpeed | number | 50 | Minimum typing speed in milliseconds. |
| maxTypeSpeed | number | 150 | Maximum typing speed in milliseconds. |
| eraseSpeed | number | 100 | Speed of erasing each character in milliseconds. |
| eraseDelay | number | 1500 | Delay before starting to erase in milliseconds. |
| writeDelay | number | 0 | Delay before starting to type the next sentence in milliseconds. |
| caret | string | _ | Character to display as the caret. |
| loop | boolean | false | Whether to loop through the sentences indefinitely. |


### 5. Events
| Event Name | Payload | Description |
| ---------- | ------- | ----------- |
| sentence:typed | string (sentence) | Emitted after a sentence is fully typed out. |


### 6. Styling
The component comes with some basic styles for the caret and typing animations. You can customize these styles by overriding the CSS classes:

```css
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
```

### 7. Testing
Unit tests are written using Vitest and Vue Test Utils. The tests cover:

* Typing the sentences correctly.
* Erasing sentences after typing.
* Emitting events after each sentence is typed.
* Correct application of the caret classes and animations.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

## License
This project is licensed under the MIT License.

