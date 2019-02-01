<template>

  <el-dialog :visible.sync="modals.listingModal" 
    animation="zoom" 
    width="90%" 
    height="90%" 
    :before-close="clearModals" 
    class="listing-modal">

    <!-- Modal body -->
        <el-row>
          <el-col :span="24" class="image-container">
            <!-- <div class="image-container"> -->
                <img :src="listing.imageUrl" alt="Product" class="image"/>
                <p class="amount">N{{ listing.amount }}</p>
            <!-- </div> -->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18" class="title">
            {{ listing.title }}
          </el-col>
          <el-col :span="6" class="left">
            {{ listing.left }} left
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="description">
            {{ listing.description }}
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="quantity cursor-pointer">
            <div class="left-side" @click="decrementInCart(listing.id)">
            -
            </div>
            <div class="middle">
            Quantity {{ listing.count||0 }}
            </div>
            <div class="right-side" @click="addToCart(listing.id)">
            +
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <button class="btn btn-primary" @click="addToCart(listing.id)">Add to cart</button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <button @click="goToCheckout" class="btn btn-transparent">Checkout now</button>
          </el-col>
        </el-row>

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
