<template>

  <el-dialog :visible.sync="modals.listingModal" animation="zoom" width="700" height="600" :before-close="clearModals">

    <!-- Modal body -->
    {{ listing.title }}

  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'listing-modal',
  computed: {
    ...mapGetters([
      'modals',
      'listingModalItem',
    ]),
    ...mapGetters({
      listing: 'listingModalItem',
    }),
  },
  methods: {
    ...mapActions([
      'clearModals',
    ]),
  }
}
</script>

<style lang="scss">
</style>
