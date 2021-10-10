<template>
  <!-- App.vue -->
  <v-main>
    <v-container fluid>
      <v-list subheader two-line>
        <v-list-item v-for="(robot, index) in robots" :key="index" @click="configRobot(robot.title)">
          <v-list-item-avatar>
            <v-icon class="teal lighten-2" dark> mdi-robot-outline </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="robot.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="play(robot.title, index)">
              <v-icon v-if="isPlaying" color="green darken-4"
                >mdi-play-circle</v-icon
              >
              <v-icon v-else class="loader" color="green darken-4"
                >mdi-loading</v-icon
              >
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
</template>


<script>
export default {
  name: "App",
  data: () => ({
    isPlaying: true,
    robots : null
  }),
  methods: {
    play(robot, index) {
      window.ipcRenderer.send("run", robot);
      window.ipcRenderer.receive("response", (event, arg) => {
        this.robots[index].pid = arg;
        this.isPlaying = false;
      });
    },
    close(index) {
      if (this.robots[index].pid == 0) return;
      window.ipcRenderer.send("kill", this.robots[index].pid);
      this.isPlaying = true;
    },
    configRobot(robot) {
      this.$router.push({path: `/configRobot/${robot}`})
    }
  },
  created() {
    this.robots = window.robots.getAll().map((item) => {
      return { title: item };
    });
  },
};
</script>


<style>
</style>