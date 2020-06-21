<template>
  <div class="d-flex flex-column">

    <v-img
      class="my-16"
      height="200px"
      contain
      :src="errorType.img"
    />
    <h1 class="text-h4 text-md-h2 text-center">
      {{ errorType.title }}
    </h1>

    <div class="mt-6 text-center">
      <NuxtLink to="/">
        {{ $t('error.homePage') }}
      </NuxtLink>
    </div>

    <v-card
      v-if="message"
      outlined
      class="mt-16"
    >
      <v-card-text>
        {{ message }}
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: {
        title: this.$t('error.messages.pageNotFound'),
        img: require('~/static/svgs/undraw_page_not_found_su7k.svg')
      },
      otherError: {
        title: this.$t('error.messages.otherError'),
        img: require('~/static/svgs/undraw_server_down_s4lk.svg')
      }
    }
  },
  computed: {
    errorType () {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    },
    message () {
      if (this.error.statusCode !== 404) {
        return this.error.message
      }

      return null
    }
  },
  head () {
    const { title } = this.errorType

    return { title }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
