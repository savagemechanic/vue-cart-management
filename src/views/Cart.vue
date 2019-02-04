<template>
  <div class="cart">
    <div class="header">
      <div class="title">
        Your Cart
      </div>
    </div>

    <div class="content">
      <div class="cart-top">
        <banner v-if="checkoutMessage">
          {{ checkoutMessage }}
        </banner>

        <div class="item" v-for="(product, index) in cartProducts" :key="index">
          <div class="image-meta">
            <img class="image" :src="product.imageUrl" alt="">
            
            <div class="meta">
              <div class="title">
                {{ product.title }}
              </div>

              <div class="description">
                {{ product.description }}
              </div>

              <div class="amount">
                N{{ product.amount | savageprice }}
              </div>
            </div>
          </div>
          
          <div class="actions">
            <div class="counter">
              <i class="icon minus" @click="decrementInCart(product.id)">-</i>
              {{ product.count }}
              <i class="icon plus" @click="addToCart({productId: product.id})">+</i>
            </div>
            <div class="remove" @click="removeFromCart(product.id)">Remove</div>
          </div>
        </div>

        <div class="total">
          <div class="title">
            Total
          </div>
          <div class="amount">
            N {{ cartTotal | savageprice }}
          </div>
        </div>
      </div>

      <div class="center-text">
        <div>
          <router-link to="/" class="continue-shopping">Continue shopping</router-link>
        </div>
      </div>

      <div class="checkout center-text">
        <button class="btn btn-primary checkout" @click="checkoutCart">
          CHECKOUT
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Banner from "@/components/Banner.vue";

export default {
  name: 'cart',
  components: {
    Banner
  },
  computed: {
    ...mapGetters([
      'cart',
      'cartProducts',
      'cartTotal',
      'checkoutMessage',
    ]),
  },
  methods: {
    ...mapActions([
      'checkoutCart',
      'decrementInCart',
      'removeFromCart',
      'addToCart',
    ]),
  }
}
</script>
