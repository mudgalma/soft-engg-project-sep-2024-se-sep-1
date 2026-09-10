<script>
import ProgressComponent from './ProgressComponent.vue';

  export default {
    props: {
      project_id: Number,
    },
    data() {
      return {
        chatMessages: [],
        newQuestion: "",
        summary_flag: true,
        document_summary: "",
        instructor_id: localStorage.getItem('user_id')
      };
    },
    methods: {
        async previousChat(){
            let response = await fetch(`${import.meta.env.VITE_API_URL}/chat/` + this.instructor_id + '/' + this.project_id, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authentication-Token': localStorage.getItem('token')
                },
            });
            let result = await response.json();
            if (!response.ok) {
                alert(result.error);
                return;
            }
            this.chatMessages = result.response;
        },
    async llm (question) {
    // Call the llm API
    let response = await fetch(`${import.meta.env.VITE_API_URL}/ask/` + this.instructor_id + '/' + this.project_id, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify({
        'question' : question
        }),
    })
    let result = await response.json()
    if (!response.ok) {
        alert(result.error)
        return
    }
       return result.response
    },
    async summary () {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/ask/` + this.instructor_id + '/' + this.project_id, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify({
        'question' : 'What is the summary of the document ?'
        }),
    })
    let result = await response.json()
    if (!response.ok) {
        alert(result.error)
        return
    }
        this.document_summary = result.response
        this.summary_flag = false
    },
      async submitQuestion() {
        if (this.newQuestion.trim()) {
          this.chatMessages.push({ type: "question", text: this.newQuestion });
          this.chatMessages.push({ type: "answer", text: await this.llm(this.newQuestion) });
          this.newQuestion = "";
        }
      },
    },
    async created() {
        await this.previousChat();
    }
  };
</script>
