<template>
  <div class="listings">
    <el-row>
      <el-col :span="24" class="header">
          <div class="title listing-font">
            TIGERNUT MILK
          </div>
          <router-link class="icon shopping-cart" to="cart">
            =
          </router-link>
      </el-col>
    </el-row>

    <div class="content">
      <el-row class="description">
        <el-col :span="24">
          Tamcherie Foods Nigeria 🇳🇬 100% Organic
          Available  Flavours include: Ginger Cinnamon Coconut 
          Unsweetened Made fresh daily.
          Order on Whatsapp/DM
        </el-col>
      </el-row>

      <loading v-if="listings.loading"/>
      <el-row v-else class="listing-container" 
        v-for="(product, index) in listings.products" 
        :key="index">
        <el-col :span="24" class="item"
        @click="openListingModal(product)">
          <div class="image-container">
            <div class="amount">
              <img src="@/assets/logo.png" alt="Product"/>
              N{{ product.amount }}
            </div>
          </div>
          <div class="title">
            {{ product.title }}
          </div>
          <div class="description">
            {{ product.description }}
          </div>
          <div class="btn btn-secondary">
            Add to cart
          </div>
        </el-col>
      </el-row>

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
      'loadMoreProducts'
    ]),
  }
}
</script>
