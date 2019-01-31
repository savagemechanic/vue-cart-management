import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

function getIndexById (items, itemId) {
  let itemIds = items.map((item) => item.id)
  return itemIds.indexOf(itemId)
}

export default new Vuex.Store({
  state: {
    cart: {
      products: [],
    },
    listings: {
      products: [],
      loading: false,
      moreLoading: false,
      perPage: 1
    },
    modals: {
      listingModal: false,
    },
    listingModalItem: {}
  },
  getters: {
    cart: state => state.cart,
    cartTotal: state => {
      if (state.cart.products.length)
        return state.cart.products.reduce((accumulator, currentValue) => accumulator.amount + currentValue.amount)
      return 0
    },
    listings: state => state.listings,
    modals: state => state.modals,
    listingModalItem: state => state.listingModalItem,
  },
  mutations: {
    clearModals (state) {
      state.modals.listingModal = false
    },
    openListingModal (state, product) {
      state.modals.listingModal = true
      state.listingModalItem = product || {}
    },
    setProducts (state, products) {
      let currentProducts = state.listings.products
      if (products.length !== currentProducts.length) {
        let offset = currentProducts.length == 0 ? 0 : currentProducts.length - 1
        let maxIndex = offset + state.listings.perPage

        currentProducts.push.apply(currentProducts, products.slice(offset, maxIndex) || [])
      }
    },
    setProductsLoading (state, value) {
      state.listings.loading = value
    },
    setMoreProductsLoading (state, value) {
      state.listings.moreLoading = value
    },
    addToCart (state, productId) {
      let productIndex = getIndexById(state.listings.products, productId)
      let product = state.listings.products[productIndex]

      let cartProductIndex = getIndexById(state.cart.products, productId)

      if (!cartProductIndex) {
        state.cart.products.push(product) // if product is not in cart
      }
      else {
        if (!state.cart.products[cartProductIndex].count)
          state.cart.products[cartProductIndex].count = 1
        else
          state.cart.products[cartProductIndex].count++
      }
    },
    removeFromCart (state, productId) {
      let cartProductIndex = getIndexById(state.cart.products, productId)
      let cartProduct = state.cart.products[cartProductIndex]

      if (cartProductIndex) {
        // if product is in cart
        if (cartProduct.count && cartProduct.count <= 1)
          state.cart.products.splice(cartProductIndex, 1) // delete from cart
        else
          state.cart.products[cartProductIndex].count-- // reduce number in cart
      }

    }
  },
  actions: {
    clearModals ({ commit }) {
      commit('clearModals')
    },
    openListingModal ({ commit }, product) {
      commit('openListingModal', product)
    },
    fetchProducts ({ commit }) {
      commit('setProductsLoading', true)
      axios.get('./listings.json')
      .then(function (response) {
        // handle success
        console.log(response);
        commit('setProducts', response.data.listings)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        commit('setProductsLoading', false)
      });
    },
    loadMoreProducts ({commit}) {
      commit('setMoreProductsLoading', true)
      axios.get('./listings.json')
      .then(function (response) {
        // handle success
        console.log(response);
        commit('setProducts', response.data.listings)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        commit('setMoreProductsLoading', false)
      });
    },
    addToCart ({ commit }, productId) {
      commit('addToCart', productId)
    },
    removeFromCart ({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    incrementInCart ({ commit }, productId) {
      commit('addToCart', productId)
    },
    decrementInCart ({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    checkoutCart ({ commit }) {

    }

  }
})
