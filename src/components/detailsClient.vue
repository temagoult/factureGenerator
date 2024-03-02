<template>
<v-dialog v-model="showFactureDetails" class="!p-2 " width="unset" eager    >

  <v-card class="!p-2 "> <div class="flex  md:text-[16px] sm:!text-[12px] !text-[10px]">
    <v-btn @click="generatePDF" class="!p-2 md:!text-[16px] sm:!text-[12px] !text-[10px] w-[30%] !self-center" color="blue" icon> <v-icon>mdi-printer</v-icon></v-btn></div>
   <section   id="element" >
    <h3 class="text-center md:text-[35px] sm:-[30px] text-[25px] p-2 " >Facture n :{{itemInvoice.InvoiceID  }}</h3>
   
    <div class="grid grid-cols-2 gap-4 p-2">
      
 
    <div class="px-2 mb-5 col-start-2 md:text-[15px] sm:text-[12px] text-[9px] "  >date de la facture :{{ itemInvoice.InvoiceDate }}</div>
    <div class="flex flex-col gap-1"> 
    <div class="fournisseur p-2 border border-b-1 border-black border-x-transparent border-t-transparent italic md:text-[16px] sm:text-[13px] text-[12px]">
    FOURNISSEUR
  </div>
  <p class="font-bold px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.SupplierName}}</p>
  <p class=" px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.SupplierAddress}}</p>
  <p class="px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.SupplierPhone}}</p>
  </div>

  <div class="flex flex-col gap-1"> 
    <div class="client p-2 border border-b-1 border-black border-x-transparent border-t-transparent italic md:text-[16px]  sm:text-[13px] text-[12px]">
    CLIENT
  </div>
  <p class="font-bold px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.ClientName}}</p>
  <p class="px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.ClientAddress}}</p>
  <p class="px-2 md:text-[15px] sm:text-[12px] text-[10px]"> {{itemInvoice.ClientPhone}}</p>
  </div>

  <v-data-table 
  mobile-breakpoint="0"
    :headers="headers"
    :items="itemInvoice.InvoiceItems"
    :items-per-page="5"
    class="elevation-1  col-span-2 me"
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
    :items="[itemInvoice]"
    :items-per-page="5"
    class="elevation-1 !p-2 sm:col-start-2 sm:col-span-1 col-span-2"
    hide-default-footer  
    mobile-breakpoint="0"
    >
  </v-data-table>

  <p class="signature !p-2 my-13 col-start-2 text-center md:text-[16px] sm:text-[14px] text-[12px] "> LA SIGNATURE</p>
</div>
  </section>
  
  </v-card>

  </v-dialog>
</template>

<script>
import  html2pdf   from 'html2pdf.js'
export default {
 data () {
        return {
          test:true,
         
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
              text: 'TOTAL',
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
 computed:{
  showFactureDetails:{
    get(){
      return this.showFacture
    },

  set(val){
  this.$emit("newVal",val)  }
  }},
  methods:{

  close(){
  this.showFactureDetails=false
   },

  generatePDF() {
  let element = document.getElementById('element');
  let opt = {
  margin: 0.3,
  filename:'myfile.pdf',
  image:{ type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF:{ unit: 'in', format: 'letter', orientation: 'landscape' }
  };
  html2pdf().set(opt).from(element).save();
    },
          
        },
  props:{
        itemInvoice:{
        type:Object
      },
      showFacture:{
        type:Boolean
      }
         },
        

        }
    
   </script> 
   <style >
  .v-dialog {
  box-shadow: none !important;
  }
  .me .v-data-table-header  th {
  background-color: rgb(246, 20, 20) !important;
  font-size: 14px !important;
  }
  .v-data-table   {
  border: 1px solid rgba(0,0,0,0.12) !important;
  font-size: 14px !important; }
  .mainTable .v-data-table-header  th {
  background-color: rgb(244, 244, 244) !important;
  font-size: 16px !important;
  }
</style>