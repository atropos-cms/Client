<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniDrawer"
    clipped
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    }
  },

  computed: {
    drawer: {
      get (): boolean {
        return this.$store.getters['ui/drawer']
      },
      set (value: boolean): void {
        this.$store.commit('ui/setDrawer', value)
      }
    },
    miniDrawer () : boolean {
      return this.$store.getters['ui/miniDrawer']
    }
  }

})
</script>
