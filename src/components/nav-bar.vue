<script>
import {
  SimpleBar
} from "simplebar";

import i18n from "../i18n";

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      user: null,
      languages: [{
        flag: require("@/assets/images/flags/us.svg"),
        language: "en",
        title: "English",
      },
      {
        flag: require("@/assets/images/flags/french.svg"),
        language: "fr",
        title: "Français",
      },

      ],
      lan: 'fr',
      text: null,
      flag: null,
      value: null,
      myVar: 1,
    };
  },
  components: {
    SimpleBar
  },

  methods: {

    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      var searchInput = document.getElementById("search-options");

      searchInput.addEventListener("focus", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchInput.addEventListener("keyup", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });

      document.body.addEventListener("click", (e) => {
        if (e.target.getAttribute("id") !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;
      let layoutType = document.documentElement.getAttribute("data-layout");
      let visiblilityType = document.documentElement.getAttribute("data-sidebar-visibility");

      document.documentElement.setAttribute("data-sidebar-visibility", "show");

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (
        document.documentElement.getAttribute("data-layout") === "horizontal"
      ) {
        document.body.classList.contains("menu") ?
          document.body.classList.remove("menu") :
          document.body.classList.add("menu");
      }

      //For collapse vertical menu

      if (visiblilityType === "show" && (layoutType === "vertical" || layoutType === "semibox")) {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
            document.documentElement.setAttribute("data-sidebar-size", "") :
            document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
            document.documentElement.setAttribute("data-sidebar-size", "sm") :
            document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel") ?
          document.body.classList.remove("twocolumn-panel") :
          document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      document.getElementById("header-lang-img").setAttribute("src", flag);
      i18n.global.locale = locale;
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      }
    },
    initTopbarComponents() {
      function updateCartPrice() {
        var currencySign = "$";
        var subtotal = 0;
        Array.from(document.getElementsByClassName("cart-item-price")).forEach(function (e) {
          subtotal += parseFloat(e.innerHTML);
        });
        if (document.getElementById("cart-item-total")) {
          document.getElementById("cart-item-total").innerHTML = currencySign + subtotal.toFixed(2);
        }
      }
      if (document.getElementsByClassName("dropdown-item-cart")) {
        var dropdownItemCart = document.querySelectorAll(".dropdown-item-cart").length;
        Array.from(document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")).forEach(function (item) {
          item.addEventListener("click", function () {
            dropdownItemCart--;
            this.closest(".dropdown-item-cart").remove();
            Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
              e.innerHTML = dropdownItemCart;
            });
            updateCartPrice();
            if (document.getElementById("empty-cart")) {
              document.getElementById("empty-cart").style.display = dropdownItemCart == 0 ? "block" : "none";
            }
            if (document.getElementById("checkout-elem")) {
              document.getElementById("checkout-elem").style.display = dropdownItemCart == 0 ? "none" : "block";
            }
          });
        });
        Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
          e.innerHTML = dropdownItemCart;
        });
        if (document.getElementById("empty-cart")) {
          document.getElementById("empty-cart").style.display = "none";
        }
        if (document.getElementById("checkout-elem")) {
          document.getElementById("checkout-elem").style.display = "block";
        }
        updateCartPrice();
      }

      // notification messages
      if (document.getElementsByClassName("notification-check")) {
        Array.from(document.querySelectorAll(".notification-check input")).forEach(function (element) {
          element.addEventListener("click", function (el) {
            el.target.closest(".notification-item").classList.toggle("active");
          });
        });
      }
    }
  },
  computed: {},
  mounted() {
    if (process.env.VUE_APP_I18N_LOCALE) {
      this.flag = process.env.VUE_APP_I18N_LOCALE;
      this.languages.forEach((item) => {
        if (item.language == this.flag) {
          document.getElementById("header-lang-img").setAttribute("src", item.flag);
        }
      });
    }

    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
          "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

    this.isCustomDropdown();
    this.initTopbarComponents();
  },
  created() {
      this.user = this.$store.state.currentUser;

  }
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-dark.png" alt="" height="17" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-light.png" alt="" height="17" />
              </span>
            </router-link>
          </div>

          <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="position-relative">
              <input type="text" class="form-control" placeholder="Search..." autocomplete="off" id="search-options"
                value="" />
              <span class="mdi mdi-magnify search-widget-icon"></span>
              <span class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                id="search-close-options"></span>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <SimpleBar data-simplebar style="max-height: 320px">
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Recent Searches
                  </h6>
                </div>

                <div class="dropdown-item bg-transparent text-wrap">
                  <router-link to="/" class="btn btn-soft-secondary btn-sm rounded-pill">how to setup <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                  <router-link to="/" class="btn btn-soft-secondary btn-sm rounded-pill">buttons <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                </div>
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">
                    Pages
                  </h6>
                </div>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class=" ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                  <span>Analytics Dashboard</span>
                </b-link>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                  <span>Help Center</span>
                </b-link>

                <b-link href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class=" ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                  <span>My account settings</span>
                </b-link>

                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">
                    Members
                  </h6>
                </div>

                <div class="notification-list">
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </b-link>
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </b-link>
                  <b-link href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs" alt="user-pic" />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </b-link>
                </div>
              </SimpleBar>

              <div class="text-center pt-3 pb-1">
                <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                    class="ri-arrow-right-line ms-1"></i></router-link>
              </div>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown d-md-none topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-search fs-22"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown">
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                    <b-button variant="primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </b-button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="dropdown ms-1 topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img id="header-lang-img" src="@/assets/images/flags/us.svg" alt="Header Language" height="20"
                class="rounded" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <b-link href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                @click="setLanguage(entry.language, entry.title, entry.flag)" :class="{ active: lan === entry.language }"
                class="dropdown-item notify-item language py-2" data-lang="en" title="English">
                <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18" />
                <span class="align-middle">{{ entry.title }}</span>
              </b-link>
            </div>
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-category-alt fs-22"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
              <div class="
                                                          p-3
                                                          border-top-0 border-start-0 border-end-0 border-dashed border
                                                        ">
                <b-row class="align-items-center">
                  <b-col>
                    <h6 class="m-0 fw-semibold fs-15">Web Apps</h6>
                  </b-col>
                  <b-col cols="auto">
                    <b-link href="#!" class="btn btn-sm btn-soft-info">
                      View All Apps
                      <i class="ri-arrow-right-s-line align-middle"></i>
                    </b-link>
                  </b-col>
                </b-row>
              </div>

              <div class="p-2">
                <b-row class="g-0">
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/github.png" alt="Github" />
                      <span>GitHub</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/bitbucket.png" alt="bitbucket" />
                      <span>Bitbucket</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/dribbble.png" alt="dribbble" />
                      <span>Dribbble</span>
                    </b-link>
                  </b-col>
                </b-row>

                <b-row class="g-0">
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                      <span>Dropbox</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/mail_chimp.png" alt="mail_chimp" />
                      <span>Mail Chimp</span>
                    </b-link>
                  </b-col>
                  <b-col>
                    <b-link class="dropdown-icon-item" href="#!">
                      <img src="@/assets/images/brands/slack.png" alt="slack" />
                      <span>Slack</span>
                    </b-link>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>


          <div class="ms-1 header-item d-none d-sm-flex">
            <b-button type="button" variant="ghost-secondary" class="btn-icon btn-topbar rounded-circle"
              data-toggle="fullscreen" @click="initFullScreen">
              <i class="bx bx-fullscreen fs-22"></i>
            </b-button>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <b-button type="button" variant="ghost-secondary" class="btn-icon btn-topbar rounded-circle light-dark-mode"
              @click="toggleDarkMode">
              <i class="bx bx-moon fs-22"></i>
            </b-button>
          </div>


          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar" />
                <span class="text-start ms-xl-2">
                  <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{ user.prenom + ' ' + user.nom }} </span>
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{{ user.type.nom }}</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <h6 class="dropdown-header">{{ $t('t-welcome') }} {{user.nom}}!</h6>
              <router-link class="dropdown-item" to="/pages/profile"><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span>
              </router-link>


              <div class="dropdown-divider"></div>

              <router-link class="dropdown-item" to="/pages/profile-setting">
                  <i class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">{{ $t('t-settings') }}</span>
              </router-link>

              <b-link class="dropdown-item" href="/logout"><i
                  class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">{{$t('t-logout')}}</span>
              </b-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>