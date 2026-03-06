import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts and contains the navigation bar', () => {
    const wrapper = mount(App)
    // App.vue simply renders the navigation bar and a router view
    expect(wrapper.findComponent({ name: 'NavigationBar' }).exists()).toBe(true)
  })
})
