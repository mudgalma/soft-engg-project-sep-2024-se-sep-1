<script>
import StatisticsCard from './StatisticsCard.vue';
import ProgressComponent from './ProgressComponent.vue';

export default {
  props: {
    students: Object,
    project_id: Number,
  },
  data() {
    return {
      newStudent: { name: "", email: "" },
      student_loading: false,
      last_clicked: null,
      id: -1,
      student_id: null,
    };
  },
  components: {
    ProgressComponent,
  },
  methods: {
        async addStudents(event){
            event.preventDefault();
            let form = document.getElementById('add_student');
            let formData = new FormData(form);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/students/bulk-upload/` + localStorage.getItem('user_id') + '/' + this.project_id, {
                method: 'POST',
                headers: {
                    'Authentication-Token': localStorage.getItem('token'),
                },
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
                alert(result.error);
                return;
            }
            this.$emit('new-students');
      },
      async deleteStudent(event) {
        event.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/students/` + localStorage.getItem('user_id') + '/' + this.project_id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('token'),
          },
          body: JSON.stringify({ id: this.id }),
        });
        const result = await response.json();
        if (!response.ok) {
          alert(result.error);
          return;
        }
        this.$emit('new-students');
      },
      changeStuff(id){
        //console.log(id);
        this.student_id = id;
        let ele = document.getElementById(id);
        //console.log(ele);
        if(this.last_clicked != null){
            let last_ele = document.getElementById(this.last_clicked);
            if(last_ele != null){
            last_ele.classList.remove("clicked");
            last_ele.classList.add("unclicked");
            }
        }
        ele.classList.remove("unclicked");
        ele.classList.add("clicked");
        this.last_clicked = id;
    },
    changeId(id){
        this.id = id;
    },
},
    mounted(){
    if(this.students.length > 0){
        this.changeStuff(this.students[0].id);
    }
  },
  };
</script>
