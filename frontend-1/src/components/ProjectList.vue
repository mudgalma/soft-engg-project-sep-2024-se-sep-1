<script>
export default {
  data() {
    return {
      projects: [],
      project_id: null,
      title: null,
      description: null,
      instructors: null,
      students: null,
      last_clicked: null,
      stats: {},
      project_loading: true,
    }
  },
  methods: {
    async addProject(event) {
      event.preventDefault();
      // Get all details from form, title, description, and instructors
      let form = document.getElementById("add_project");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authentication-Token': localStorage.getItem('token')
         },
         body: JSON.stringify({
             'title': form.title.value,
             'description': form.description.value,
             'instructors': form.instructor_email.value.split(",")
         })
      });
      const data = await response.json();
      if (!response.ok){
          alert(data.error);
          return;
      }
      this.projects.push({project_id: data.project.project_id, title: data.project.title, description: data.project.description, students: 0, instructors: data.project.instructors, students: 0});
      this.project_id = null;
    },
    async deleteProject(event){
      event.preventDefault();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/` + this.project_id, {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
             'Authentication-Token': localStorage.getItem('token')
         }
      });
      let result = await response.json();
      if (!response.ok){
          alert(result.error);
          return;
      }
      // Remove the project from the list
      for (let i = 0; i < this.projects.length; i++){
          if (this.projects[i].project_id == this.project_id){
              this.projects.splice(i, 1);
          }
      }
      // If the project is the only one, reset the display
      if(this.projects.length == 0){
          this.changePanel(null);
      }
      // If the project is currently being displayed, update the display
      if(this.last_clicked == this.project_id){
          this.changeStuff(this.projects[0].project_id);
      }
    },
    // Fetch data from APIs
    async fetchChartData(){
    try {
        // Fetch project data
        const projectResponse = await fetch(`${import.meta.env.VITE_API_URL}/projects/statistics-1/` + this.project_id,{
        headers: {
            'Authentication-Token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        });
        if (projectResponse.ok) {
        const projectData = await projectResponse.json();
        this.total_milestones = projectData.total_milestones;
