<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{ $t('website.content.navigationentry.info') }}</v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row class="px-4">
        <v-col cols="12">
          <v-text-field
            v-model="model.title"
            :error-messages="$v('title', 'website.content.navigationentry.title')"
            :label="$t('website.content.navigationentry.title')"
          />

          <v-text-field
            :value="type"
            :label="$t('website.content.navigationentry.type')"
            disabled
          />

          <v-text-field
            v-model="model.slug"
            :error-messages="$v('slug', 'page.slug')"
            :label="$t('website.content.navigationentry.slug')"
          />

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

    </v-expansion-panel-content>
  </v-expansion-panel>
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
    },
    type () {
      if (!this.model || !this.model.content) {
        return ''
      }

      const type = this.model.content.__typename

      return this.$t(`website.content.new.${type.toLowerCase()}.title`)
    }
  }
})
</script>
