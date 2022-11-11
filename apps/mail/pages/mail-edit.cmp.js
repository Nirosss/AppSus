import { mailService } from "../services/mail.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="mail-edit">
           <header class="flex"><span>New Message</span><span @click='closeEdit'>X</span> </header>
            <form @submit.prevent="save">
                <input ref="to" type="text" v-model="mailToEdit.to" class="to"/>
                <input  type="text" v-model="mailToEdit.subject" class="flex"/>
                <textarea  type="text-area" v-model="mailToEdit.body" class="center"></textarea>
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            mailToEdit: mailService.getEmptyMail(),
        }
    },
    created() {
        eventBus.on('followUp', this.showMsg)
        // eventBus.on('show-msg', this.showMsg)
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
                    showSuccessMsg(`Mail saved (Mail id: ${mail.id})`)
                    this.$router.push('/mail')
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot save mail`)
                })
        },
        closeEdit() {
            this.mailToEdit.lable = "draft";
            console.log(this.mailToEdit.lable)
            this.save()
            this.$emit('closeModal')
        }
    }
}