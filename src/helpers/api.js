import axios from "axios";
import Swal from "sweetalert2";

export default class Api{

    constructor() {
        this.env = {
            dev: 'http://127.0.0.1:8000',
            prod: 'https://api.cliniquemedicaledemassi.com'
        }
        this.version = [3]
        this.call = axios.create({
            baseURL: this.env.dev+"/api/v"+this.version[0],
        });
        this.logoUrl = this.env.prod+"/uploads/images/logo/"

        this.operatorOptions= [
            { text: '=', value: 'eq' },
            { text: '<>', value: 'not eq' },
            { text: '<', value: 'lt' },
            { text: '<=', value: 'lte' },
            { text: '>', value: 'gt' },
            { text: '>=', value: 'gte' },
            { text: 'Not like', value: 'not like' },
            { text: 'Like', value: 'like' },
            { text: 'Vide', value: 'is null' },
            { text: 'Non Vide', value: 'is not null' },
            { text: 'Entre', value: 'between' },
            { text: 'Plage date', value: 'dateBetween' },
            { text: 'In', value: 'in' },
            { text: 'Not in', value: 'not in' },
        ];
    }



    async listing(url, fields, orderBy, sortOrder, itemPerPage, currentPage) {

        try {


            let list;
            if(fields ==null){
                list =  this.call.get(url);
            }else {
                let query = '';
                if(url.includes('?'))
                    query = url+'&orderBy=' + orderBy + '&sortOrder=' + sortOrder + '&itemsperpage=' + itemPerPage + '&page=' + currentPage;
                else
                    query = url+'?orderBy=' + orderBy + '&sortOrder=' + sortOrder + '&itemsperpage=' + itemPerPage + '&page=' + currentPage;

                fields.forEach(function (element) {
                    let tableau = null;
                    switch (element.operator) {
                        case 'eq':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'not eq':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'gt':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'gte':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'lt':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'lte':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'like':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'not like':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'is null':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator;
                            break;
                        case 'is not null':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator;
                            break;
                        case 'in':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'not in':
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.value+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            break;
                        case 'between':
                            tableau = element.value.split('et');
                            console.log(tableau[0]);
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + tableau[0].trim() + '&filter[' + element.colonne + '][y]=' + tableau[1].trim()+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            //console.log(query);

                            break;
                        case 'dateBetween':
                            // tableau = element.value.split('au');
                            //console.log(tableau[0]);
                            query = query + '&filter[' + element.colonne + '][type]=' + element.operator + '&filter[' + element.colonne + '][x]=' + element.x.trim() + '&filter[' + element.colonne + '][y]=' + element.y.trim()+ '&filter[' + element.colonne + '][connector]=' + element.connector;
                            //console.log(query);

                            break;


                    }
                });
                //console.log(query);
                list = await this.call.get(query, {
                    headers: {
                    }
                });
            }
            //console.log(list.data);
            return list.data;
        }catch (e) {
           this.toast();

        }
    }
    async delete(url) {

        try {
            const response = await this.call.delete(url,{
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                }
            });
            if (response.status === 204){
                return true;
            }
            if (response.status !== 500){
                return false;
            }


        }catch (e) {
            this.toast()

        }
    }
    confirmDete() {
        Swal.fire({
            title: "Etes-vous sûr ?",
            text: "Vous ne pourrez plus recuper les informations",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#34c38f",
            cancelButtonColor: "#f46a6a",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    }
    success(message) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    async get(url) {

        try {


            let list;

                //console.log(query);
                list = await this.call.get(url, {
                    headers: {
                    }
                });

            //console.log(list.data);
            return list.data;
        }catch (e) {
           this.toast();

        }
    }
    async post(url, data) {

        try {

            //console.log(this.token)
            const response = await this.call.post(url, data,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (response.status === 201 || response.status === 200){
                return response.data;
            }else
                this.toast()



        }catch (e) {
            this.toast()

        }
    }
    async upload(url, data) {

        try {

            //console.log(this.token)
            const response = await this.call.post(url, data,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201 || response.status === 200){
                return response.data;
            }else
                this.toast()



        }catch (e) {
            this.toast()

        }
    }

    async put(url, data) {

        try {
            const response = await this.call.put(url, data,{
                headers: {
                    // 'Content-Type': 'application/merge-patch+json'
                }
            });
            if (response.status === 200){


                return response.data;
            }
        }catch (e) {
            this.toast()

        }
    }

    toast (){
        Swal.fire({
            title: "Oops...",
            text: "Une erreur s'est produite !",
            icon: "error",
            confirmButtonClass: "btn btn-primary w-xs mt-2",
            buttonsStyling: false,

            showCloseButton: true,
        });
    }
}