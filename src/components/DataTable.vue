<template>
<section>
  <ModalChart v-if="isDataSet"  :apiData="this.apiData"/>
  <v-data-table
      :headers="headers"
      :items="columns"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
 </section>   
</template>

<script>
const axios = require('axios');
import ModalChart from './ModalChart.vue';

export default {
  name: 'DataTable',

  components: {
      ModalChart
  },
  mounted() {
       let _this = this;
    // Make a request for a user with a given ID
    axios.get('http://127.0.0.1:3000/api/bedford')
      .then(function (response) {
        // handle success
        //console.log(_this.apiData);
         _this.apiData = response.data;
         _this.columns = response.data;
         _this.buildTableData(_this.apiData);
         _this.isDataSet = true;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  data () {
      return {
        apiData:[],
        headers: [],
        columns: [],
        isDataSet: false
      }
    },
    methods: {
          buildTableData(arr){
            let _this = this;
            let dataKeys = Object.keys(arr[0]);
            
            //Refactor custom array order
            Array.prototype.move = function (from, to) {
              this.splice(to, 0, this.splice(from, 1)[0]);
            };
            dataKeys.move(2,0);
            dataKeys.move(2,3);
            dataKeys.move(1,2);
            dataKeys.move(2,4);
            dataKeys.move(2,3);
            dataKeys.move(2,3);
            dataKeys.move(3,2);
            dataKeys.move(3,4);
            dataKeys.move(4,4);
            // console.log('dataKeys', dataKeys);

            for (var i = 0; i < dataKeys.length; i++) {
                 _this.headers.push({
                      text:dataKeys[i],
                      value: dataKeys[i],
                  });
            }
        }
    },
};
</script>
<style scoped>

</style>