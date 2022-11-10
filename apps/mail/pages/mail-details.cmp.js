import { mailService } from '../services/mail.service.js'
import { eventBus, removeMailFromREnder } from "../../../services/event-bus.service.js"





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
  </section>`,
  data() {
    return {
      mail: null
    }
  },
  created() {
    const { id } = this.$route.params
    mailService.get(id)
      .then(mail => {
        this.mail = mail
        removeMailFromREnder(id)
      })
  },
  methods: {
    remove() {
      mailService.remove(this.mail.id).then(
        this.$router.go(-1)
      )
    }
  }
}