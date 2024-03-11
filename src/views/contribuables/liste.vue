<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import ListingMixin from "../../mixins/listing"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Select2 from 'vue3-select2-component';
import Flatpickr from "vue-flatpickr-component";
import UserMixins from "../../mixins/userMixins";
import moment from "moment";
export default{
    mixins:[ListingMixin, UserMixins],

    components: {
        Flatpickr,
        Layout,
        PageHeader,
        Loading,
        Select2

    },
    data(){
        return{
            url: "/contribuables",
            sortOrder: 'desc',
            searchKey: "",
            orderBy: 'contrib.createdAt',
            from: '',
            to: '',
            daterange: null,
            selectedRamification: null,
            childs: null,
            colonnes : [
                { text: 'id', value: 'id', name: 'contrib.id' },
                { text: 'nom',  name: 'contrib.nom' },
                { text: 'prenom',  name: 'contrib.prenom' },
                { text: 'raison sociale',  name: 'contrib.raisonSociale' },
                { text: 'Numéro Klispay',  name: 'contrib.numKlis' },
                { text: 'Numéro Klispay',  name: 'contrib.adresse' },
                { text: 'emplacement',  name: 'ram.nom' },
            ],
            isLoading: false,
            title: "Liste des contribuables",
            items: [
                {
                    text: "Tableau de bord",
                    href: "/",
                },
                {
                    text: "collectivités",
                    href: "/",
                },
                {
                    text: "contribuables",
                    active: true,
                },
            ],
        }
    },
    methods:{
        checkDate(type){
            console.log(type)
            if (type === 'day')
                return this.daterange === moment().format("YYYY-MM-DD") + ' au ' + moment().format("YYYY-MM-DD") || this.daterange === moment().format("YYYY-MM-DD")
            if (type === 'week')
                return this.daterange === moment().startOf('isoWeek').format("YYYY-MM-DD") + ' au ' + moment().endOf('isoWeek') .format("YYYY-MM-DD")
            if (type === 'month')
                return this.daterange ===moment().startOf('month') .format("YYYY-MM-DD") + ' au ' + moment().endOf('month'). format("YYYY-MM-DD")
            if (type === 'year')
                return this.daterange ===moment().startOf('year') .format("YYYY-MM-DD") + ' au ' + moment().endOf('year'). format("YYYY-MM-DD")

        },
        filterByDay() {
            this.daterange = moment().format("YYYY-MM-DD") + ' au ' + moment().format("YYYY-MM-DD");
            this.from = this.to = moment().format("YYYY-MM-DD")
            this.refresh()

            // console.log(this.daterange)
        },
        filterByYesterday() {
            this.daterange = moment().subtract(1, 'days').format("YYYY-MM-DD") + ' au ' + moment().subtract(1, 'days').format("YYYY-MM-DD");
            this.from = moment().subtract(1, 'days').format("YYYY-MM-DD")
            this.to = moment().subtract(1, 'days').format("YYYY-MM-DD")
            this.refresh()

        },
        filterByLastWeek() {
            this.daterange = moment().subtract(1, 'weeks').startOf('week').format("YYYY-MM-DD") + ' au ' + moment().subtract(1, 'weeks').endOf('week').format("YYYY-MM-DD");
            this.from = moment().subtract(1, 'weeks').startOf('week').format("YYYY-MM-DD")
            this.to = moment().subtract(1, 'weeks').endOf('week').format("YYYY-MM-DD");
            this.refresh()

            //console.log(this.daterange)
        },
        filterByLastMonth() {
            this.daterange = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD") + ' au ' + moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
            this.from = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD")
            this.to = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD")
            this.refresh()

            //console.log(this.daterange)
        },
        filterByWeek() {

            this.daterange = moment().startOf('isoWeek').format("YYYY-MM-DD") + ' au ' + moment().endOf('isoWeek').format("YYYY-MM-DD");
            this.from = moment().startOf('isoWeek').format("YYYY-MM-DD")
            this.to = moment().endOf('isoWeek').format("YYYY-MM-DD")
            // console.log(this.daterange);
            this.refresh()

        },
        filterByMonth() {
            this.daterange = moment().startOf('month').format("YYYY-MM-DD") + ' au ' + moment().endOf('month').format("YYYY-MM-DD");
            this.from = moment().startOf('month').format("YYYY-MM-DD")
            this.to = moment().endOf('month').format("YYYY-MM-DD")
            this.refresh()

        },
        filterByYear() {
            this.daterange = moment().startOf('year').format("YYYY-MM-DD") + ' au ' + moment().endOf('year').format("YYYY-MM-DD");
            this.from = moment().startOf('year').format("YYYY-MM-DD")
            this.to = moment().endOf('year').format("YYYY-MM-DD")
            this.refresh()

            // console.log(' au ' + moment().endOf('year').format("YYYY-MM-DD"))
        },
        selectRamification(val){
            this.selectedRamification = val.id;
            //console.log(this.userRamifications)
            var index = this.fields.findIndex((obj) => obj.colonne === 'ram.id');
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
            this.api.get("/ramifications/"+this.selectedRamification+"/childs")
                .then(ram => {
                    this.fields.push({colonne: 'ram.id', operator: 'in', value: ram.map(item => item.id), connector: 'and'})
                    console.log(this.fields)
                    this.refresh()

                })

        },
        changeRamification(val){
            this.selectedRamification = val;
        },
        refresh(){
            this.isLoading =true
            var index;
            index = this.fields.findIndex((obj) => obj.colonne === 'tram.ordre');
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
            index = this.fields.findIndex((obj) => obj.colonne === 'tram.enabled');
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
            index = this.fields.findIndex((obj) => obj.colonne === 'contrib.createdAt');
            if (index !== -1) {
                this.fields.splice(index, 1);
            }

            this.fields.push({colonne: 'contrib.createdAt', operator: 'dateBetween', x: this.from, y: this.to, connector: 'and'})

            this.fillTable();


        },
    },
    created() {
        this.selectedAnnee = this.$store.state.selectedAnnee;
        this.daterange = moment().format("YYYY-MM-DD") + ' au ' + moment(). format("YYYY-MM-DD");
        this.from = this.daterange.includes('au')?this.daterange.split('au')[0]:this.daterange;
        this.to = this.daterange.includes('au')?this.daterange.split('au')[1]:this.daterange.split('au')[1];
        this.fields.push({colonne: 'ram.id', operator: 'in', value: this.$store.state.userRamifications.map(item => item.id), connector: 'and'})

        this.refresh();

    }

}
</script>
<template>
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :on-cancel="onCancel"
             :is-full-page="fullPage"/>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <b-row class="mb-3">
            <b-col cols="12"  class="page-title-right right">
                <div class="right">
                    <div style="display: inline">
                        <button v-if="checkDate('day')"   @click="filterByDay" class="btn btn-primary ">
                            Aujourd'hui
                        </button>
                        <button v-else   @click="filterByDay" class="btn btn-soft-secondary ">
                            Aujourd'hui
                        </button>
                        <button  v-if="checkDate('week')"   @click="filterByWeek" class="btn btn-primary ">
                            Cette semaine
                        </button>
                        <button  v-else   @click="filterByWeek" class="btn btn-soft-secondary ">
                            Cette semaine
                        </button>
                        <button v-if="checkDate('month')"  @click="filterByMonth" class="btn btn-primary ">
                            Ce mois
                        </button>
                        <button v-else  @click="filterByMonth" class="btn btn-soft-secondary ">
                            Ce mois
                        </button>
                        <button v-if="checkDate('year')"  @click="filterByYear" class="btn btn-primary ">
                            Cette année
                        </button>
                        <button v-else  @click="filterByYear" class="btn btn-soft-secondary ">
                            Cette année
                        </button>
                        <div  class="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" class="btn btn-soft-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-dots-vertical align-middle"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">
                                <li><button class="dropdown-item" @click="filterByYesterday">Hier</button></li>
                                <li><button class="dropdown-item" @click="filterByLastWeek">Semaine dernière</button></li>
                                <li><button class="dropdown-item" @click="filterByLastMonth">Mois dernier</button></li>
                                <li><Flatpickr
                                    @change="onDateChange"
                                    v-model="daterange"
                                    :config="config"
                                    class="form-control "
                                    placeholder="Select date"/></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col v-for="(type, index) in widTypeRamification" md="6" xl="3" :key="type">
                <Select2 @select="selectRamification($event)" @change="changeRamification($event)"  :placeholder="type.type"  v-model="widTypeRamification[index].value" required :options="userRamifications.filter(item => item.type.id === widTypeRamification[index].id).map(ram => ({id: ram.id, text: ram.nom}))"    />


            </b-col>
        </b-row>
        <b-row>
            <b-col xl="12">
                <b-card no-body>
                    <b-card-header>
                        <b-card-title>Contribuables</b-card-title>
                    </b-card-header>
                    <b-card-body>
                        <div class="row mb-3">
                            <b-col xl="12" md="12" sm="12">
                                <div class="d-flex align-items-center flex-wrap gap-2">
                                    <div class="flex-grow-1">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <select2 @select="changeElementParPage($event)" v-model="pagination.itemsPerPage" :options="pageOptions"  placeholder="Lignes"></select2>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="flex-shrink-0">
                                        <div class="hstack text-nowrap gap-2">
                                            <div class="input-group">

                                                <input @input="filterQuery" type="text" v-model="searchKey" placeholder="Recherche" class="form-control d-block" required id="tarif" aria-describedby="basic-addon1">
                                                <span class="input-group-text" id="basic-addon1"><i class="ri ri-search-2-line"></i></span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </b-col>
                        </div>

                        <div class="table-responsive">
                            <table class="table align-middle table-nowrap mb-0">
                                <thead class="table-light">
                                <tr class="text-center text-white">
                                    <th scope="col" class="bg-success">
                                        <div class="form-check">
                                            <input v-model="allSelected" @click="selectAll" @change="toggleSelectAll" class="form-check-input" type="checkbox"
                                                   id="responsivetableCheck">
                                            <label class="form-check-label" for="responsivetableCheck"></label>
                                        </div>
                                    </th>
                                    <th class="bg-success" scope="col">#</th>
                                    <th class="bg-success" scope="col" colspan="2">Date</th>
                                    <th class="bg-success" scope="col" colspan="5">Contribuable</th>
                                    <th class="bg-success" scope="col">Base taxable</th>
                                    <th class="bg-success" colspan="3" scope="col">Situations fiscale</th>
                                    <th class="bg-success" colspan="2" scope="col">Agent</th>
                                    <!--                      <th class="bg-success" colspan="3" scope="col">Validation</th>-->
                                    <th class="bg-success"></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th  aria-sort="ascending" style="cursor: pointer">Date</th>
                                    <th>Heure</th>
                                    <th  style="cursor: pointer">N° Klispay</th>
                                    <th style="cursor: pointer">Contribuable</th>
                                    <th  style="cursor: pointer">Emplacement</th>
                                    <th  style="cursor: pointer">Telephone</th>

                                    <th>Statut</th>
                                    <th></th>
                                    <th>Prevu</th>
                                    <th>Payer</th>
                                    <th>Restant</th>
                                    <th  aria-sort="ascending" style="cursor: pointer">Pseudo</th>

                                    <th>Nom </th>
                                    <!--                      <th>Date <i class="las la-sort text-end"></i></th>
                                                          <th>Pseudo <i class="las la-sort text-end"></i></th>
                                                          <th>Nom <i class="las la-sort text-end"></i></th>-->
                                    <th></th>

                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="(data, index) in tableData" :key="data">
                                    <td></td>
                                    <td>{{index+1}}</td>
                                    <td>{{formatDate(data.createdAt, "DD-MM-YYYY")}}</td>
                                    <td>{{formatDate(data.createdAt, "H:m:s")}}</td>
                                    <td><router-link :to="{name: 'ficheContribuables', params: {id: data.id}}">{{data.numKlis}}</router-link></td>
                                    <td><router-link :to="{name: 'ficheContribuables', params: {id: data.id}}"> {{data.fullName}}</router-link></td>
                                    <td>{{data.ramification.nom}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.telephone}}</td>
                                    <td>{{data.createdBy.username}}</td>
                                    <td>{{data.createdBy.fullName}}</td>

                                </tr>
                                </tbody>
                            </table>
                            
                        </div>
                        <div class="d-flex justify-content-end mt-3" v-if="tableData.length >= 1">
                            <div style="display: flex; justify-content: flex-end"
                                 class="dataTables_paginate paging_simple_numbers text-end" id="scroll-horizontal_paginate">
                                <ul class="pagination">
                                    <li v-if="pagination.totalPages<=1" class="paginate_button page-item previous disabled"
                                        id="scroll-horizontal_previous">
                                        <button @click="goToPage((pagination.currentPage-1))" aria-controls="scroll-horizontal" data-dt-idx="0"
                                                tabindex="0" class="page-link">Précédent
                                        </button>
                                    </li>
                                    <li v-else-if="pagination.totalPages>1" class="paginate_button page-item previous"
                                        id="scroll-horizontal_previous">
                                        <button @click="goToPage((pagination.currentPage-1))" aria-controls="scroll-horizontal" data-dt-idx="0"
                                                tabindex="0" class="page-link">Précédent
                                        </button>
                                    </li>
                                    <li v-for="page in pages" :key="page" class="paginate_button page-item">
                                        <button v-if="pagination.currentPage === page" @click="goToPage(page)" aria-controls="scroll-horizontal"
                                                data-dt-idx="1" tabindex="0" class="page-link active">{{ page }}
                                        </button>
                                        <button v-else @click="goToPage(page)" aria-controls="scroll-horizontal" data-dt-idx="1"
                                                tabindex="0" class="btn btn-light">{{ page }}
                                        </button>

                                    </li>
                                    <li v-if="pagination.totalPages<=1" class="paginate_button page-item next disabled" id="scroll-horizontal_next">
                                        <button @click="goToPage((pagination.currentPage+1))" aria-controls="scroll-horizontal" data-dt-idx="3"
                                                tabindex="0" class="page-link">Suivant
                                        </button>
                                    </li>
                                    <li v-else-if="pagination.totalPages>1" class="paginate_button page-item next " id="scroll-horizontal_next">
                                        <button @click="goToPage((pagination.currentPage+1))" aria-controls="scroll-horizontal" data-dt-idx="3"
                                                tabindex="0" class="page-link">Suivant
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>