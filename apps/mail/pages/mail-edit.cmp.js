import { mailService } from "../services/mail.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section class="mail-edit">
           <header class="new-mail-header flex full justify-between"><span>New Message</span><span @click='closeEdit' title="Close">X</span> </header>
            <form @submit.prevent="save">
                <input ref="to" type="text" v-model="mailToEdit.to" placeholder="Recipients" class="to"/>
                <input  type="text" v-model="mailToEdit.subject" class="flex" placeholder="Subject"/>
                <textarea  type="text-area" v-model="mailToEdit.body" class="center" placeholder="Type your message"></textarea>
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
                    this.$emit('closeModal')
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