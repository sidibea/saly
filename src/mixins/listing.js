import Swal from "sweetalert2";
import Api from "../helpers/api";
import UserMixins from "./userMixins";
import moment from "moment"
export default {
    mixins:[ UserMixins],

    data(){
        return{
            api: new Api(),
            tableData: [],
            meta: {},
            pageOptions: [10, 50, 100, 200, 500],
            selectedEtablissement: null,
            pagination: {
                itemsPerPage: 50,
                totalPages: 1,
                currentPage: 1,
            },
            sortBy: '',

            fields: [
            ],
            orderBy: '',
            colonnes:[],
            sortOrder: 'desc',
        }
    },
    computed:{
        pages() {
            let pages = Array.from({length: this.pagination.totalPages}, (_, i) => i + 1)
            let currentPage = this.pagination.currentPage
            let visiblePages = 5
            let start = currentPage - Math.floor(visiblePages / 2)
            let end = currentPage + Math.floor(visiblePages / 2)
            if (start < 1) {
                end += 1 - start
                start = 1
            }
            if (end > this.pagination.totalPages) {
                start -= end - this.pagination.totalPages
                end = this.pagination.totalPages
            }
            if (start > 1) {
                pages.splice(0, start - 1, '...')
            }
            if (end < this.pagination.totalPages) {
                pages.splice(end, this.pagination.totalPages - end, '...')
            }
            return pages.slice(start - 1, end)
        }

    },

    methods:{
        handleSortBy(){
            var colonne = this.colonnes.find(item => item.text === this.sortBy)
            console.log(colonne)
            this.orderBy = colonne.name
            this.fillTable()
        },
        handleSortOrder(){
            this.fillTable()

        },

        confirmDelete(id) {
            Swal.fire({
                title: "Etes-vous sûr ?",
                text: "Vous ne pourrez plus recuper les informations",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Oui, Supprimer le !",
                cancelButtonText: "Annuler",
            }).then((result) => {
                if (result.value) {

                    this.api.delete(this.url+"/"+id)
                        .then(response => {
                            if(response === true){
                                this.fillTable();
                                Swal.fire("Supprimer!", "Votre ligne a été supprimée.", "success");
                            }
                        })


                }
            });
        },

        changeElementParPage(val){
            //console.log(val)
            this.pagination.itemsPerPage = val.id;
            this.fillTable();
        },
        filterQuery(){
            this.fields = [];
            this.colonnes.forEach(item => {
                this.fields.push({colonne: item.name, operator: 'like', value: this.searchKey, connector: 'or'})
            })
            if (this.searchKey.length >= 2){
                this.fillTable()
            }else{
                var index = null;
                this.colonnes.forEach(item => {
                    index = this.fields.findIndex((obj) => obj.colonne === item.name);
                    if (index !== -1) {
                        this.fields.splice(index, 1);
                    }
                })
                this.fillTable()

            }
        },
        goToPage(page){
            this.pagination.currentPage = page;
            this.fillTable();
        },
        formatDate(date, format){
            return moment(date).format(format);

        },
        fillTable(){


            this.api.listing(this.url, this.fields, this.orderBy, this.sortOrder, this.pagination.itemsPerPage, this.pagination.currentPage )
                .then(response => {
                    this.isLoading =false
                    this.tableData = response.data
                    this.meta = response.meta.total_records;
                    this.pagination.totalPages = Math.ceil(response.meta.total_records / this.pagination.itemsPerPage);

                })
        },

    },
    mounted() {
        this.selectedEtablissement = this.$store.state.selectedEtablissement

    }

}