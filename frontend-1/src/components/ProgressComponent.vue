<script>
import ProgressComponent from './ProgressComponent.vue';

export default {
  props: {
    project_id: Number,
  },
  data() {
    return {
      milestones: [],
      loading: false,
      error: null,
      require_url: false,
      url: '',
      student_id: localStorage.getItem('user_id'),
      commits: [],
      role: localStorage.getItem('role'),
    }
  },
  methods: {
    async fetchMilestones() {
      this.loading = true;
      this.error = null;
      if (!this.student_id) {
        this.error = "Student ID not provided.";
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student/milestones/` + this.student_id + '/' + this.project_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      if (!response.ok) {
        this.error = result.error;
        return;
      }
      this.milestones = result.milestones;
      // Remove milestones with <=0 weightage
      this.milestones = this.milestones.filter((milestone) => milestone.weightage > 0);
    },
    async fetchCommitHistory() {
      this.loading = true;
      this.error = null;

      if (this.student_id === null) {
        this.error = "Student ID not provided.";
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/commit_history/` + this.student_id + '/' + this.project_id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authentication-Token': localStorage.getItem('token'),
            },
          }
        )
