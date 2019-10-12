<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-text-field
        v-model="model.title"
        :error-messages="$v('title', 'page.title')"
        :label="$t('page.title')"
      />
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-text-field
        v-model="model.slug"
        :error-messages="$v('slug', 'page.slug')"
        :label="$t('page.slug')"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
})
</script>
