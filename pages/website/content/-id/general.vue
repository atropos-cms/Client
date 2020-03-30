<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-text-field
        v-model="model.title"
        :error-messages="$v('title', 'page.title')"
        :label="$t('page.title')"
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
