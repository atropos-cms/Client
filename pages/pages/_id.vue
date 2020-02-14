<template>
  <v-form ref="form">
    <v-row>
      <v-col>
        <div class="title">
          {{ page.title }}
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
          :loading="$apollo.queries.page.loading"
          class="px-4 pt-4 mb-4"
        >
          <general
            :value="page"
            :loading="$apollo.queries.page.loading"
          />
        </v-card>
        <v-card class="pa-4">
          <content-editor
            v-model="page"
          />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <info
          :value="page"
          :loading="$apollo.queries.page.loading"
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
import PAGE from '~/graphql/queries/page.graphql'
import UPDATE_PAGE from '~/graphql/mutations/updatePage.graphql'
import { Page } from '~/typescript/graphql'

export default mixins(savesModels).extend({
  components: {
    ContentEditor,
    General,
    Info
  },

  data: () => ({
    page: {} as Page
  }),

  apollo: {
    page: {
      query: PAGE,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },

  methods: {
    submit () {
      this.saveModel(UPDATE_PAGE, {
        id: this.page.id,
        data: {
          title: this.page.title,
          slug: this.page.slug,
          published: this.page.published,
          content: this.page.content
        }
      }, {
        query: PAGE,
        variables: { id: this.page.id },
        callback: (store, data) => ({ page: { ...store.page, ...data.updatePage } })
      })
    }
  }
})
</script>
