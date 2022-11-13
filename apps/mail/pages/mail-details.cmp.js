import { mailService } from '../services/mail.service.js'
import { removeMail, showUserMsg, followUp } from "../../../services/event-bus.service.js"





export default {
  template: `<section v-if="mail" class="mail-details">
    <section class="mail-details title flex "> 
      <div>
        <span class="mail-subject">{{mail.subject}}</span>
      </div>  
      <div class="mail-details-buttons">
      <button title="Go back to mails" style="background-image: url('/assets/img/buttons/back30x30.png')" @click="$router.go(-1)">	
         </button>
         <button title="Delete this mail" style="background-image: url('/assets/img/buttons/trash30x30.png')" @click="remove()"> </button> 
      </div>
    </section> 
    
    <div class="mail-details from-container flex">
    <span class="detail-mail name">{{mail.name}}</span>
    <span class="detail-mail from">&lt{{mail.from}}&gt</span>
    </div>
    <div class= "mail-details mail-body-container">
    <pre class= "mail-body">{{mail.body}}</pre>
    </div>
    
  </section>
  `,
  data() {
    return {
      mail: null,
      id: null,
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    mailService.get(id).then((mail) => {
      this.mail = mail
      this.mail.isRead = true
      mailService.save(this.mail)
    })
  },
  methods: {
    remove() {
      mailService.remove(this.mail.id).then((mail) => {
        showUserMsg(`Mail Deleted`)
        this.$router.push('/mail')
      })
    },
    reply() {
      this.mail.history = { ...this.mail }
      followUp(this.mail.history)
    },
  },
}