<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ $t('collaboration.files.workspaceInfo') }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-subheader>Used Storage</v-subheader>
      <v-sparkline
        :value="storage"
        height="100"
        padding="24"
        stroke-linecap="round"
        smooth
      >
        <template v-slot:label="item">
          {{ item.value }} MB
        </template>
      </v-sparkline>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import isForm from '~/mixins/isClonedForm.ts'

export default mixins(isForm).extend({
  data: () => ({
    storage: [
      423,
      446,
      675,
      510,
      590,
      610,
      760
    ]
  })
})
</script>
