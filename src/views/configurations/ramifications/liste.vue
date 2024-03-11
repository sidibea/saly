<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import ListingMixin from "@/mixins/listing"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Select2 from 'vue3-select2-component';
import UserMixins from "@/mixins/userMixins";
export default{
    mixins:[ListingMixin, UserMixins],

    components: {
        Layout,
        PageHeader,
        Loading,
        Select2

    },
    data(){
        return{
            url: "/ramifications",
            sortOrder: 'desc',
            searchKey: "",
            sortBy: '',
            orderBy: 'ram.nom',
            from: '',
            to: '',
            daterange: null,
            selectedRamification: null,
            childs: null,
            colonnes : [
                { text: 'id', value: 'id', name: 'ram.id' },
                { text: 'Nom',  name: 'ram.nom' },
                { text: 'Code',  name: 'ram.code' },
                { text: 'Type ramification',  name: 'tram.nom' },
                { text: 'Date de création',  name: 'ram.createdAt' },
                { text: 'Date de modification',  name: 'ram.updatedAt' },
            ],
            isLoading: false,
            title: "Liste des sous-entités",
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
                    text: "configurations",
                    active: true,
                },
            ],
        }
    },
    methods:{

        refresh(){
            this.fillTable();
        },
    },
    created() {
        this.selectedAnnee = this.$store.state.selectedAnnee;
        //this.fields.push({colonne: 'ram.id', operator: 'in', value: this.$store.state.userRamifications.map(item => item.id), connector: 'and'})

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

        <b-row>
            <b-col xl="12">
                <b-card no-body>
                    <b-card-header>
                        <b-card-title>Sous-entités</b-card-title>

                    </b-card-header>
                    <b-card-body>
                        <div class="row right p-2">
                            <div class="col-md-2 mt-4">
                                <div class="btn-group " role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                                        Action
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1" data-popper-placement="top-start" data-popper-reference-hidden="" data-popper-escaped="" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(0px, -40px);">
                                        <li><a  @click="bulkDelete()" class="dropdown-item" href="#">Supprimer</a></li>
                                        <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label>Count:</label>
                                <select2  @select="changeElementParPage($event)" v-model="pagination.itemsPerPage" :options="pageOptions"  placeholder="Lignes"/>

                            </div>
                            <div class="col-md-2">
                                <label>Trier:</label>
                                <select2  @select="handleSortBy" v-model="sortBy" :options="colonnes.map(item => item.text)"  placeholder="Colonnes"/>


                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Trier par:</label>
                                    <select2  @select="handleSortOrder" v-model="sortOrder" :options="['asc', 'desc']"  placeholder="Direction"/>

                                </div>
                            </div>
                            <div class="col-md-3 right mt-4 ">
                                <router-link  :to="{name: 'createRamification'}" class="btn btn-block btn-outline-primary"><i class="ri-add-fill ri-1x"></i> Creation</router-link>
                            </div>


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
                                    <th class="bg-success" scope="col">Parent</th>
                                    <th class="bg-success" scope="col">Nom</th>
                                    <th class="bg-success" scope="col">Code</th>
                                    <th class="bg-success" scope="col">Type</th>
                                    <th class="bg-success" scope="col">Statut</th>

                                    <th class="bg-success"></th>
                                </tr>
                                <tr v-for="(data, index) in tableData" :key="data">
                                    <td></td>
                                    <td>{{index+1}}</td>
                                    <td v-if="data.parent != null">{{data.parent.nom}}</td>
                                    <td v-else></td>
                                    <td>{{data.nom}}</td>
                                    <td>{{data.code}}</td>
                                    <td>{{data.type.nom}}</td>
                                    <td>
                                        <span v-if="data.enabled" class="badge bg-success">Active</span>
                                        <span v-else class="badge bg-danger">Inactive</span>
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="ri-more-2-fill"></i>
                                            </a>

                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <li>
                                                    <router-link :to="{name: 'editRamification', params: { id: data.id }}"
                                                                 class="dropdown-item"><i class="ri-file-2-fill r-2x"></i> Modifier
                                                    </router-link>
                                                </li>
                                                <li><a @click="confirmDelete(item.id)" class="dropdown-item">Supprimer</a></li>

                                            </ul>
                                        </div>

                                    </td>

                                </tr>

                                </thead>
                                <tbody>
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