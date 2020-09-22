<template>
  <div class="wrapper">
    <div v-for="(filter, ind) in filterData">
      FIND the {{ filter }}
      <input type="text"
             v-model="filterData"
             :placeholder="`put the ${filter}`"
      >
    </div>

    <hr>
    <table>
      <caption>
        list of movies
      </caption>
      <thead>
      <tr>
        <th v-for="(title, ind) in HEADER_LIST"
            :key="ind"
        >
          {{ title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(movie, ind) in GET_FILTERED_MOVIES_DATA"
          :key="'m' + ind"
      >
        <td>{{ movie.name }}</td>
        <td>{{ movie.actor }}</td>
      </tr>
      </tbody>
    </table>
    <div class="footer">
      <input type="text"
             v-model="paginationCount"
      >
      <div> You realise the PAGINATION_COUNT = {{ GET_PAGINATION_AMOUNT }}</div>
      <div>CURRENT_PAGINATION is {{ GET_CURRENT_PAGINATION }}</div>
      <div @click="turnPaginationAhead">turnPaginationAhead</div>
      <div @click="turnPaginationBack">turnPaginationBack</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      HEADER_LIST: 'GET_HEADER_LIST',
      FILTER_TYPES: 'GET_HEADER_LIST',
      GET_FILTERED_MOVIES_DATA: 'GET_FILTERED_MOVIES_DATA',
      GET_CURRENT_PAGINATION: 'GET_CURRENT_PAGINATION',
      GET_PAGINATION_AMOUNT: 'GET_PAGINATION_AMOUNT'
    }),
    paginationCount: {
      get() {
        return this.GET_PAGINATION_AMOUNT
      },
      set(value) {
        this.SET_PAGINATION_AMOUNT(value)
      }
    },
    filterData: {
      get() {
        let filterList = {}
        for(let field of this.HEADER_LIST) {
          filterList = {...filterList, [field]: ''}
        }
        return filterList
      },
      set(value) {
        this.SET_FILTER_DATA(value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_FILTER_DATA',
      'CHANGE_CURRENT_PAGINATION',
      'SET_PAGINATION_AMOUNT'
    ]),
    turnPaginationAhead() {
      if(this.GET_CURRENT_PAGINATION < this.GET_PAGINATION_AMOUNT)
        this.CHANGE_CURRENT_PAGINATION(1)
    },
    turnPaginationBack() {
      if(this.GET_CURRENT_PAGINATION > 1)
        this.CHANGE_CURRENT_PAGINATION(-1)
    }
  }
}
</script>

<style>
</style>
