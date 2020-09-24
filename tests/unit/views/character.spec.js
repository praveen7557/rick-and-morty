import Character from '@/views/Character.vue'
import { RouterLinkStub, mount } from '@vue/test-utils'
import mockAxios from 'axios'
import { character } from '../samples/character'
import flushPromises from 'flush-promises'
import { episode } from '../samples/episode'

const mocks = {
  $route: {
    params: {
      id: '1'
    }
  }
}

describe('Character View', () => {
  test('should call character API and episodes APIs', async () => {
    mockAxios
      .mockResolvedValueOnce({ data: character })
      .mockResolvedValueOnce({ data: episode })
      .mockResolvedValueOnce({ data: episode })
      .mockResolvedValueOnce({ data: episode })
    const wrapper = mount(Character, {
      stubs: {
        'router-link': RouterLinkStub
      },
      mocks
    })
    await flushPromises()
    expect(mockAxios).toBeCalledTimes(1 + character.episode.length)
    expect(wrapper.find('.status-icon').classes()).toContain('alive')
    expect(wrapper.findAll('.episode-name').length).toBe(character.episode.length)
    expect(
      wrapper
        .findAll('.episode-name')
        .at(0)
        .text()
    ).toBe(episode.name)
  })

  test('should show error when character API fails', async () => {
    mockAxios.mockRejectedValue()
    const wrapper = mount(Character, {
      stubs: {
        'router-link': RouterLinkStub
      },
      mocks
    })
    await flushPromises()
    expect(wrapper.find('.character-error')).toBeTruthy()
  })
})
