import { mount } from '@vue/test-utils'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import dmnTyping from './dmnTyping.vue'

describe('dmnTyping.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('renders elements properly', () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World']
      }
    })
    expect(wrapper.find('[data-id="dmn-typing-sentence"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="dmn-typing-caret"]').exists()).toBe(true)
  })

  it('renders initial state correctly', () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World']
      }
    })
    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('')
  })

  it('types out the first string correctly', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10
      }
    })

    // Move timer to ensure character typing
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('Hello')
  })

  it('does not erase when loop is false', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        loop: false
      }
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('Hello')

    vi.advanceTimersByTime(50)
    // Type "World"
    await wrapper.vm.$nextTick()
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('HelloWorld')
  })

  it('cycles through multiple strings correctly when loop is true', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        eraseDelay: 100,
        loop: true
      }
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('Hello')

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Erase "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('')

    // Wait for the delay before typing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Type "World"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('[data-id="dmn-typing-sentence"]').text()).toBe('World')
  })

  it('stops animation when typing and erasing', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        eraseDelay: 100,
        loop: true
      }
    })

    await wrapper.vm.$nextTick()

    // While typing "Hello"
    for (let i = 0; i < 4; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-id="dmn-typing-caret"]').classes()).toContain('typing')
    }

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // While erasing "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-id="dmn-typing-caret"]').classes()).toContain('typing')
    }
  })

  it('emits the "typed" event correctly for each string', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        sentences: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        eraseDelay: 0,
        loop: true
      }
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }
    vi.advanceTimersByTime(10)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('sentence:typed')).toBeTruthy()
    expect(wrapper.emitted('sentence:typed')[0][0]).toEqual('Hello')

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Erase "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    // Wait for the delay before typing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Type "World"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.emitted('sentence:typed')).toBeTruthy()
    expect(wrapper.emitted('sentence:typed')[1][0]).toEqual('World')
  })
})
