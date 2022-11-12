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
        <!-- <button class="new-mail btn" @click='edit=true'>Compose</button> -->
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
        label: "sent"
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
    }
  },
  computed: {
    mailsToShow() {
      const regex = new RegExp(this.filterBy.name, 'i')
      if (this.filterBy.folder === "star") {
        var mails = this.mails.filter(mail => (regex.test(mail.name) && mail.label === "star"))
        return mails
      }
      var mails = this.mails.filter(mail => (regex.test(mail.name) && mail.label != "draft"))
      if (this.filterBy.folder != 'inbox') {
        console.log(this.filterBy.folder)
        mails = mails.filter(mail => mail.label === this.filterBy.folder)
      }
      return mails
    }
  },
  components: {
    mailFilter,
    mailList,
    editMail
  }
}