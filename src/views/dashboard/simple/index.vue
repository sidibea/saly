<script>


import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import PageHeader from "@/components/page-header";
import UserMixins from "@/mixins/userMixins"
import mitt from 'mitt';

import Select2 from 'vue3-select2-component';
import Layout from "@/layouts/main.vue";
import Flatpickr from "vue-flatpickr-component";
import moment from "moment/moment";
import fr from "flatpickr/dist/l10n/fr";

export default {
    mixins:[UserMixins],

  components: {
      Flatpickr,
    Layout,
      PageHeader,
      Select2
  },
    computed: {
        config(){
            //var current_month = 12 - new Date().getMonth();
            return   {
                locale: fr.fr,
                mode: "range",
                dateFormat: "Y-m-d",
                firstDayOfWeek: 1,
                defaultDate: (this.selectedAnnee != null)?[this.selectedAnnee +"-" +new Date().getMonth()+"-01", this.selectedAnnee +"-12-"+new Date().getDay()]:[new Date().getFullYear()+'-'+ new Date().getMonth()+"-01", new Date().getFullYear()+'-'+new Date().getFullYear()+'-'+ new Date().getMonth()+"-31"],
            }

        },
    },

  data() {
    return {
        selectedAnnee: null,
        from: '',
        to: '',
        daterange: null,
        selectedRamification: null,
        childs: null,
      title: this.$t('t-dashboards'),
        dasboardStats: {
            widget: {
                "emplacement": 3,
                "contribuables": 0,
                "equipements": 0,
                "prevu": 0,
                "payer": 0
            },
            stats: []
        },
      items: [{
        text: this.$t('t-dashboards'),
        href: "/",
      },

      ],
      Autoplay, Mousewheel
    };
  },
  methods: {
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
          this.refresh()

      },
      refresh(){
          this.api.get("/ramifications/"+this.selectedRamification+"/childs")
              .then(ram => {

                  this.api.get("/statistics/dashboards/widgets/"+this.user.id+"?ramification="+this.selectedRamification+"&childs="+ram.map(item => item.id) + "&from="+this.from.trim()+"&to="+this.to.trim())
                      .then(response => {
                          //console.log(response)
                          this.dasboardStats = response;
                      })
              })
      },
      changeRamification(val){
          this.selectedRamification = val;
      },
    rightcolumn() {
      if (document.querySelector('.layout-rightside-col').classList.contains('d-block')) {
        document.querySelector('.layout-rightside-col').classList.remove('d-block');
        document.querySelector('.layout-rightside-col').classList.add('d-none');
      } else {
        document.querySelector('.layout-rightside-col').classList.remove('d-none');
        document.querySelector('.layout-rightside-col').classList.add('d-block');
      }
    },

    resizerightcolumn() {
      const element = document.querySelector('.layout-rightside-col');

      if (element) {
        if (window.outerWidth < 1699) {
          element.classList.remove("d-block");
          element.classList.add("d-none");
        } else {
          element.classList.add("d-block");
          element.classList.remove("d-none");
        }
      }

      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        element.classList.remove("d-block");
        element.classList.add("d-none");
      }
    },
      updateDashboardStats(data){
        this.dasboardStats = data
      },

    hiderightcolumn() {
      const element = document.querySelector('.layout-rightside-col');
      if (element.classList.contains('d-block')) {
        element.classList.remove("d-block");
        element.classList.add("d-none");
      }
    },
      formattedNumber(number) {
          if (number != null)
              return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return 0;
      },
  },
  mounted() {
      const emitter = mitt();
      emitter.on('updateDashboardStats', (data) => {
          console.log('Received event in the first component:', data);
      });
    window.addEventListener("resize", this.resizerightcolumn);
  },
  created() {
      this.title = this.$t('t-dashboards')
      this.selectedAnnee = this.$store.state.selectedAnnee;
      this.daterange = moment().format("YYYY-MM-DD") + ' au ' + moment(). format("YYYY-MM-DD");
      this.from = this.daterange.includes('au')?this.daterange.split('au')[0]:this.daterange;
      this.to = this.daterange.includes('au')?this.daterange.split('au')[1]:this.daterange.split('au')[1];

  }

};
</script>

