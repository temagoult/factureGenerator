<template><v-app>
  <v-data-table
  :search="search"
    :headers="headers"
    :items="dataCostumers"
    class="elevation-0 mainTable"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>factures</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
      
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
        

      </v-toolbar>
    </template>
    <template #[`item.details`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showDetails(item)"
      >
        mdi-details
      </v-icon>
 
    </template>

  
  </v-data-table>
    <detailsClient :showFacture="showFacture" :itemInvoice="itemInvoice" @newVal="newVal"></detailsClient>
</v-app>
</template>
<script>
import detailsClient from"../components/detailsClient.vue"

import axios  from 'axios'
  export default {

components:{
   detailsClient 
},
 data: () => ({
      search:"",
      showFacture:false,
      itemInvoice:{},
      dataCostumers:[],
      headers: [
        {
          text: 'Facture ID',
          align: 'center',
          value:"InvoiceID"
        },
        { text: 'Facture Date', sortable: false,  value:"InvoiceDate",align: 'center',},
        { text: 'Client Nom',  sortable: false,value:"ClientName",align: 'center',},
        { text: 'Fournisseur Nom', value:"SupplierName",sortable: false, align: 'center',},
        { text: 'Montant TTC', value:"totalTTC",  sortable: false,align: 'center',},
        { text: 'Facture details', sortable: false ,value:"details", align: 'center',},
      ],

    }),

    mounted () {
    this.getApiFacture()
    },

    methods: {
      newVal(val){
        this.showFacture=val
      },
      getApiFacture(){
      axios.get("https://elhoussam.github.io/invoicesapi/db.json").then((res)=>{
        this.dataCostumers=res.data;
        this.dataCostumers.map((element)=>{
       element.totalPrice =this._.sumBy(element.InvoiceItems,"ItemPrice")
       element.totalTax=this._.sumBy(element.InvoiceItems,"ItemTax")
       element.totalTTC= element.totalTax+element.totalPrice 

  })
      }).catch((error)=>{
        console.log(error)
      })
    } ,
    showDetails (item) {
     this.itemInvoice=item;
     this.showFacture=true;
      },
   


    },
  }
</script>
