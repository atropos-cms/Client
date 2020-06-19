<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="model.title"
          :error-messages="$v('title', 'website.content.navigationentry.title')"
          :label="$t('website.content.navigationentry.title')"
          autofocus
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  created () {
    this.model = {
      title: ''
    }
  }
})
</script>
