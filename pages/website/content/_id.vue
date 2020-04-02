<template>
  <v-form ref="form">
    <v-row>
      <v-col>
        <div class="title">
          {{ content.title }}
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
        md="8"
      >
        <v-card
          :loading="$apollo.queries.content.loading"
          class="px-4 pt-4 mb-4"
        >
          <general
            :value="content"
            :loading="$apollo.queries.content.loading"
          />
        </v-card>
        <v-card class="pa-4">
          <content-editor
            v-model="content"
          />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <info
          :value="content"
          :loading="$apollo.queries.content.loading"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import ContentEditor from './-id/content.vue'
import General from './-id/general.vue'
import Info from './-id/info.vue'
import savesModels from '~/mixins/savesModels.ts'
import NAVIGATIONENTRY from '~/graphql/queries/navigationentry.graphql'
import UPDATE_NAVIGATIONENTRY from '~/graphql/mutations/updateNavigationentry.graphql'
import { Navigationentry } from '~/typescript/graphql'

export default mixins(savesModels).extend({
  components: {
    ContentEditor,
    General,
    Info
  },

  data: () => ({
    navigationentry: {} as Navigationentry
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
    submit () {
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
