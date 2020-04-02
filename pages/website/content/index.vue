<template>
  <v-card>
    <v-card-title>
      <add-button />
      <div class="flex-grow-1" />
    </v-card-title>

    <v-list>
      <draggable
        v-model="navigationentries"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <template
            v-for="content in navigationentries"
          >
            <v-hover
              :key="content.id"
              v-slot:default="{ hover }"
            >
              <div>
                <v-list-item
                  @click="editContent(content)"
                >
                  <v-list-item-icon>
                    <v-icon
                      :class="{ 'grey--text lighten-1': hover }"
                      color="transparent"
                    >
                      drag_indicator
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="content.title" />
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-btn
                      icon
                      @click.stop="editContent(content)"
                    >
                      <v-icon
                        :class="{ 'grey--text lighten-1': hover }"
                        color="transparent"
                      >
                        edit
                      </v-icon>
                    </v-btn>
                  </v-list-item-icon>
                  <v-list-item-icon>
                    <v-btn
                      icon
                      @click.stop="editContent(content)"
                    >
                      <v-icon
                        :class="{ 'grey--text lighten-1': hover }"
                        color="transparent"
                      >
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider />
              </div>
            </v-hover>
          </template>
        </transition-group>
      </draggable>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import addButton from './-index/addButton.vue'
import NAVIGATIONENTRIES from '~/graphql/queries/navigationentries.graphql'

export default Vue.extend({
  components: {
    addButton,
    draggable
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
      this.$router.push(`/navigationentries/${content.id}`)
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
