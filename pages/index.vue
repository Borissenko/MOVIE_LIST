<template>
  <div class="wrapper">
    <div v-for="(filter, key, ind) in filterFields"
         :key="'f' + ind"
         class="filters"
    >
      <div class="filters__item">
        <div>
          Find the <span>{{ key }}</span> of movie
        </div>
        <input type="text"
               :placeholder="`put the ${key} of movie`"
               @input="putFilterToStore($event, key)"
        >
      </div>
    </div>

    <hr>
    <table>
      <caption>
        list of movies
      </caption>
      <thead>
      <tr>
        <th v-for="(title, ind) in HEADER_LIST" :key="'t' + ind">
          movie {{ title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(movie, ind) in GET_SLICED_END_FILTERED_MOVIES_DATA" :key="'m' + ind">
        <td v-for="(movieField, ind) in HEADER_LIST" :key="'mf' + ind">
          {{ movie[movieField] }}
        </td>
      </tr>
      </tbody>
    </table>

    <hr>
    <div class="pagination">
      <div class="pagination__amount">
        <div>
          You can determinate the PAGINATION_AMOUNT
        </div>
        <input type="text"
               v-model.number="paginationAmount"
        >
      </div>
      <div>CURRENT_PAGINATION is {{ GET_CURRENT_PAGINATION }} of {{ GET_PAGINATION_TOTAL }}</div>

      <div class="pagination__controls">
        <div @click="turnPaginationBack" class="control">
          turn Pagination Back
        </div>
        <div @click="turnPaginationAhead" class="control">
          turn Pagination Ahead
        </div>
      </div>
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
      GET_CURRENT_PAGINATION: 'GET_CURRENT_PAGINATION',
      GET_PAGINATION_TOTAL: 'GET_PAGINATION_TOTAL',
      GET_PAGINATION_AMOUNT: 'GET_PAGINATION_AMOUNT',
      GET_FILTER_DATA: 'GET_FILTER_DATA',
      GET_SLICED_END_FILTERED_MOVIES_DATA: 'GET_SLICED_END_FILTERED_MOVIES_DATA',
    }),
    paginationAmount: {
      get() {
        return this.GET_PAGINATION_AMOUNT
      },
      set(value) {
        this.SET_PAGINATION_AMOUNT(value)
      }
    },
    filterFields() {
      let filterList = {}
      for(let field of this.HEADER_LIST) {
        filterList = {...filterList, [field]: ''}
      }
      return filterList
    }
  },
  methods: {
    ...mapMutations([
      'SET_FILTER_VALUE',
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
    putFilterToStore(ev, key) {
      this.SET_FILTER_VALUE({[key]: ev.target.value})
    }
  }
}
</script>

<style>
.filters .filters__item {
  display: flex;
  width: 100%;
}

.filters .filters__item {
  margin-top: 15px;
}

.filters .filters__item span {
  color: red;
}

.filters .filters__item :first-child {
  width: 30%;
}

table {
  width: fit-content;
  margin: 20px auto 0;
}

table thead tr {
  background: #a3f5f6;
}

table td {
  width: fit-content;
  min-width: 150px;
}

table tr {
  text-align: left;
}

.pagination > * {
  margin-top: 10px;
}

.pagination__amount {
  display: flex;
  align-items: center;
}

.pagination__amount > :nth-child(2) {
  margin-left: 20px;
}

.pagination__controls {
  display: flex;
  align-items: center;
}

.pagination__controls .control {
  width: 200px;
  margin-right: 20px;
  border: darkblue 1px solid;
  cursor: pointer;
  padding: 7px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination__controls .control:hover {
  background: #f5f1f1;
}
</style>
