<template>
  <v-card>
    <v-card-title>
      {{ $t('website.content.navigationentry.info') }}
    </v-card-title>

    <v-row class="pa-4">
      <v-col cols="12">
        <v-text-field
          v-model="model.slug"
          :error-messages="$v('slug', 'page.slug')"
          :label="$t('website.content.navigationentry.slug')"
        />
      </v-col>

      <v-col cols="12">
        <v-switch
          v-model="model.published"
          :label="$t('website.content.navigationentry.published')"
          inset
        />
      </v-col>
    </v-row>

    <v-divider />

    <div class="pa-4">
      <div class="caption muted--text">
        {{ $t('website.content.navigationentry.author', { ...model.author }) }}
      </div>
      <div
        v-if="updatedAt"
        class="caption muted--text"
      >
        {{ $t('general.updatedAt', { date: updatedAt }) }}
      </div>
      <div class="caption muted--text">
        {{ $t('general.createdAt', { date: createdAt }) }}
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import dayjs from '~/utils/dayjs'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  computed: {
    createdAt () {
      if (!this.model.createdAt) { return null }
      return dayjs(this.model.createdAt).format('LL')
    },
    updatedAt () {
      if (!this.model.updatedAt) { return null }
      return dayjs(this.model.updatedAt).format('LL')
    }
  }
})
</script>
