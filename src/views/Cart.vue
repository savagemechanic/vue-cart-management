<template>
  <div class="cart">
    <el-row>
      <el-col :span="24" class="header cart-header">
          <div class="title default-font">
            Your Cart
          </div>
      </el-col>
    </el-row>

    <div class="content">
      <el-row class="item" v-for="(product, index) in cart.products" :key="index">
        <el-col :span="4">
            <img class="image" src="@/assets/logo.png" alt="">
        </el-col>
        <el-col :span="16">
            <div class="title">
              {{ product.title }}
            </div>

            <div class="description">
              {{ product.description }}
            </div>

            <div class="amount">
              N{{ product.amount }}
            </div>
        </el-col>
        <el-col :span="4">
            <div>
              <i class="icon">-</i>
              {{ product.count }}
              <i class="icon">+</i>
            </div>
            <div>Remove</div>
        </el-col>
      </el-row>

      <el-row class="total">
        <el-col :span="12">
          Total
        </el-col>
        <el-col :span="12">
          N{{ cartTotal }}
        </el-col>
      </el-row>

      <el-row class="continue-shopping center-text">
        <el-col :span="24">
          <router-link to="/">Continue Shopping</router-link>
        </el-col>
      </el-row>

      <el-row class="checkout center-text">
        <el-col :span="24">
          <button class="btn btn-primary">CHECKOUT</button>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
        'cart',
        'cartTotal',
    ]),
  },
}
</script>
