<template>
  <div class="listings listing-grid">
    <div class="header">
        <div class="title">
          TIGERNUT MILK
        </div>
        <router-link to="cart" class="icon shopping-cart">
        </router-link>
        <router-link to="cart" class="web-only cart-text">Cart</router-link>
        <router-link to="cart" class="mobile-only cart-notify">
          <p>{{ cartProducts.length }}</p>
        </router-link>
    </div>

    <div class="description">
        Tamcherie Foods Nigeria 🇳🇬 100% Organic 🌐 Available Flavours include: 
        Ginger 💛 Cinnamon ❤ Coconut💚 Unsweetened 💙 Made fresh daily. 
        Order on Whatsapp/DM 📞(+234) 805 618 2583
    </div>
      

    <div class="content">
      <div class="listings-container">
        <!-- <div class="start-edge"></div> -->

        <loading v-if="listings.loading"/>
        <div v-else class="listing-container cursor-pointer" :class="index"
            v-for="(product, index) in listings.products" 
            :key="index">
            
              <!-- <div class="image-container cursor-pointer" -->
            <!-- > -->
              <!-- <div class="image-container"> -->
                  <div class="overlay web-only"
                    @click="openListingModal(product)">
                  </div>
                  <img :src="product.imageUrl" alt="Product" class="image"
                    @click="openListingModal(product)"/>
                  <p class="amount">N{{ product.amount }}</p>
              <!-- </div> -->

              <!-- <div class="details"> -->
                <!-- <el-col :span="18"> -->
                  <div class="title">
                  {{ product.title }}
                  </div>
                <div class="description">
                  {{ product.description }}
                </div>
                <!-- </el-col> -->
                <!-- <el-col :span="6" class="left"> -->
                <button @click="handleCart(product)"
                  class="btn btn-secondary">
                  {{ cartButtonText(product) }}
                </button>
                <!-- </el-col> -->
              <!-- </div> -->

              <!-- <el-row>
              </el-row> -->

          <!-- </div> -->
        </div>

        <loading v-if="listings.moreLoading"/>
        <div v-else @click="loadMoreProducts" class="midline load-more">See more</div>

        <div class="line left web-only"></div>
        <div class="follow midline web-only">Follow us on instagram</div>
        <div class="line right web-only"></div>
    
    <listing-modal/>
        
    </div>
    </div>
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
      'cartProducts',
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
