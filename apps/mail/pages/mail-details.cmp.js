import { mailService } from '../services/mail.service.js'


export default {
  template: `<section v-if="mail" class="main-layout">
    <h1 class="detail-mail title">{{mail.subject}}</h1>
    <div class="flex">
      
    <h1 class="detail-mail name">{{mail.name}}</h1>
    <h1 class="detail-mail from"><{{mail.from}}></h1>
    <p>{{mail.body}}
</div>
  </section>`,
  data() {
    return {
      mail: null
    }
  },
  created() {
    const { id } = this.$route.params
    mailService.get(id)
      .then(mail => this.mail = mail)
  }
}