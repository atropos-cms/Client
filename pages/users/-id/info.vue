<template>
  <v-card>
    <div class="d-flex flex-md-column pa-4">
      <div class="d-flex justify-center align-center">
        <v-avatar
          :size="$vuetify.breakpoint.lgAndUp ? 196 : 96"
          color="blue-grey lighten-5"
        >
          <img
            v-if="img"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
            alt="avatar"
          >
          <span v-else class="display-2 grey--text text--darken-3">{{ model.initials }}</span>
        </v-avatar>
      </div>

      <div class="ml-4 ml-md-0 mt-md-4">
        <div>
          <div class="title">
            {{ model.firstName }} {{ model.lastName }}
          </div>
          <div>{{ model.email }}</div>
        </div>

        <div class="mt-2 mt-md-4">
          <v-chip
            v-for="role in model.roles"
            :key="role.id"
            label
            small
            class="mr-2"
          >
            {{ role.name }}
          </v-chip>
        </div>

        <div class="mt-2 mt-md-6">
          <div class="caption muted--text">
            {{ $t('user.loginAt', { date: loginAt }) }}
          </div>
          <div class="caption muted--text">
            {{ $t('general.createdAt', { date: createdAt }) }}
          </div>
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
      if (!this.model.loginAt) { return null }
      return dayjs(this.model.loginAt).fromNow()
    },
    createdAt () {
      if (!this.model.createdAt) { return null }
      return dayjs(this.model.createdAt).format('LL')
    }
  }
})
</script>
