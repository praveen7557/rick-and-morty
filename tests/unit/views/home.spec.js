import Home from '@/views/Home.vue'
import { RouterLinkStub, mount } from '@vue/test-utils'
import mockAxios from 'axios'
import { locations } from '../samples/locations'
import flushPromises from 'flush-promises'

const mocks = {
  $router: {
    push: jest.fn(() => Promise.resolve())
  },
  console: {
    error: jest.fn(() => Promise.resolve())
  }
}

beforeAll(() => {
  console.error = jest.fn()
})

describe('Home Component', () => {
  test('should call fetch locations with no.of times as pages', async () => {
    mockAxios.mockResolvedValue({ data: locations })
    const wrapper = mount(Home, {
      stubs: {
        'router-link': RouterLinkStub
      },
      mocks
    })
    const vm = wrapper.vm
    await flushPromises()
    expect(mockAxios).toBeCalledTimes(locations.info.pages)
    expect(vm.locations.length).toBe(locations.results.length * locations.info.pages)
  })

  test('should show error when fetch location fails', async () => {
    mockAxios.mockRejectedValue()
    const wrapper = mount(Home, {
      stubs: {
        'router-link': RouterLinkStub
      },
      mocks
    })
    const vm = wrapper.vm
    await flushPromises()
    expect(vm.error).toBeTruthy()
    expect(wrapper.find('.location-error')).toBeTruthy()
  })

  test('should call fetch character API same number as characters in location', async () => {
    mockAxios.mockResolvedValue({ data: locations })
    const wrapper = mount(Home, {
      stubs: {
        'router-link': RouterLinkStub
      },
      mocks
    })
    const vm = wrapper.vm
    await flushPromises()
    jest.clearAllMocks()
    wrapper
      .findAll('.location')
      .at(0)
      .trigger('click')
    await flushPromises()
    expect(
      wrapper
        .findAll('.location')
        .at(0)
        .classes()
    ).toContain('active')
  })
})
