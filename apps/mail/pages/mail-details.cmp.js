import { mailService } from '../services/mail.service.js'
import { removeMail, showUserMsg, followUp } from "../../../services/event-bus.service.js"





export default {
  template: `<section v-if="mail" class=" mail-details">
    <h1 class="subject-container">{{mail.subject}}</h1>

      <div class="buttons-container">
        
      <button @click="$router.go(-1)">	
        <img src="assets/img/back.png" alt="Delete">

      </button>

        <button @click="remove()">	
      	<img src="assets/img/trash.png" alt="Delete">
      </button> 
     
    </div>

      <div class="from-container flex">
    <h1 class="detail-mail name">{{mail.name}}</h1>
    <h1 class="detail-mail from"><{{mail.from}}></h1>
</div>
    <pre class= "mail-body-container">{{mail.body}}</pre>
    <button @click="reply">Reply</button>
  </section>`,
  data() {
    return {
      mail: null,
      id: null
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    mailService.get(id)
      .then(mail => {
        this.mail = mail
      })
  },
  methods: {
    remove() {
      mailService.remove(this.mail.id)
        .then(mail => {
          showUserMsg(`Mail Deleted`)
          this.$router.push('/mail')
        })
    },
    reply() {
      this.mail.history = { ...this.mail }
      followUp(this.mail.history)
    }
  }
}