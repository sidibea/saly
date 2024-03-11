<template>
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :on-cancel="onCancel"
             :is-full-page="fullPage"/>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="position-relative mx-n4 mt-n4">
            <div class="profile-wid-bg">
                <img src="@/assets/images/profile-bg.jpg" alt="" class="" />
            </div>
        </div>
        <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
            <b-row class="g-4">
                <b-col cols="auto">
                    <div class="avatar-lg">
                        <img src="@/assets/images/users/avatar-1.jpg" alt="user-img" class="img-thumbnail rounded-circle" />
                    </div>
                </b-col>
                <b-col>
                    <div class="p-2">
                        <h3 class="text-white mb-1">{{contribuable.fullName}}</h3>
                        <p class="text-white text-opacity-75">{{contribuable.numKlis}}</p>
                        <div class="hstack text-white-50 gap-1">
                            <div class="me-2">
                                <i class="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i> {{contribuable.ramification.parent.nom}} > {{contribuable.ramification.nom}}
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" lg="auto" order-lg="0" class="order-last">
                    <b-row class="text text-white-50 text-center">
                        <b-col lg="4" cols="3">
                            <div class="p-2">
                                <h4 class="text-white mb-1">0 FCFA</h4>
                                <p class="fs-14 mb-0">Prevu</p>
                            </div>
                        </b-col>
                        <b-col lg="4" cols="3">
                            <div class="p-2">
                                <h4 class="text-white mb-1">0 FCFA</h4>
                                <p class="fs-14 mb-0">Payé</p>
                            </div>
                        </b-col>
                        <b-col lg="4" cols="3">
                            <div class="p-2">
                                <h4 class="text-white mb-1">0 FCFA</h4>
                                <p class="fs-14 mb-0">Restant</p>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <b-row>
            <b-col lg="12">
                <div>
                    <div class="d-flex profile-wrapper">
                        <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                            <li class="nav-item">
                                <b-link class="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                                    <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                                    <span class="d-none d-md-inline-block">Aperçu</span>
                                </b-link>
                            </li>
                            <li class="nav-item">
                                <b-link class="nav-link fs-14" data-bs-toggle="tab" href="#activities" role="tab">
                                    <i class="ri-list-unordered d-inline-block d-md-none"></i>
                                    <span class="d-none d-md-inline-block">Enrôlements</span>
                                </b-link>
                            </li>

                            <li class="nav-item">
                                <b-link class="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab">
                                    <i class="ri-folder-4-line d-inline-block d-md-none"></i>
                                    <span class="d-none d-md-inline-block">Transactions</span>
                                </b-link>
                            </li>
                        </ul>
                        <div class="flex-shrink-0">
                            <router-link to="/pages/profile-setting" class="btn btn-success"><i
                                class="ri-edit-box-line align-bottom"></i> Modifier</router-link>
                        </div>
                    </div>
                    <div class="tab-content pt-4 text-muted">
                        <div class="tab-pane active" id="overview-tab" role="tabpanel">
                            <b-row>
                                <b-col xxl="3">
                                    <b-card no-body>
                                        <b-card-body>
                                            <h5 class="card-title mb-5">Completez les informations du contribuables</h5>
                                            <b-progress class="animated-progress custom-progress progress-label">
                                                <b-progress-bar :value="30" variant="danger">
                                                    <div class="label">30%</div>
                                                </b-progress-bar>
                                            </b-progress>
                                        </b-card-body>
                                    </b-card>

                                    <b-card no-body>
                                        <b-card-body>
                                            <h5 class="card-title mb-3">Info</h5>
                                            <div class="table-responsive">
                                                <table class="table table-borderless mb-0">
                                                    <tbody>
                                                    <tr>
                                                        <th class="ps-0" scope="row">Nom complet :</th>
                                                        <td class="text-muted">{{contribuable.fullName}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="ps-0" scope="row">Téléphone :</th>
                                                        <td class="text-muted">{{contribuable.telephone}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="ps-0" scope="row">E-mail :</th>
                                                        <td class="text-muted">daveadame@velzon.com</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="ps-0" scope="row">Adresse :</th>
                                                        <td class="text-muted">
                                                            {{contribuable.adresse}}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="ps-0" scope="row">Date d'enrôlement</th>
                                                        <td class="text-muted">{{contribuable.createdAt}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </b-card-body>
                                    </b-card>

                                    <b-card no-body>
                                        <b-card-body>
                                            <h5 class="card-title mb-4">Activités</h5>
                                            <div class="d-flex flex-wrap gap-2 fs-15">
                                                <b-link href="javascript:void(0);" class="badge bg-primary-subtle text-primary">Photoshop</b-link>
                                                <b-link href="javascript:void(0);"
                                                        class="badge bg-primary-subtle text-primary">illustrator</b-link>
                                                <b-link href="javascript:void(0);" class="badge bg-primary-subtle text-primary">HTML</b-link>
                                                <b-link href="javascript:void(0);" class="badge bg-primary-subtle text-primary">CSS</b-link>
                                                <b-link href="javascript:void(0);"
                                                        class="badge bg-primary-subtle text-primary">Javascript</b-link>
                                                <b-link href="javascript:void(0);" class="badge bg-primary-subtle text-primary">Php</b-link>
                                                <b-link href="javascript:void(0);" class="badge bg-primary-subtle text-primary">Python</b-link>
                                            </div>
                                        </b-card-body>
                                    </b-card>
                                    <b-card no-body>
                                        <b-card-body>
                                            <div class="d-flex align-items-center mb-4">
                                                <div class="flex-grow-1">
                                                    <h5 class="card-title mb-0">Enrôlements</h5>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <b-dropdown variant="link" right toggle-class="arrow-none p-0" no-caret>
                                                        <template #button-content><i class="ri-more-2-fill fs-14"></i>
                                                        </template>
                                                        <b-dropdown-item href="#">
                                                            View
                                                        </b-dropdown-item>
                                                        <b-dropdown-item href="#">
                                                            Download
                                                        </b-dropdown-item>
                                                        <b-dropdown-item href="#">
                                                            Delete
                                                        </b-dropdown-item>
                                                    </b-dropdown>
                                                </div>
                                            </div>
                                            <div class="d-flex mb-4">
                                                <div class="flex-shrink-0">
                                                    <img src="@/assets/images/small/img-4.jpg" alt="" height="50" class="rounded" />
                                                </div>
                                                <div class="flex-grow-1 ms-3 overflow-hidden">
                                                    <b-link href="javascript:void(0);">
                                                        <h6 class="text-truncate fs-14">
                                                            Design your apps in your own way
                                                        </h6>
                                                    </b-link>
                                                    <p class="text-muted mb-0">15 Dec 2021</p>
                                                </div>
                                            </div>
                                            <div class="d-flex mb-4">
                                                <div class="flex-shrink-0">
                                                    <img src="@/assets/images/small/img-5.jpg" alt="" height="50" class="rounded" />
                                                </div>
                                                <div class="flex-grow-1 ms-3 overflow-hidden">
                                                    <b-link href="javascript:void(0);">
                                                        <h6 class="text-truncate fs-14">
                                                            Smartest Applications for Business
                                                        </h6>
                                                    </b-link>
                                                    <p class="text-muted mb-0">28 Nov 2021</p>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="flex-shrink-0">
                                                    <img src="@/assets/images/small/img-6.jpg" alt="" height="50" class="rounded" />
                                                </div>
                                                <div class="flex-grow-1 ms-3 overflow-hidden">
                                                    <b-link href="javascript:void(0);">
                                                        <h6 class="text-truncate fs-14">
                                                            How to get creative in your work
                                                        </h6>
                                                    </b-link>
                                                    <p class="text-muted mb-0">21 Nov 2021</p>
                                                </div>
                                            </div>
                                        </b-card-body>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </div>
                        <div class="tab-pane fade" id="activities" role="tabpanel">
                            <b-card no-body>
                                <b-card-body>
                                    <h5 class="card-title mb-3">Activities</h5>
                                    <div class="acitivity-timeline">

                                        <div class="acitivity-item py-3 d-flex">
                                            <div class="flex-shrink-0">
                                                <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                                     class="avatar-xs rounded-circle acitivity-avatar" />
                                            </div>
                                            <div class="flex-grow-1 ms-3">
                                                <h6 class="mb-1">
                                                    Natasha Carey
                                                    <b-badge variant="success-subtle" class="text-success align-middle">Completed</b-badge>
                                                </h6>
                                                <p class="text-muted mb-2">
                                                    Adding a new event with attachments
                                                </p>
                                                <b-row>
                                                    <b-col xxl="4">
                                                        <b-row class="border border-dashed gx-2 p-2 mb-2">
                                                            <b-col cols="4">
                                                                <img src="@/assets/images/small/img-2.jpg" alt="" class="img-fluid rounded" />
                                                            </b-col>
                                                            <b-col cols="4">
                                                                <img src="@/assets/images/small/img-3.jpg" alt="" class="img-fluid rounded" />
                                                            </b-col>
                                                            <b-col cols="4">
                                                                <img src="@/assets/images/small/img-4.jpg" alt="" class="img-fluid rounded" />
                                                            </b-col>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                                <small class="mb-0 text-muted">25 Nov</small>
                                            </div>
                                        </div>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </div>
                        <div class="tab-pane fade" id="documents" role="tabpanel">
                            <b-card no-body>
                                <b-card-body>
                                    <div class="d-flex align-items-center mb-4">
                                        <h5 class="card-title flex-grow-1 mb-0">Historique de paiements</h5>
                                        <div class="flex-shrink-0">
                                            <label for="formFile" class="btn btn-danger"><i class="ri-upload-2-fill me-1 align-bottom"></i>
                                                Télécharger PDF</label>
                                        </div>
                                    </div>
                                    <b-row>
                                        <b-col lg="12">
                                            <div class="table-responsive">
                                                <table class="table table-borderless align-middle mb-0">
                                                    <thead class="table-light">
                                                    <tr>
                                                        <th scope="col">File Name</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Size</th>
                                                        <th scope="col">Upload Date</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                        <i class="ri-file-zip-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0)">Artboard-documents.zip</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>Zip File</td>
                                                        <td>4.57 MB</td>
                                                        <td>12 Dec 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                        <i class="ri-file-pdf-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0);">Bank Management System</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>PDF File</td>
                                                        <td>8.89 MB</td>
                                                        <td>24 Nov 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-secondary-subtle text-secondary rounded fs-20">
                                                                        <i class="ri-video-line"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0);">Tour-video.mp4</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>MP4 File</td>
                                                        <td>14.62 MB</td>
                                                        <td>19 Nov 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-success-subtle text-success rounded fs-20">
                                                                        <i class="ri-file-excel-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0);">Account-statement.xsl</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>XSL File</td>
                                                        <td>2.38 KB</td>
                                                        <td>14 Nov 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-info-subtle text-info rounded fs-20">
                                                                        <i class="ri-folder-line"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0);">Project Screenshots Collection</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>Folder File</td>
                                                        <td>87.24 MB</td>
                                                        <td>08 Nov 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm">
                                                                    <div class="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                        <i class="ri-image-2-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="ms-3 flex-grow-1">
                                                                    <h6 class="fs-15 mb-0">
                                                                        <b-link href="javascript:void(0);">Velzon-logo.png</b-link>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>PNG File</td>
                                                        <td>879 KB</td>
                                                        <td>02 Nov 2021</td>
                                                        <td>
                                                            <b-dropdown variant="light" toggle-class="arrow-none px-1" class="btn-icon" no-caret>
                                                                <template #button-content><i class="ri-equalizer-fill"></i>
                                                                </template>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-eye-fill me-2 align-middle text-muted"></i>View
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-download-2-fill me-2 align-middle text-muted"></i>Download
                                                                </b-dropdown-item>
                                                                <b-dropdown-item href="#">
                                                                    <i class="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete
                                                                </b-dropdown-item>
                                                            </b-dropdown>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="text-center mt-3">
                                                <b-link href="javascript:void(0);" class="text-success"><i
                                                    class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                    Load more
                                                </b-link>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-card-body>
                            </b-card>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>

    </Layout>
</template>
<script>
import Loading from "vue-loading-overlay";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import Api from "../../helpers/api";

export default {
    components: {Loading, Layout, PageHeader},
    data(){
        return {
            title: "Fiche contribuables",
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
            user: null,
            isLoading: false,
            contribuable: {ramification: {parent: {}}},
            api: new Api()
        }
    },
    created() {
        this.api.get("/contribuables/"+this.$route.params.id)
            .then(response => {
                this.contribuable = response;
            })

    }

}
</script>