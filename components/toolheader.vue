<template>
    <div
        class="mb-6 d-flex flex-column justify-space-between"
        style="height: 4.5rem;"
    >
        <div/>
        <div class="d-flex align-center">
            <slot />
        </div>

        <v-divider/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>
