<template>

  <el-dialog :visible.sync="modals.listingModal" 
    animation="zoom"
    :before-close="clearModals" 
    class="listing-modal">

    <!-- Modal body -->
        <!-- <el-row>
          <el-col :span="24" class="image-container"> -->
            <!-- <div class="image-container"> -->
            <img :src="listing.imageUrl" alt="Product" class="image"/>
            <p class="amount">N{{ listing.amount }}</p>
            <!-- </div> -->
          <!-- </el-col>
        </el-row> -->


        <!-- <el-row>
          <el-col :span="18" class="title"> -->
          <div class="title">
            {{ listing.title }}
          </div>
          <!-- </el-col> -->
          <!-- <el-col :span="6" class="left"> -->
          <div class="left-in-cart">
            {{ listing.left }} left
          </div>
          <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24" class="description"> -->
          <div class="description">
            {{ listing.description }}
          </div>
          <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24" class="quantity cursor-pointer"> -->
          <div class="quantity cursor-pointer">
            <div class="left-side" @click="decrementInCart(listing.id)">
            -
            </div>
            <div class="middle">
            Quantity {{ listing.count||0 }}
            </div>
            <div class="right-side" @click="addToCart(listing.id)">
            +
            </div>
          </div>
          <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24"> -->
          <button class="btn btn-primary" @click="addToCart(listing.id)">Add to cart</button>
          <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24"> -->
          <button @click="goToCheckout" class="btn btn-transparent">Checkout now</button>
          <!-- </el-col>
        </el-row> -->

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
