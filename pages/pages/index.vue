<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-end">
        <v-btn color="primary">
          <v-icon>add</v-icon>
          {{ $t('page.createNewPage') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-list>
        <draggable
          v-model="pages"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <template
              v-for="page in pages"
            >
              <v-hover
                :key="page.id"
                v-slot:default="{ hover }"
              >
                <div>
                  <v-list-item
                    @click="editPage(page)"
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
                      <v-list-item-title v-text="page.title" />
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn
                        icon
                        @click.stop="editPage(page)"
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
                        @click.stop="editPage(page)"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import PAGES from '~/graphql/queries/pages.graphql'

export default Vue.extend({
  components: {
    draggable
  },

  data: () => ({
    pages: [],
    drag: false
  }),

  apollo: {
    pages: {
      query: PAGES
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
    editPage (page: {id: Number}) {
      this.$router.push(`/pages/${page.id}`)
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
