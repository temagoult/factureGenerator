<template><v-app>
  <v-data-table
    :headers="headers"
    :items="dataCostumers"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        

      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-datails
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  
  </v-data-table></v-app>
</template>
<script>

import axios  from 'axios'
  export default {


    data: () => ({
      dataCostumers:[],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Facture ID',
          align: 'center',
      
        
          value:"InvoiceID"
        },
        { text: 'Facture Date', sortable: false,  value:"InvoiceDate"},
        { text: 'Client Nom',  sortable: false,value:"ClientName"},
        { text: 'Fournisseur Nom', value:"SupplierName",sortable: false},
        { text: 'Montant TTC', value:"totalTCC"},
        { text: 'Facture details', sortable: false },
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
      getApiFacture(){
      axios.get("https://elhoussam.github.io/invoicesapi/db.json").then((res)=>{
        this.dataCostumers=res.data;
  this.dataCostumers.map((element)=>{
    element.totalTCC =this._.sumBy(element.InvoiceItems,"ItemPrice")

  })
        console.log(res.data)
      }).catch((error)=>{
        console.log(error)
      })
    } ,
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
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