<template>
  <v-card>
    <v-card-title>
      <add-button
        @contentModified="contentModified"
      />
      <div class="flex-grow-1" />
    </v-card-title>

    <v-subheader>{{ $t('website.content.mainNavigation') }}</v-subheader>

    <v-list>
      <draggable
        v-model="navigationentries"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <list-entry
            v-for="navigationentry in navigationentries"
            :key="navigationentry.id"
            :navigationentry="navigationentry"
            @contentModified="contentModified"
          />
        </transition-group>
      </draggable>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import addButton from './-index/addButton.vue'
import listEntry from './-index/list/entry.vue'
import NAVIGATIONENTRIES from '~/graphql/queries/navigationentries.graphql'

export default Vue.extend({
  components: {
    addButton,
    draggable,
    listEntry
  },

  data: () => ({
    navigationentries: [],
    drag: false
  }),

  apollo: {
    navigationentries: {
      query: NAVIGATIONENTRIES
    }
  },

  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  methods: {
    editContent (content: {id: Number}) {
      this.$router.push(`/website/content/${content.id}`)
    },

    contentModified () {
      this.$apollo.queries.navigationentries.refetch()
    }
  }
})
</script>

<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

</style>
