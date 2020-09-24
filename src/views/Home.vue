<template>
  <div class="locations">
    <h3>Rick and Morty Locations</h3>
    <h3 v-if="loadingLocations">Loading Locations...</h3>
    <div class="details" v-else-if="!error">
      <div class="list">
        <div
          :class="`location ${selected === item.id ? 'active' : ''}`"
          v-for="item in locations"
          :key="`${item.id}-${item.name}`"
          @click="selectLocation(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div :class="residentsClass">
        <h3 v-if="loading">Loading...</h3>
        <h3 v-else-if="!location">Please select a location to see Residents</h3>
        <div class="location-info" v-else>
          <h3>Characters from {{ location.name }}</h3>
          <div v-if="!residentError">
            <div class="characters-list" v-if="location.characters.length">
              <Character
                :character="item"
                v-for="item in location.characters"
                :key="`${item.id}-${item.name}`"
              />
            </div>
            <h3 class="no-residents" v-else>No Residents</h3>
          </div>
          <div class="errors resident-error" v-else>There was an error fetching Residents</div>
        </div>
      </div>
    </div>
    <div class="error location-error" v-else>There was some problem while fetching locations</div>
  </div>
</template>

<script>
import { fetchLocations } from '@/api/locations'
import { fetchCharacter } from '@/api/characters'
import Character from '@/components/Character.vue'
export default {
  name: 'Home',
  components: {
    Character
  },
  mounted() {
    this.getLocations(1)
  },
  computed: {
    residentsClass() {
      return `residents ${!this.location?.characters?.length ? 'no-residents' : ''}`
    }
  },
  methods: {
    async getLocations(page) {
      try {
        if (!this.locations.length) this.loadingLocations = true
        const result = await fetchLocations(page)
        this.locations = [...this.locations, ...result.data.results]
        if (page !== result.data.info?.pages) {
          this.getLocations(page + 1)
        }
      } catch (error) {
        console.log(error)
        this.error = true
      } finally {
        this.loadingLocations = false
      }
    },
    async selectLocation(id) {
      try {
        this.selected = id
        let item = this.locations.find(e => e.id === id)
        this.loading = true
        this.location = {
          name: item.name
        }
        const res = await Promise.all(item.residents.map(e => fetchCharacter(e)))
        this.location = {
          ...this.location,
          characters: res.map(e => e.data)
        }
      } catch (error) {
        this.residentError = true
      } finally {
        this.loading = false
      }
    }
  },
  data() {
    return {
      locations: [],
      location: null,
      loading: false,
      selected: null,
      error: null,
      loadingLocations: false,
      residentError: false
    }
  }
}
</script>

<style lang="scss">
.locations {
  h3 {
    margin: 20px 0;
  }
  .details {
    display: flex;
    max-height: calc(100vh - 130px);
    .list {
      width: 25%;
      overflow-y: auto;
      border-right: 1px solid;
      .location {
        margin: 5px 0;
        font-weight: 500;
        cursor: pointer;
        &.active {
          color: green;
          font-weight: 700;
        }
      }
    }
    .residents {
      width: 75%;
      padding: 0 30px;
      overflow-y: auto;
      &.no-residents {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      h3 {
        margin-top: 0;
      }
      .location-info {
        .characters-list {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
}
.error {
  color: #bb0202;
}
</style>
