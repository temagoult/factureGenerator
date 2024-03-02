import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

// Translation provided by Vuetify (javascript)
import fr from "vuetify/lib/locale/fr";

// Translation provided by Vuetify (typescript)

Vue.component("my-component", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "fr";
    },
  },
}),
  Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: "fr",
  },
});