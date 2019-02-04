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
      
    <div class="listings-background">
    </div>

    <div class="content">
      <loading v-if="listings.loading" class="midline"/>
      <div v-else class="listing-container cursor-pointer" :class="index"
          v-for="(product, index) in listings.products" 
          :key="index">
          
        <div class="overlay web-only"
          @click="openListingModal(product)">
        </div>
        <img :src="product.imageUrl" alt="Product" class="image"
          @click="openListingModal(product)"/>
        <p class="amount">N{{ product.amount|savageprice }}</p>
        
        <div class="title">
          {{ product.title }}
        </div>
        <div class="description">
          {{ product.description }}
        </div>
        
        <button @click="handleCart(product.id)"
          class="btn btn-secondary">
          {{  isInCart(product.id) ? 'Remove from cart' : 'Add to cart'  }}
        </button>
      </div>

      <div @click="loadMoreProducts" class="midline load-more">
        <loading v-if="listings.moreLoading"/>
        <p v-else>See more</p>
      </div>

      <div class="line left web-only"></div>
      <div class="follow midline web-only">Follow us on instagram</div>
      <div class="line right web-only"></div>
  
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
  mounted () {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters([
      'listings',
      'cartProducts',
      'isInCart',
    ]),
  },
  methods: {
    ...mapActions([
      'openListingModal',
      'fetchProducts',
      'loadMoreProducts',
      'decrementInCart',
      'addToCart',
    ]),

    handleCart (productId) {
      if (this.isInCart(productId)) {
        this.decrementInCart(productId)
      } else {
        this.addToCart({
          productId: productId
        })
      }
    }
  }
}
</script>
