import { mailService } from "../services/mail.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="mail-edit">
           <header class="flex"><span>New Message</span><span>X</span> </header>
            <form @submit.prevent="save">
                <input ref="to" type="text" v-model="mailToEdit.to" class="to">
                <input ref="to" type="text" v-model="mailToEdit.subject" class="flex">
                <textarea  ref="to" type="text-area" v-model="mailToEdit.body" class="flex">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            mailToEdit: mailService.getEmptyMail(),
        }
    },
    created() {
        const mailId = this.$route.params.id
        if (mailId) {
            this.mailToEdit = mailService.get(mailId)
                .then(mail => this.mailToEdit = mail)
        }
    },
    mounted() {
        this.$refs.to.focus()
    },
    methods: {
        save() {
            mailService.save(this.mailToEdit)
                .then(mail => {
                    debugger
                    showSuccessMsg(`Mail saved (Mail id: ${mail.id})`)
                    this.$router.push('/mail')
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot save mail`)
                })
        }
    }
}