<template>
  <div class="wrapper">
    filterData = {{ filterData }}
    <div v-for="(filter, key, ind) in filterData">
      Find the <span>{{ key }}</span> of movie
      <input type="text"
             v-model="filterData[key]"
             :placeholder="`put the ${key} of movie`"
             @input="putFilters($event, key)"
      >
      filter = {{filter}}
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
          movie {{ title }}
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
             v-model="paginationAmount"
      >
      <div> You can determinate the PAGINATION_AMOUNT = {{ GET_PAGINATION_AMOUNT }}</div>
      <div>CURRENT_PAGINATION is {{ GET_CURRENT_PAGINATION }} of {{GET_PAGINATION_TOTAL}}</div>

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
      GET_PAGINATION_TOTAL: 'GET_PAGINATION_TOTAL',
      GET_PAGINATION_AMOUNT: 'GET_PAGINATION_AMOUNT'
    }),
    paginationAmount: {
      get() {
        return this.GET_PAGINATION_AMOUNT
      },
      set(value) {
        this.SET_PAGINATION_AMOUNT(value)
      }
    },
    filterData() {
      let filterList = {}
      for(let field of this.HEADER_LIST) {
        filterList = {...filterList, [field]: ''}
      }
      return filterList
    }
  },
  methods: {
    ...mapMutations([
      'SET_FILTER_DATA',
      'CHANGE_CURRENT_PAGINATION',
      'SET_PAGINATION_AMOUNT'
    ]),
    turnPaginationAhead() {
      if(this.GET_CURRENT_PAGINATION < this.GET_PAGINATION_TOTAL)
        this.CHANGE_CURRENT_PAGINATION(1)
    },
    turnPaginationBack() {
      if(this.GET_CURRENT_PAGINATION > 1)
        this.CHANGE_CURRENT_PAGINATION(-1)
    },
    putFilters(ev, key) {
      console.log('============', key, ev.target.value)
    }
  }
}
</script>

<style>
</style>
