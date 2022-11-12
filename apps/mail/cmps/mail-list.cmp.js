import { eventBus } from '../../../services/event-bus.service.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
               
                    <mail-preview :mail="mail"/>
               
</li>
</ul>
</section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
    },
    components: {
        mailPreview,
    },

}