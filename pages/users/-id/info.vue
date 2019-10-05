<template>
  <v-card>
    <div class="d-flex flex-md-column pa-4">
      <div class="d-flex justify-center">
        <v-avatar
          :size="$vuetify.breakpoint.lgAndUp ? 196 : 96"
          color="blue-grey lighten-5"
        >
          <img
            v-if="img"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
            alt="avatar"
          >
          <span v-else>{{ model.initials }}</span>
        </v-avatar>
      </div>
      <div class="ml-4 ml-md-0 mt-md-4">
        <div class="title">
          {{ model.first_name }} {{ model.last_name }}
        </div>
        <div>{{ model.email }}</div>
        <div class="mt-6 caption blue-grey--text">
          {{ $t('user.loginAt', { date: loginAt }) }}
        </div>
        <div class="caption blue-grey--text">
          {{ $t('general.createdAt', { date: createdAt }) }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import dayjs from '~/utils/dayjs'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  data: () => ({
    img: false
  }),

  computed: {
    loginAt () {
      if (!this.model.login_at) { return null }
      return dayjs(this.model.login_at).fromNow()
    },
    createdAt () {
      if (!this.model.created_at) { return null }
      return dayjs(this.model.created_at).format('LL')
    }
  }
})
</script>
