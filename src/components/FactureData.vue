<template><v-app>
  <v-data-table
  :search="search"
    :headers="headers"
    :items="dataCostumers"
    class="elevation-0"
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
    <template #[`item.actions`]>
      <v-icon
        small
        class="mr-2"
        @click="download(item)"
      >
        mdi-download
      </v-icon>
 
    </template>
  
  </v-data-table> <detailsClient :showFacture="showFacture" :itemsInvoice="itemsInvoice" @newVal="newVal"></detailsClient></v-app>
</template>
<script>
import detailsClient from"./detailsClient.vue"

import axios  from 'axios'
  export default {

components:{
  detailsClient 
},
 data: () => ({
      search:"",
      showFacture:false,
      itemsInvoice:{},
      dataCostumers:[],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Facture ID',
          align: 'center',
      
        
          value:"InvoiceID"
        },
        { text: 'Facture Date', sortable: false,  value:"InvoiceDate",      align: 'center',},
        { text: 'Client Nom',  sortable: false,value:"ClientName",      align: 'center',},
        { text: 'Fournisseur Nom', value:"SupplierName",sortable: false,      align: 'center',},
        { text: 'Montant TTC', value:"totalTTC",      align: 'center',},
        { text: 'Facture details', sortable: false ,value:"details",      align: 'center',},
            { text: 'telecharger facture', sortable: false ,value:"actions",      align: 'center',},
      ],
      desserts: [],
      editedIndex: -1,

    }),


    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
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
     this.itemsInvoice=item;
     this.showFacture=true;
      },
      download (item) {
     this.itemsInvoice=item;
   
      },

  

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
