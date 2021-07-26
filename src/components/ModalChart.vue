<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
      
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="bedford-btn"
        >
          {{modalBtn1}}
        </v-btn>
        <div class="clear"></div>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
        {{modalChartTitle}}
        </v-card-title>
        <p class="card-txt">
        {{modalChartDesc}}
        </p>

         <v-slider
            v-model="slideObj.val"
            :label="slideObj.label"
            :thumb-color="slideObj.color"
            thumb-label="always"
            :max="this.totalCount"
            :min="this.extractCount"
            @change="handleSlideVal(slideObj.val)"
            class="slider-comp"
            ></v-slider>


        <line-chart :style="lineChartStyle" :chart-data="datacollection"></line-chart>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import LineChart from "./LineChart";
import BedfordLaw from "../mixins/bedford-law";
import store from "../store/index";

export default {
  name: 'ModalChart',
  mixins: [BedfordLaw],
  props: ['apiData'],
  components: {
    LineChart
  },
  mounted() {
  },
  created() {
    this.extractDataColumn(this.apiData);
    this.loadChartData();
    this.totalCount = this.apiData.length;
  },
  computed: {
    lineChartStyle () {
      return {
        padding: '0px 50px 50px 50px',
        position: 'relative'
      }
    }
  },
  data () {
      return {
        dialog: false,
        bedfordResults:[],
        bedfordDataSet:[],
        testDataSet:[],
        extractTestData:[],
        extractCount:store.state.extractCount,
        totalCount:0,
        extractColunm:store.state.extractColunm,
        extractColumnArr:[],
        datacollection: {},
        modalChartTitle:store.state.config.lang.modalChartTitle,
        modalChartDesc:store.state.config.lang.modalChartDesc,
        modalBtn1:store.state.config.lang.modalBtn1,
        // Sliders
        slideObj: { label: 'Increase Dataset', color: 'red' },
      }
    },
    methods: {
       extractDataColumn(arr){
          for (let i = 0; i < this.extractCount; i++) {
               this.extractColumnArr.push(arr[i][this.extractColunm]);
            }
         this.bedfordResults = this.calculateBenford(this.extractColumnArr);
         this.validateBedford(this.bedfordResults);

       },
        validateBedford(results){

            for (let i = 0; i < results.length; i++) {
               this.bedfordDataSet.push(results[i].BenfordFrequency);
               this.testDataSet.push(results[i].dataFrequency);
            }

       },
       loadChartData(){
           this.datacollection = {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                datasets: [
                {
                    data: this.bedfordDataSet,
                    label: "Bedford Law",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: this.testDataSet,
                    label: "Test Data Set",
                    borderColor: "#8e5ea2",
                    fill: false
                }
                ]
            }
       },
       handleSlideVal(val){
         //Clear pervious datasets
         this.extractColumnArr = [];
         this.bedfordResults = [];
         this.bedfordDataSet = [];
         this.testDataSet = [];

        for (let i = 0; i < val; i++) {
            this.extractColumnArr.push(this.apiData[i][this.extractColunm]);
        }
        //Rebuild Datasets 
         this.bedfordResults = this.calculateBenford(this.extractColumnArr);
         this.validateBedford(this.bedfordResults);
         this.loadChartData();
         
       }
    },
};
</script>
<style scoped>

    .card-txt {
        padding: 20px 20px 0px 20px;
    }
    .bedford-btn {
        margin: 10px;
    }
    .fl-left {
        float: left;
    }

    .fl-right {
        float: right;
    }

    .clear {
        clear: both;
    }

    .slider-comp {
        padding: 30px 30px 0px 30px;
    }
  
</style>