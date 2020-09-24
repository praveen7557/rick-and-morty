import Character from '@/components/Character.vue'
import { RouterLinkStub, mount } from '@vue/test-utils'
import { character } from '../samples/character'

describe('Character Item component', () => {
  test('should show correct character name', () => {
    const wrapper = mount(Character, {
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: {
        character
      }
    })

    expect(wrapper.find('.name').text()).toBe(character.name)
    expect(wrapper.find('.status').text()).toBe(`${character.status} - ${character.species}`)
  })
})
