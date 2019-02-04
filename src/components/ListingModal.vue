<template>
  <el-dialog :visible.sync="modals.listingModal" 
    animation="zoom"
    :before-close="closeModal">

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
        <div class="left-side" @click="decrementCount">
        -
        </div>
        <div class="middle">
        QUANTITY {{ isInCart(listing.id) ? cartCount(listing.id) : listingCount }}
        </div>
        <div class="right-side" @click="incrementCount">
        +
        </div>
      </div>
      
      <button class="btn btn-primary add-to-cart" @click="handleCart(listing.id)">
        {{ isInCart(listing.id) ? 'REMOVE FROM CART' : 'ADD TO CART' }}
      </button>

      <button @click="goToCheckout" class="btn btn-transparent btn-checkout">Checkout now</button>
    </div>

  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'listing-modal',
  data () {
    return {
      listingCount: 1
    }
  },
  computed: {
    ...mapGetters([
      'modals',
      'listingModalItem',
      'isInCart',
      'cartCount',
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

    incrementCount () {
      this.listingCount++
    },

    decrementCount () {
      if (this.listingCount > 1)
        this.listingCount--
    },

    addToCartWithCount (listingId) {
      this.addToCart({
        productId: listingId, 
        count: this.listingCount
      })
    },

    handleCart (listingId) {
      if (this.isInCart(listingId)) {
        this.decrementInCart(listingId)
      } else {
        this.addToCartWithCount(listingId)
      }
    },

    closeModal () {
      this.listingCount = 1
      this.clearModals()
    },

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
