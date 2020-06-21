<template>
  <div>
    <toolheader>
      <v-btn
        absolute
        dark
        fab
        color="pink"
        @click="openCompose"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </toolheader>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item
          :key="item.title"
          :class="{'primary--text v-list-item--active': item.unread}"
          @click="openItem"
        >
          <v-list-item-content>
            <v-list-item-title v-html="item.title" />
            <v-list-item-subtitle v-html="item.subtitle" />
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text v-text="item.date" />
          </v-list-item-action>
        </v-list-item>

        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
        />
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import compose from './-modals/compose.vue'
import { Preset, Width } from '~/components/dialogs/isDialog'

export default Vue.extend({
  data: () => ({
    selected: [2],
    items: [
      {
        title: 'Brunch this weekend?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        date: '10. Jun',
        unread: true
      },
      {
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        date: '10. Jun',
        unread: true
      },
      {
        title: 'Oui oui',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        date: '10. Jun',
        unread: false
      },
      {
        title: 'Birthday gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        date: '10. Jun',
        unread: false
      },
      {
        title: 'Recipe to try',
        subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        date: '10. Jun',
        unread: false
      }
    ]
  }),
  methods: {
    openItem () {
    },
    async openCompose () {
      await this.$dialog({
        title: this.$t('collaboration.messages.compose'),
        component: compose,
        preset: Preset.Ok,
        confirmButton: {
          text: 'collaboration.messages.send',
          solid: true
        },
        options: {
          width: Width.Large
        },
        action: model => console.log(model)
      })
    }
  }
})
</script>
