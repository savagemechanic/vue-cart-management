import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// helpers
let listingsUrl = process.env.NODE_ENV === 'production' ? '/listingjson' : '../listings.json';

function getProductById (items, itemId) {
  let itemIds = items.map((item) => item.id)
  let itemIndex = itemIds.indexOf(itemId)
  let item = items[itemIndex]
  return {
    product: item,
    index: itemIndex
  }
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
    listingModalItem: {},
    checkoutMessage: null
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
    checkoutMessage: state => state.checkoutMessage,
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
    setCheckoutMessage (state, value) {
      state.checkoutMessage = value || null
    },
    setMoreProductsLoading (state, value) {
      state.listings.moreLoading = value
    },
    addToCart (state, productId) {
      let product = getProductById(state.listings.products, productId).product

      let cartProduct = getProductById(state.cart.products, productId).product

      if (!cartProduct) {
        state.cart.products.push(product) // if product is not in cart
      }
      else {
        if (cartProduct && !cartProduct.count)
          cartProduct.count = 1 // initialize count if not initialized
        else
          cartProduct.count++
      }
    },
    decrementInCart (state, productId) {
      let result = getProductById(state.cart.products, productId)
      let cartProduct = result.product
      let cartProductIndex = result.index

      if (cartProduct) {
        // if product is in cart
        if (cartProduct.count && cartProduct.count == 0)
          state.cart.products.splice(cartProductIndex, 1) // delete from cart
        else
          state.cart.products[cartProductIndex].count-- // reduce number in cart
      }

    },
    removeFromCart (state, productId) {
      let cartProductIndex = getProductById(state.cart.products, productId).index

      // if product is in cart
      if (cartProductIndex)
        state.cart.products.splice(cartProductIndex, 1) // delete from cart
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

      setTimeout(() => {
        axios.get(listingsUrl)
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
      }, 1000)
    },
    loadMoreProducts ({commit}) {
      commit('setMoreProductsLoading', true)
      axios.get(listingsUrl)
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
      commit('decrementInCart', productId)
    },
    checkoutCart ({ commit, state }) {
      axios.post('http://www.mocky.io/v2/5be477442f00004900d9f521', {
        products: state.cart.products
      })
      .then(function (response) {
        // handle success
        console.log(response);
        commit('setCheckoutMessage', response.data.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    }

  }
})