<template>
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
      <b-col>
        <div class="h-100">
            <b-row>
                <b-col md="4" xl="4">
                    <b-card class="card-animate">
                        <b-card-body>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0"> {{$t('t-contribuables')}} </p>
                                </div>

                            </div>
                            <div class="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 class="fs-22 fw-semibold ff-secondary mb-4"> <span>{{dasboardStats.widget.contribuables}}</span>  </h4>
                                    <a class="text-decoration-underline text-muted" href="#">{{$t('t-details')}}</a>
                                </div>
                                <div class="avatar-sm flex-shrink-0">
                                    <span class="avatar-title bg-success-subtle rounded fs-3">
                                        <i class="bx bx-user text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </b-card-body>

                    </b-card>
                </b-col>
                <b-col md="4" xl="4">
                    <b-card class="card-animate">
                        <b-card-body>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-medium text-muted text-truncate mb-0"> {{$t('t-equipements')}} </p>
                                </div>
                            </div>
                            <div class="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 class="fs-22 fw-semibold ff-secondary mb-4"> <span>{{dasboardStats.widget.equipements}}</span> </h4>
                                    <a class="text-decoration-underline text-muted" href="#">{{$t('t-details')}}</a>
                                </div>
                                <div class="avatar-sm flex-shrink-0">
                                    <span class="avatar-title bg-success-subtle rounded fs-3">
                                        <i class="bx bx-home text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </b-card-body>

                    </b-card>
                </b-col>
                <b-col md="4" xl="4">
                    <b-card class="card-animate bg-warning">
                        <b-card-body>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-medium  text-truncate mb-0"> {{$t('t-assiette')}} </p>
                                </div>

                            </div>
                            <div class="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 class="fs-22 fw-semibold ff-secondary mb-4"> <span>{{dasboardStats.widget.prevu}}</span> </h4>
                                    <a class="text-decoration-underline " href="#">{{$t('t-details')}}</a>
                                </div>
                                <div class="avatar-sm flex-shrink-0">
                                    <span class="avatar-title bg-success-subtle rounded fs-3">
                                        <i class="bx bx-money text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </b-card-body>

                    </b-card>
                </b-col>
                <b-col md="6" xl="6">
                    <b-card class="card-animate bg-success">
                        <b-card-body>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-medium text-white text-truncate mb-0"> {{$t('t-montant-payer')}} </p>
                                </div>

                            </div>
                            <div class="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 class="fs-22 fw-semibold ff-secondary mb-4 text-white"> <span>{{formattedNumber(dasboardStats.widget.payer)}}</span> </h4>
                                    <a class="text-decoration-underline text-white" href="#">{{$t('t-details')}}</a>
                                </div>
                                <div class="avatar-sm flex-shrink-0">
                                    <span class="avatar-title bg-success-subtle rounded fs-3">
                                        <i class="bx bx-money text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </b-card-body>

                    </b-card>
                </b-col>
                <b-col md="6" xl="6">
                    <b-card class="card-animate bg-danger">
                        <b-card-body>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 overflow-hidden">
                                    <p class="text-uppercase fw-medium text-white text-truncate mb-0"> {{$t('t-montant-restant')}} </p>
                                </div>

                            </div>
                            <div class="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 class="fs-22 fw-semibold ff-secondary mb-4 text-white"> <span>{{ formattedNumber(dasboardStats.widget.prevu - dasboardStats.widget.payer) }}</span>  </h4>
                                    <a class="text-decoration-underline text-white" href="#">{{$t('t-details')}}</a>
                                </div>
                                <div class="avatar-sm flex-shrink-0">
                                    <span class="avatar-title bg-success-subtle rounded fs-3">
                                        <i class="bx bx-money text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </b-card-body>

                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12" xl="12">
                    <b-card>
                        <b-card-header>
                            <b-card-title>Recapitulatif</b-card-title>
                        </b-card-header>
                        <b-card-body>
                            <table class="table text-uppercase  table-bordered text-start text-center bg-success text-white">
                                <thead>
                                    <th>Emplacement</th>
                                    <th>Enrôlement</th>
                                    <th>Montant prévu</th>
                                    <th>Montant payé</th>
                                    <th>Montant restant</th>
                                </thead>
                                <tbody>
                                <tr v-for="data in dasboardStats.stats" :key="data">
                                    <td>{{formattedNumber(data.emplacement)}}</td>
                                    <td>{{formattedNumber(data.contribuables)}}</td>
                                    <td>{{formattedNumber(data.prevu)}}</td>
                                    <td>{{formattedNumber(data.payer)}}</td>
                                    <td>{{formattedNumber(data.restant)}}</td>
                                </tr>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>TOTAL</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </div>
      </b-col>

    </b-row>
  </Layout>
</template>