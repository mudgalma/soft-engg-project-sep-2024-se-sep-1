<script>
export default {
    data(){
        return {
            student_id: localStorage.getItem('user_id'),
            project_id: 1,
            projects: ref([]),
            milestones: ref([]),
            current_project: '',
            type: this.$route.params.type,
            id: this.$route.params.id,
            loading: true,
        }
    },
    watch: {
        '$route.params.type': function(){
            this.type = this.$route.params.type
        },
        '$route.params.id': function(){
            this.id = this.$route.params.id
        }
    },
    methods: {
        async getProjects(){
            this.loading = true;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/student/projects/` + localStorage.getItem('user_id'), {
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
