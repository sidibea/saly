<template>
  <b-row class="mb-4">
      <b-col v-for="(type, index) in widTypeRamification" md="6" xl="3" :key="type">
          <Select2 @select="selectRamification($event)" @change="changeRamification($event)"  :placeholder="type.type"  v-model="widTypeRamification[index].value" required :options="userRamifications.filter(item => item.type.id === widTypeRamification[index].id).map(ram => ({id: ram.id, text: ram.nom}))"    />


      </b-col>
  </b-row>

</template>
<script>
import Select2 from 'vue3-select2-component';
import UserMixins from "../mixins/userMixins"
import Api from "../helpers/api";
import mitt from 'mitt';

export default {
    mixins:[UserMixins],

    components:{
        Select2
    },
    data(){
      return{
          api: new Api(),
          selectedRamification: null,
          childs: null

      }
    },
    methods:{
        selectRamification(val){
            this.selectedRamification = val.id;
            //console.log(this.userRamifications)
            this.api.get("/ramifications/"+this.selectedRamification+"/childs")
                .then(ram => {

                    this.api.get("/statistics/dashboards/widgets/"+this.user.id+"?ramification="+this.selectedRamification+"&childs="+ram.map(item => item.id))
                        .then(response => {
                            console.log(response)
                            localStorage.setItem('dasboardStats', JSON.stringify(response));
                            this.$store.dispatch("dasboardStats", response);
                            const emitter = mitt();
                            emitter.emit('updateDashboardStats', response);
                        })
                })



        },
        changeRamification(val){
            this.selectedRamification = val;
        },
    },

    created() {






    }

}
</script>