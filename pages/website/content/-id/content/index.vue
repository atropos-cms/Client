<template>
  <div
    v-if="renderContent"
  >
    <component
      :is="componentType"
      ref="contentComponent"
      v-model="model"
    />
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from './page.vue'
import isForm from '~/mixins/isForm.ts'

export default mixins(isForm).extend({
  components: {
    Page
  },

  computed: {
    componentType () : string {
      return this.model && this.model.content && this.model.content.__typename
    },
    renderContent () : boolean {
      return !!this.componentType && !!this.model.content.id
    }
  },

  methods: {
    save () {
      this.$refs.contentComponent.save()
    }
  }
})
</script>
