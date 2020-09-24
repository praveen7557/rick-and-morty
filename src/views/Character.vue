<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else-if="!error && character">
      <div class="character page-character">
        <div class="image">
          <img :src="character.image" :alt="character.name" />
        </div>
        <div class="character-details">
          <div class="name">{{ character.name }}</div>
          <div class="status">
            <span :class="`status-icon ${character.className}`"></span>
            {{ character.status }} - {{ character.species }}
          </div>
          <div class="location MT10">Location - {{ character.location.name }}</div>
          <div class="location MT10">Origin - {{ character.origin.name }}</div>
          <div class="gender MT10">Male</div>
        </div>
      </div>
      <div class="episodes-list">
        <h3>Episodes List</h3>
        <ol>
          <li class="episode-name" v-for="episode in episodes" :key="episode.id">
            {{ episode.name }}
          </li>
        </ol>
      </div>
    </div>
    <div class="character-error error" v-else>There was a problem while fetching character</div>
    <router-link to="/" class="go-to">Go to Locations</router-link>
  </div>
</template>

<script>
import { fetchCharacter, fetchEpisode } from '@/api/characters'
export default {
  name: 'Character',
  mounted() {
    this.getCharacter()
  },
  data() {
    return {
      character: null,
      loading: false,
      episodes: [],
      error: false
    }
  },
  methods: {
    async getCharacter() {
      try {
        this.loading = true
        const res = await fetchCharacter(this.$route.params.id)
        const className = res.data.status.toLowerCase()
        this.character = {
          ...res.data,
          className
        }
        this.getEpisodes(res.data.episode)
      } catch (error) {
        console.log(error)
        this.error = true
      } finally {
        this.loading = false
      }
    },
    async getEpisodes(episodes) {
      const res = await Promise.all(episodes.map(e => fetchEpisode(e)))
      this.episodes = res.map(e => e.data)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/character.scss';
.page-character {
  .image {
    width: 200px;
    height: 200px;
  }
  .character-details {
    padding-left: 20px;

    .name {
      font-weight: 700;
    }
  }
  .status-icon {
    height: 10px;
    width: 10px;
    display: inline-block;
    border-radius: 100%;

    &.alive {
      background-color: #07b107;
    }
    &.dead {
      background-color: #e20d0d;
    }
    &.unknown {
      background-color: grey;
    }
  }
  .MT10 {
    margin-top: 10px;
  }
}
.episodes-list {
  margin-top: 40px;

  .episode-name {
    margin-bottom: 10px;
  }
}
.go-to {
  margin-top: 20px;
  display: inline-block;
}
</style>
