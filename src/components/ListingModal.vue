<template>

  <el-dialog :visible.sync="modals.listingModal" 
    animation="zoom"
    :before-close="clearModals">

    <!-- Modal body -->
    <div class="listing-modal">
      <img :src="listing.imageUrl" alt="Product" class="image"/>
      <p class="amount">N{{ listing.amount|savageprice }}</p>

      <div class="title">
        {{ listing.title }}
      </div>
      
      <div class="left-in-cart">
        {{ listing.left }} left
      </div>
      
      <div class="description">
        {{ listing.description }}
      </div>
      
      <div class="quantity cursor-pointer">
        <div class="left-side" @click="decrementInCart(listing.id)">
        -
        </div>
        <div class="middle">
        QUANTITY {{ listing.count||0 }}
        </div>
        <div class="right-side" @click="addToCart(listing.id)">
        +
        </div>
      </div>
      
      <button class="btn btn-primary add-to-cart" @click="addToCart(listing.id)">ADD TO CART</button>

      <button @click="goToCheckout" class="btn btn-transparent btn-checkout">Checkout now</button>
    </div>

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
      'decrementInCart',
      'addToCart',
    ]),

    goToCheckout () {
      this.$router.push({
        name: 'cart'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
