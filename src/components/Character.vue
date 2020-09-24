<template>
  <router-link :to="`/character/${character.id}`" class="character-container">
    <div class="character">
      <div class="image">
        <img :src="character.image" :alt="character.name" />
      </div>
      <div class="character-details">
        <div class="name">{{ character.name }}</div>
        <div class="status">{{ character.status }} - {{ character.species }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Character',
  props: {
    character: Object
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/character.scss';
.character-container {
  width: 31%;
  border: 1px solid #000;
  margin-right: 10px;
  margin-bottom: 10px;
  color: initial;
  text-decoration: none;
}
</style>
