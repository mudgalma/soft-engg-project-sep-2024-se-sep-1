<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/instructor/dashboard" active-class="active-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/instructor/projects" active-class="active-link">Projects</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/instructor/students" active-class="active-link">Students</router-link>
            </li>
          </ul>
        </div>
      </div>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="pt-3 pb-2 mb-3 border-bottom">
          <h1>Instructor Dashboard</h1>
        </div>
        <InstructorDashboard v-if="!loading" :project_id="project_id" />
      </main>
    </div>
  </div>
</template>

<script>
import InstructorDashboard from '../components/InstructorDashboard.vue'

export default {
  name: 'Instructor',
  components: {
    InstructorDashboard,
  },
  data() {
    return {
      projects: [],
      project_id: 1,
      current_project: '',
      type: this.$route.params.type,
      loading: true
    }
  },
  watch: {
    '$route.params.type': function(){
      this.type = this.$route.params.type
    },
  },
  methods: {
    async getProjects(){
      this.loading = true;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/` + localStorage.getItem('user_id'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.error);
        return;
      }
      this.projects.value = result.projects;
      this.current_project = this.projects.value[0].title;
      this.loading = false;
    },
    changeProject(project_id){
      this.project_id = project_id;
      this.current_project = this.projects.value.find(project => project.project_id == project_id).title;
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  async created(){
    await this.getProjects();
  }
}
</script>
