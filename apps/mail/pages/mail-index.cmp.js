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
        <router-link to="/mail/edit">Add a mail</router-link>
        <mail-list 
            @remove="removeMail" 
            :mails="mailsToShow"/>
            <editMail></editMail>

    </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: {
        name: '',
      },
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
          console.log(this.mails.length)
        })
        .catch(err => {
          console.log('OOPS', err)

        })

    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    removeFromList(mailId) {
      console.log(mailId)
      const idx = this.mails.findIndex(mail => mail.id === mailId)

      this.mails.splice(idx, 1)
    }
  },
  computed: {
    mailsToShow() {
      const regex = new RegExp(this.filterBy.name, 'i')
      var mails = this.mails.filter(mail => regex.test(mail.name))
      console.log(this.mails.length)
      return mails

    }
  },
  components: {
    mailFilter,
    mailList,
    editMail
  }
}