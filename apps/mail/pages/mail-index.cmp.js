import { mailService } from '../services/mail.service.js'
import { eventBus } from "../../../services/event-bus.service.js"




// import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
  name: 'mail-index',
  template: `
    <section class="mail-app">
        <!-- <mail-filter @filter="setFilter"/> -->
        <router-link to="/mail/edit">Add a mail</router-link>
        <mail-list 
            @remove="removeMail" 
            :mails="mailsToShow"/>
    </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: {
        vendor: '',
        minSpeed: 0
      },
    }
  },
  created() {
    eventBus.on('removeMailFromREnder', this.removeFromList)
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
          // showSuccessMsg(`Mail ${mailId} deleted`)
        })
        .catch(err => {
          console.log('OOPS', err)
          // showErrorMsg('Cannot remove mail')
        })

    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    removeFromList(id) {
      console.log(id)
    }
  },
  computed: {
    mailsToShow() {
      // const regex = new RegExp(this.filterBy.vendor, 'i')
      // var mails = this.mails.filter(mail => regex.test(mail.vendor))
      // mails = mails.filter(mail => mail.maxSpeed > this.filterBy.minSpeed)
      // return mails
      return this.mails

    }
  },
  components: {
    // mailFilter,
    mailList,
  }
}