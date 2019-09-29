<template>
  <v-container>
    <v-row>
      <v-col
        v-for="application in applications"
        :key="application.name"
        class="d-flex align-stretch"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <application :application="application" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Application from './-index/application.vue'
import usesApplications from '~/mixins/usesApplications.ts'

export default mixins(usesApplications).extend({
  components: {
    Application
  }
})
</script>
