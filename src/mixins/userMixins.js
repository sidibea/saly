import Api from "../helpers/api";

export default {
    data(){
        return{
            api: new Api(),
            user: null,
            selectedRamification: null,
            userAffectations: [],
            userEntites: [],
            userRamifications: [],
            userPermissions: [],
            typeRamifications: [],
            widTypeRamification: [],
            fields: []
        }

    },
    methods:{
        formattedNumber(number) {
            if (number != null)
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return 0;
        },
        updateUserInfo(){
            this.user = this.$store.state.currentUser;
            this.userRamifications = []

            this.api.get("/users/"+this.user.id)
                .then(response => {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.$store.dispatch("logIn", response);
                    this.user = this.$store.state.currentUser;

                })

        },
        getUserAffaction(){
            this.userAffectations =  this.user.affectations
        },
        getUserRamification(){
            this.userRamifications = []
            if (this.user.type.nom === 'Super Admin'){
                this.api.get("/ramifications")
                    .then(response => {
                        response.data.forEach(item => {
                            this.userRamifications.push(item);
                        })

                    })
            }else{
                this.userRamifications = []
                this.fields.push({colonne: 'tram.enabled', operator: 'eq', value: 1, connector: "and"})

                this.user.affectations.forEach(item => {
                    if (item.enabled === true){
                        if (item.ramification !== null)
                        {
                            this.fields.push({colonne: 'tram.ordre', operator: 'gte', value: item.ramification.type.ordre, connector: "and"})
                        }else{
                            this.fields.push({colonne: 'ent.id', operator: 'gte', value: item.entite.id, connector: "and"})

                        }
                    }


                })

                this.api.listing("/type_ramifications", this.fields, "tram.ordre", "asc", 1000, 1 )
                    .then(response => {
                        this.typeRamifications = response.data;
                        this.typeRamifications.forEach(item => {
                            this.widTypeRamification.push({id:item.id, type: item.nom, value: null })

                        })
                    })
                this.userAffectations.forEach((affectation, index) => {
                    if (affectation.ramification !== null){
                        if (affectation.ramification.enabled === true){
                            if (index === 0)
                                this.selectedRamification = affectation.ramification.id
                            this.api.get("/ramifications/"+affectation.ramification.id+"/childs")
                                .then(response => {
                                    response.forEach(item => {
                                        this.userRamifications.push(item);
                                    })
                                    localStorage.setItem("userRamifications", JSON.stringify(this.userRamifications))
                                    this.$store.dispatch("setUserRamifications", this.userRamifications);

                                })
                        }
                    }
                    else{
                        localStorage.setItem("userEntites", JSON.stringify(affectation.entite))
                        this.$store.dispatch("setUserEntites", affectation.entite);
                        var fields = [];
                        fields.push({colonne: "ent.id", operator: "eq", value: affectation.entite.id, connector: "and"})
                        this.api.listing("/ramifications", fields, "ram.nom", "asc", 10000, 1)
                            .then(response => {
                                response.data.forEach((item, index) => {
                                    if (index === 0)
                                        this.selectedRamification = item.id
                                    this.userRamifications.push(item);
                                })
                                localStorage.setItem("userRamifications", JSON.stringify(this.userRamifications))
                                this.$store.dispatch("setUserRamifications", this.userRamifications);

                            })
                    }

                })
            }


        }

    },
    created() {
        this.userRamifications = []


        this.updateUserInfo();

        this.getUserAffaction();
        this.getUserRamification();

    }
}