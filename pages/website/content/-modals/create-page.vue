<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="model.title"
          :error-messages="$v('name', 'role.name')"
          :label="$t('role.name')"
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
})
</script>
