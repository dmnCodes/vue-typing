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

  it('renders initial state correctly', () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
      },
    })
    expect(wrapper.find('.typed').text()).toBe('')
    expect(wrapper.find('.cursor').exists()).toBe(true)
  })

  it('types out the first string correctly', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        start: 0,
      },
    })

    // Move timer to ensure character typing
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('Hello')
  })

  it('erases the first string correctly', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hi'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        delayBetween: 100,
      },
    })

    // Move timer to ensure character typing
    for (let i = 0; i < 2; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('Hi')

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Move timer to ensure character erasing
    for (let i = 0; i < 2; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('')
  })

  it('cycles through multiple strings correctly', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        delayBetween: 100,
        intervals: 50,
      },
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('Hello')

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Erase "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('')

    // Wait for the delay before typing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // Type "World"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

    expect(wrapper.find('.typed').text()).toBe('World')
  })

  it('types the second string correctly after erasing the first string', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        delayBetween: 100,
        intervals: 50,
      },
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }

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

    expect(wrapper.find('.typed').text()).toBe('World')
  })

  // TODO: iterations - not implemented in component
  // it('handles iterations and stops after the specified number of iterations', async () => {
  //   const wrapper = mount(dmnTyping, {
  //     props: {
  //       array: ['Hello'],
  //       minTypeSpeed: 10,
  //       maxTypeSpeed: 10,
  //       eraseSpeed: 10,
  //       delayBetween: 100,
  //       intervals: 50,
  //       iterations: 2,
  //     },
  //   })

  //   // Type "Hello" twice and erase twice
  //   for (let i = 0; i < 5; i++) {
  //     for (let j = 0; j < 5; j++) {
  //       vi.advanceTimersByTime(10)
  //       await wrapper.vm.$nextTick()
  //     }
  //     vi.advanceTimersByTime(100)
  //     await wrapper.vm.$nextTick()
  //     for (let j = 0; j < 5; j++) {
  //       vi.advanceTimersByTime(10)
  //       await wrapper.vm.$nextTick()
  //     }
  //     vi.advanceTimersByTime(100)
  //     await wrapper.vm.$nextTick()
  //   }

  //   // After two iterations, it should stop
  //   expect(wrapper.find('.typed').text()).toBe('')
  // })

  it('sets typing status to true while typing and erasing', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        delayBetween: 100,
        intervals: 50,
      },
    })

    await wrapper.vm.$nextTick()

    // While typing "Hello"
    for (let i = 0; i < 4; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.typeStatus).toBe(true)
    }

    // Wait for the delay before erasing
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    // While erasing "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.typeStatus).toBe(true)
    }
  })

  // TODO: TypeError: wrapper.vm.$on is not a function
  it('emits the "typed" event correctly for each string', async () => {
    const wrapper = mount(dmnTyping, {
      props: {
        array: ['Hello', 'World'],
        minTypeSpeed: 10,
        maxTypeSpeed: 10,
        eraseSpeed: 10,
        delayBetween: 100,
        intervals: 50,
      },
    })

    // Type "Hello"
    for (let i = 0; i < 5; i++) {
      vi.advanceTimersByTime(10)
      await wrapper.vm.$nextTick()
    }
    vi.advanceTimersByTime(10)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('typed')).toBeTruthy()
    expect(wrapper.emitted('typed')[0][0]).toEqual('Hello')

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

    expect(wrapper.emitted('typed')).toBeTruthy()
    expect(wrapper.emitted('typed')[1][0]).toEqual('World')
  })
})
