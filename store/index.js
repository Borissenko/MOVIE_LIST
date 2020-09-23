export const state = () => ({
  filterData: {},
  paginationAmount: 3,
  currentPagination: 1,
  movieList: []
})

export const getters = {
  GET_HEADER_LIST: ({movieList}) => Object.keys(movieList[0]),
  GET_CURRENT_PAGINATION: ({currentPagination}) => currentPagination,
  GET_PAGINATION_AMOUNT: ({paginationAmount}) => paginationAmount,
  GET_FILTER_DATA: ({filterData}) => filterData,
  GET_FILTERED_MOVIES_DATA: (state, getters) => {
    let filtersData = getters.GET_FILTER_DATA
    let filterKeys = Object.keys(filtersData)

    return state.movieList.filter(item => {
        let result = 0

        for(let key of filterKeys) {
          let conformity = item[key].includes(filtersData[key])
          result = result + Number(!conformity)
        }
        return result === 0
      }
    )
  },
  GET_PAGINATION_TOTAL: ({movieList, paginationAmount}, getters) => Math.ceil(getters.GET_FILTERED_MOVIES_DATA.length / paginationAmount),
  GET_SLICED_END_FILTERED_MOVIES_DATA: (state, getters) => {
    let sliceStart = getters.GET_PAGINATION_AMOUNT * (getters.GET_CURRENT_PAGINATION - 1)
    return getters.GET_FILTERED_MOVIES_DATA.slice(sliceStart, sliceStart + getters.GET_PAGINATION_AMOUNT)
  }
}

export const mutations = {
  SET_MOVIE_TO_STORE(state, value) {
    state.movieList = value
  },
  SET_PAGINATION_AMOUNT(state, value) {
    state.currentPagination = 1
    state.paginationAmount = value
  },
  CHANGE_CURRENT_PAGINATION(state, value) {
    state.currentPagination += value
  },
  SET_FILTER_VALUE(state, filter) {
    state.filterData = {...state.filterData, ...filter}
  }
}

export const actions = {
  async nuxtServerInit({getters, dispatch, commit}, {$axios}) {
    await $axios.$get('/API_Data/movies.json')
      .then(movies => commit('SET_MOVIE_TO_STORE', movies))
      .catch(console.log)
  }
}





