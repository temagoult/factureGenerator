<template>
<v-dialog v-model="showFactureDetails" class="!p-2 " width="unset" >
  <v-card class="!p-2  mx-auto" > 
   

    <h3 class="text-center text-[35px] p-2">Facture n :{{itemsInvoice.InvoiceID  }}</h3>
    <div class="grid grid-cols-2 gap-4 p-2">
 
    <div class="p-2 col-start-2 ">date de la facture :{{ itemsInvoice.InvoiceDate }}</div>
    <div class="flex flex-col gap-1"> 
    <div class="fournisseur px-2 border border-b-1 border-black border-x-transparent border-t-transparent italic">
    FOURNISSEUR
  </div>
  <p class="font-bold px-2"> {{itemsInvoice.SupplierName}}</p>
  <p class=" px-2"> {{itemsInvoice.SupplierAddress}}</p>
  <p class="px-2"> {{itemsInvoice.SupplierPhone}}</p>
  </div>

  <div class="flex flex-col gap-1"> 
    <div class="client px-2 border border-b-1 border-black border-x-transparent border-t-transparent italic">
    CLIENT
  </div>
  <p class="font-bold px-2"> {{itemsInvoice.ClientName}}</p>
  <p class="px-2"> {{itemsInvoice.ClientAddress}}</p>
  <p class="px-2"> {{itemsInvoice.ClientPhone}}</p>
  </div>

  <v-data-table 
    :headers="headers"
    :items="itemsInvoice.InvoiceItems"
    :items-per-page="5"
    class="elevation-1 !p-2 col-span-2 me"
    hide-default-footer  >
  <template v-slot:[`item.num`]="{index}">

{{ index+1 }}
  </template>
  <template #[`item.montantTTC`]="{ item }">

{{item.ItemPrice+item.ItemTax}}
  </template>
  
  </v-data-table>
  <v-data-table 
    :headers="headersTax"
:items="itemsSecondTable"
    :items-per-page="5"
    class="elevation-1 !p-2 col-start-2"
    hide-default-footer  
    
    >

  </v-data-table>
  </div> 
  
  </v-card>
  
  </v-dialog>
</template>

<script>
    export default {
      data () {
        return {
          itemsSecondTable:[],
          headers: [
            {
              text: 'N*',
              align: 'center',
              sortable: false,
              value: 'num',
            },
            {
              text: 'Item Libelle',
              align: 'center',
              sortable: false,
              value: 'ItemLibelle',
            },
            {
              text: 'Unité d’Item',
              align: 'center',
              sortable: false,
              value: 'ItemUnit',
            },
            { text: 'Quantité d’item', value: 'ItemQuantity' , align: 'center',},
            { text: ' Prix d’item', value: 'ItemPrice', align: 'center', },
            { text: 'Taxe d’item', value: 'ItemTax', align: 'center' },
            { text: 'Montant d’item TTC', value: 'montantTTC',align: 'center', },

          ],
          headersTax: [
            {
              text: 'TOTAL*',
              align: 'center',
              sortable: false,
              value: 'totalPrice',
            },
            {
              text: 'TVA',
              align: 'center',
              sortable: false,
              value: 'totalTax',
            },
            {
              text: 'TVA',
              align: 'center',
              sortable: false,
              value: 'totalTTC',
            },



          ],
      
      }},
      created(){
        this.itemsSecondTable=[];
this.itemsSecondTable.push(this.itemsInvoice)
      },
      computed:{
  showFactureDetails:{
    get(){
      return this.showFacture
    },

  set(val){
this.$emit("newVal",val)  }
}},

      props:{
        itemsInvoice:{
        type:Object
      },
      showFacture:{
        type:Boolean
      }
         },
        
        methods:{
          close(){
            this.showFactureDetails=false
          
          }
        }
        }
    
  </script> 
  <style >
  .v-dialog {
  box-shadow: none !important;
}
.me .v-data-table-header  th {
  background-color: rgb(246, 20, 20) !important;
}

</style>