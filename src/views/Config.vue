<template>
  <v-main>
    <!-- <router-link to="/">HOME</router-link> -->
    <v-card elevation="3" class="ma-5">
      <form class="pa-5">
        <v-text-field
          v-model="browserPath"
          label="Local de Instalação do Chrome"
        ></v-text-field>
        <v-btn @click="enviarFormConfig"> enviar </v-btn>
        <v-btn class="mx-3">
          <router-link to="/" tag="span" class="">voltar</router-link>
        </v-btn>
      </form>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: "config",

  data() {
    return {
      browserPath: null,
    };
  },

  methods: {
    enviarFormConfig() {
      window.ipcRenderer.send("saveConfig", this.browserPath);
    },
  },

  created() {
    window.ipcRenderer.receive("alertSucess", (event, arg) => {
      alert(arg)
    });
    window.ipcRenderer.receive("alertDanger", (event, arg) => {
      alert(arg)
    });
  },
};
</script>

<style>



</style>