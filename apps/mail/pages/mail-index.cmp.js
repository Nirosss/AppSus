import { mailService } from '../services/mail.service.js'
import { eventBus } from "../../../services/event-bus.service.js"

import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import editMail from '../pages/mail-edit.cmp.js'

export default {
  name: 'mail-index',
  template: `
    <section class="mail-app">
        <mail-filter @filter="setFilter"/>
        <div @click='edit=true'>Compose</div>
        <mail-list 
            @remove="removeMail" 
            :mails="mailsToShow"/>
            <div v-if="edit">  <editMail @closeModal="edit = false"></editMail></div>
          

    </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: {
        name: '',
        draft: false
      },
      edit: false
    }
  },
  created() {
    eventBus.on('removeMail', this.removeMail)
    mailService.query()
      .then(mails => {
        this.mails = mails
      })
  },
  methods: {
    removeMail(mailId) {
      console.log(mailId)
      mailService.remove(mailId)
        .then(() => {
          const idx = this.mails.findIndex(mail => mail.id === mailId)
          this.mails.splice(idx, 1)
        })
        .catch(err => {
          console.log('OOPS', err)

        })

    },
    setFilter(filterBy) {

      this.filterBy = filterBy
      console.log(this.filterBy.draft)
    },
    checky() {
      this.edit = false
      console.log("edit:", this.edit)
    }
  },
  computed: {
    mailsToShow() {
      const regex = new RegExp(this.filterBy.name, 'i')
      if (this.filterBy.draft) {
        var mails = this.mails.filter(mail => (regex.test(mail.name) && mail.lable === "draft"))
        return mails
      }
      var mails = this.mails.filter(mail => (regex.test(mail.name) && mail.lable != "draft"))
      return mails

    }
  },
  components: {
    mailFilter,
    mailList,
    editMail
  }
}