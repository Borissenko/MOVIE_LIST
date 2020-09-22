export const state = () => ({
  filterData: {},
  paginationCount: 3,
  currentPagination: 1,
  movieList: [
    {
      'movie name': 'go',
      'movie actor': 'Jone'
    },
    {
      'movie name': 'Hi',
      'movie actor': 'Lena'
    },
    {
      'movie name': 'Yes',
      actor: 'Goga'
    },
    {
      'movie name': 'NO',
      'movie actor': 'Nataly'
    },
  ]
})

export const getters = {
  GET_HEADER_LIST: state => {
    if(state.movieList === 0)
      return ['movie name', 'movie actor']

    return Object.keys(state.movieList[0])
  },
  GET_FILTERED_MOVIES_DATA: state => state.movieList,
  GET_CURRENT_PAGINATION: state => state.currentPagination,
  GET_PAGINATION_AMOUNT: state => state.paginationCount,

}

export const mutations = {
  SET_PAGINATION_AMOUNT(state, value) {
    state.paginationCount = value
  },
  CHANGE_CURRENT_PAGINATION(state, value) {
    state.currentPagination += value
  },
  SET_FILTER_DATA(state, value) {
    state.filterData = value
  }
}

export const actions = {
  async nuxtServerInit({getters, dispatch, commit}, {$axios}) {
    let productCategory = []
    try {
      productCategory = await $axios.$get('/API_Data/productCategory/productCategory.json')
    } catch(e) {
      console.log('FETCH_PRODUCTS error = ', e)
    }
    commit('SET_PRODUCT_CATEGORY', productCategory)
    dispatch('FETCH_PRODUCTS', 1)
  },
  async FETCH_PRODUCTS({commit}, categoryId) {
    await this.$axios.$get(`/API_Data/products/products_${categoryId}.json`)
      .then(data => commit('SET_PRODUCTS', {category: categoryId, products: data}))
      .catch(e => console.log('FETCH_PRODUCTS error = ', e))
  }
}





