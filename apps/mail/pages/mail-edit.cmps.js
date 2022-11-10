import { mailService } from "../services/mail.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="mail-edit">
            <h1>Mail Edit</h1>
            <form @submit.prevent="save">
                <input ref="vendor" type="text" v-model="mailToEdit.vendor">
                <input type="number" v-model.number="mailToEdit.maxSpeed">
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
        this.$refs.vendor.focus()
    },
    methods: {
        save() {
            mailService.save(this.mailToEdit)
                .then(mail => {
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