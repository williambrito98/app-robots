<template>
  <v-app>
    <v-navigation-drawer app> </v-navigation-drawer>

    <v-app-bar color="orange darken-1" dense dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Robos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="itemMenu in itensMenu" :key="itemMenu.title">
            <v-icon>{{ itemMenu.icon }}</v-icon>
            <v-list-item-title>
              <router-link tag="button" to="/config">{{ itemMenu.title }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <router-view></router-view>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: "App",
  data: () => ({
    robots: [],
    itensMenu: [
      {
        title: "Configurações",
        icon: "mdi-cog-outline",
      },
    ],
    isPlaying: true,
  })
};
</script>


<style>
::-webkit-scrollbar {
  display: none;
}
.loader {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
