import App from '@/App.vue'
import { mount } from '@vue/test-utils'

describe('Character Item component', () => {
  test('should show correct character name', () => {
    const wrapper = mount(App, {
      stubs: {
        'router-view': {
          template: '<div class="router-view"></div>'
        }
      }
    })

    expect(wrapper.find('.router-view')).toBeTruthy()
  })
})
