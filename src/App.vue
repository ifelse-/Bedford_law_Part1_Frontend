<template>
 <section class="container">
    <v-app>
     <DataTable></DataTable>
    </v-app>
 </section>
</template>

<script>
import DataTable from './components/DataTable.vue';


export default {
  name: 'App',
  components: {
    DataTable
  },
  mounted() {
 
  },
  methods: {
     
  }
};
</script>
<style scoped>

 .container {
   padding: 20px;
 }

</style>