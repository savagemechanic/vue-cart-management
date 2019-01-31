<template>
  <div class="listings">
    <el-row>
      <el-col :span="24" class="header">
          <div class="title">
            TIGERNUT MILK
          </div>
          <router-link class="icon shopping-cart" to="cart">
          </router-link>
      </el-col>
    </el-row>

    <div class="content">
      <el-row class="description">
        <el-col :span="24">
          Tamcherie Foods Nigeria 🇳🇬 100% Organic 🌐 Available Flavours include: 
          Ginger 💛 Cinnamon ❤ Coconut💚 Unsweetened 💙 Made fresh daily. 
          Order on Whatsapp/DM 📞(+234) 805 618 2583
        </el-col>
      </el-row>
      
      <div class="listings-bg">
        <loading v-if="listings.loading"/>
      <div v-else class="listing-container" 
          v-for="(product, index) in listings.products" 
          :key="index">
        <el-row>

          <el-col :span="24" class="item">
          <div class="image-container"
        @click="openListingModal(product)">
            <!-- <div class="image-container"> -->
                <img :src="product.imageUrl" alt="Product" class="image"/>
                <p class="amount">N{{ product.amount }}</p>
            </div>
          </el-col>
        </el-row>

            <el-row class="details">
              <el-col :span="18">
                <div class="title">
                {{ product.title }}
                </div>
              <div class="description">
                {{ product.description }}
              </div>
              </el-col>
              <el-col :span="6" class="left">
                <button @click="handleCart(product)"
                  class="btn btn-secondary">
                  {{ cartButtonText(product) }}
                </button>
              </el-col>
            </el-row>

            <!-- <el-row>
            </el-row> -->

        </div>
      </div>
        <loading v-if="listings.moreLoading"/>
        <div v-else @click="loadMoreProducts">Load More...</div>
    </div>
    
    <listing-modal/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListingModal from '@/components/ListingModal.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'home',
  components: {
    ListingModal,
    Loading
  },
  data () {
    return {
    }
  },
  mounted () {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters([
        'listings',
    ]),
  },
  methods: {
    ...mapActions([
      'openListingModal',
      'fetchProducts',
      'loadMoreProducts',
      'removeFromCart',
      'addToCart',
    ]),

    cartButtonText (product) {
      if (product.count) {
        return 'Remove from cart'
      } else {
        return 'Add to cart'
      }
    },

    handleCart (product) {
      if (product.count) {
        this.removeFromCart(product.id)
      } else {
        this.addToCart(product.id)
      }

    }
  }
}
</script>
