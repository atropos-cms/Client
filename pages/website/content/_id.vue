<template>
  <v-form ref="form">
    <v-row>
      <v-col>
        <div class="title">
          {{ navigationentry.title }}
        </div>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          :loading="saving"
          @click="submit"
        >
          {{ $t('general.save') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-expansion-panels class="mb-4">
          <info
            :value="navigationentry"
            :loading="$apollo.queries.navigationentry.loading"
          />
        </v-expansion-panels>

        <v-card
          outlined
          class="pa-4"
          :loading="$apollo.queries.navigationentry.loading"
        >
          <content-index
            ref="contentComponent"
            v-model="navigationentry"
            @registerOnSaveHandler="registerOnSaveHandler"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import ContentIndex from './-id/content/index.vue'
import Info from './-id/info.vue'
import savesModels from '~/mixins/savesModels.ts'
import NAVIGATIONENTRY from '~/graphql/queries/navigationentry.graphql'
import UPDATE_NAVIGATIONENTRY from '~/graphql/mutations/updateNavigationentry.graphql'
import { Navigationentry } from '~/typescript/graphql'

export default mixins(savesModels).extend({
  components: {
    ContentIndex,
    Info
  },

  data: () => ({
    navigationentry: {} as Navigationentry,
    onSaveHandlers: [] as (() => void)[]
  }),

  apollo: {
    navigationentry: {
      query: NAVIGATIONENTRY,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },

  methods: {
    registerOnSaveHandler ({ handler }: { handler: () => void }) {
      this.onSaveHandlers.push(handler)
    },
    submit () {
      this.onSaveHandlers.forEach(callback => callback())

      this.saveModel(UPDATE_NAVIGATIONENTRY, {
        id: this.navigationentry.id,
        data: {
          title: this.navigationentry.title,
          slug: this.navigationentry.slug,
          published: this.navigationentry.published
        }
      }, {
        query: NAVIGATIONENTRY,
        variables: { id: this.navigationentry.id },
        callback: (store, data) => ({ navigationentry: { ...store.navigationentry, ...data.updatePage } })
      })
    }
  }
})
</script>
