import Home from '@/views/Home.vue'
import { RouterLinkStub, mount } from '@vue/test-utils'
import mockAxios from 'axios'
import { locations } from '../samples/locations'
import { character } from '../samples/character'
import flushPromises from 'flush-promises'

beforeAll(() => {
  console.error = jest.fn()
})

describe('Home Component', () => {
  test('should call fetch locations with no.of times as pages', async () => {
    mockAxios.mockResolvedValue({ data: locations })
    const wrapper = mount(Home, {
      stubs: {
        'router-link': RouterLinkStub
      }
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
      }
    })
    const vm = wrapper.vm
    await flushPromises()
    expect(vm.error).toBeTruthy()
    expect(wrapper.find('.location-error')).toBeTruthy()
  })
})

describe('test residents', () => {
  let wrapper
  beforeEach(async () => {
    mockAxios.mockResolvedValue({ data: locations })
    wrapper = mount(Home, {
      stubs: {
        'router-link': RouterLinkStub
      }
    })
    await flushPromises()
    jest.clearAllMocks()
  })

  test('should call fetch character API same number as characters in location', async () => {
    mockAxios.mockResolvedValue({ data: character })
    const firstLocation = wrapper.findAll('.location').at(0)
    firstLocation.trigger('click')
    expect(wrapper.vm.loading).toBeTruthy()
    await flushPromises()
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.find('.location-info h3').text()).toContain(locations.results[0].name)
    expect(firstLocation.classes()).toContain('active')
    expect(mockAxios).toBeCalledTimes(locations.results[0].residents.length)
    expect(wrapper.findAll('.character-container').length).toBe(
      locations.results[0].residents.length
    )
  })

  test('should show error when character API fails', async () => {
    mockAxios.mockRejectedValue()
    const firstLocation = wrapper.findAll('.location').at(0)
    firstLocation.trigger('click')
    await flushPromises()
    expect(wrapper.vm.residentError).toBeTruthy()
    expect(wrapper.find('.resident-error').text()).toBe('There was an error fetching Residents')
  })

  test('should show no residents when location with no residents clicked', async () => {
    const noResidentsLocation = wrapper.findAll('.location').at(4)
    noResidentsLocation.trigger('click')
    await flushPromises()
    expect(wrapper.find('.no-residents')).toBeTruthy()
  })
})
