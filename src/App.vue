<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

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
          <v-list-item
            v-for="itemMenu in itensMenu"
            :key="itemMenu.title"
            @click="() => {}"
          >
            <v-icon>{{ itemMenu.icon }}</v-icon>
            <v-list-item-title>{{ itemMenu.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-list subheader two-line>
          <v-list-item v-for="(robot, index) in robots" :key="index">
            <v-list-item-avatar>
              <v-icon class="teal lighten-2" dark> mdi-robot-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="robot.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="play(robot.title, index)">
                <v-icon v-if="isPlaying" color="green darken-4">mdi-play-circle</v-icon>
                 <v-icon v-else class="loader" color="green darken-4">mdi-loading</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="!isPlaying">
              <v-btn icon @click="close(index)">
                <v-icon color="red darken-4">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>

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
    isPlaying: true
  }),
  methods: {
    play(robot, index) {
      window.ipcRenderer.send("run", robot);
      window.ipcRenderer.receive("response", (event, arg) => {
        this.robots[index].pid = arg;
        this.isPlaying = false
      });
    },
    close(index) {
      if (this.robots[index].pid == 0) return;
      window.ipcRenderer.send("kill", this.robots[index].pid);
      this.isPlaying = true
    },
  },
  created() {
    this.robots = window.robots.getAll().map((item) => {
      return { title: item };
    });
  },
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>