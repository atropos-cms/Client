<template>
  <div>
    <v-select
      v-model="model.recippients"
      :items="items"
      dense
      multiple
      chips
      :error-messages="$v('recippients', 'account.recippients')"
      :label="$t('collaboration.messages.recippients')"
    />

    <v-text-field
      v-model="model.subject"
      dense
      :error-messages="$v('subject', 'account.subject')"
      :label="$t('collaboration.messages.subject')"
    />

    <v-textarea
      v-model="model.body"
      auto-grow
      :rows="10"
    />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  })
})
</script>
