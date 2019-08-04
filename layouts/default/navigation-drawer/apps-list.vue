<template>
  <v-list dense nav>
    <template
      v-for="item in items"
      >

      <v-list-item
        :key="item.title"
        @click="() => {}"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
      <v-divider
        v-if="item.divider"
        :key="item.title"
      />
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LayoutDefaultSidebar extends Vue {
  items = [
    {
      title: "Home",
      icon: "dashboard",
      divider: true,
    },
    {
      title: "About",
      icon: "question_answer"
    }
  ]
}
</script>
