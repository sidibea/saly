<script>
import {
  required,
  email,
  helpers
} from "@vuelidate/validators";
import appConfig from "../../../app.config";
import Api from '@/helpers/api'




export default {
  page: {
    title: "Login",
    meta: [{
      name: "description",
      content: appConfig.description,
    },],
  },
  data() {
    return {
        api: new Api(),
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      processing: false,
    };
  },
  validations: {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Please enter valid email", email),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
    },
  },
  computed: {

  },
  methods: {
      tryToLogIn(){
          this.processing = true;
          this.api.post("/users/check", {email: this.email, password: this.password})
              .then(response => {
                  if (response.message){
                      this.authError = response.message;
                      this.isAuthError = true
                      this.processing = false

                  }else{
                      if (response.enabled === true){
                          localStorage.setItem('currentUser', JSON.stringify(response));
                          this.$store.dispatch("logIn", response);
                          this.$router.push({name: 'default'});
                      }else{
                          this.isAuthError = true;
                          this.authError = "Compte inactif !"
                          this.processing = false

                      }
                  }

              })
      }



  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img src="@/assets/images/logo-light.png" alt="" height="20" />
                </router-link>
              </div>
              <p class="mt-3 fs-15 fw-medium">
                Premium Admin & Dashboard Template
              </p>
            </div>
          </b-col>
        </b-row>

        <b-row class="justify-content-center">
          <b-col md="8" lg="6" xl="5">
            <b-card no-body class="mt-4">
              <b-card-body class="p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Bienvenue  !</h5>
                  <p class="text-muted">Connectez-vous à votre compte.</p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert v-model="authError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>

                  <div>

                  </div>

                  <form @submit.prevent="tryToLogIn">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" required placeholder="entrez votre email" v-model="email" />
                      <div class="invalid-feedback">
                        <span></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted">Mot de passe oublié ?</router-link>
                      </div>
                      <label class="form-label" for="password-input">Mot de passe</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" v-model="password" class="form-control pe-5" required placeholder="Entrez votre mot de passe"
                          id="password-input" />
                        <b-button variant="link" class="position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button" id="password-addon">
                          <i class="ri-eye-fill align-middle"></i>
                        </b-button>
                        <div class="invalid-feedback">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                      <label class="form-check-label" for="auth-remember-check">Restez connecter</label>
                    </div>

                    <div class="mt-4">
                      <b-button variant="success" class="w-100" type="submit" :disabled="processing">
                        {{ processing ? "Patientez s'il vous plait" : "Connexion" }}
                      </b-button>
                    </div>

                  </form>
                </div>
              </b-card-body>
            </b-card>

          </b-col>
        </b-row>
      </b-container>
    </div>

    <footer class="footer">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} KLISPAY. Réalisé
                <i class="mdi mdi-heart text-danger"></i> par NTA TECHNOLOGIE
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>