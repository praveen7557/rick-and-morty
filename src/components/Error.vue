<template>
  <div class="error-container" v-if="error">{{ error }}</div>
</template>

<script>
import EventBus from '@/utils/event-bus'
export default {
  name: 'Error',
  mounted() {
    EventBus.$on('error-occured', error => {
      this.error = error
    })
  },
  data() {
    return {
      error: null
    }
  }
}
</script>

<style>
.error-container {
  position: absolute;
  width: 300px;
  background-color: #b51313;
  color: #fff;
  right: 30px;
  top: 30px;
  padding: 10px 20px;
  border-radius: 3px;
  font-weight: 500;
}
</style>
