import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <table class="mail-list main-layout">
            <!-- <ul class="clean-list"> -->
                <tr v-for="mail in mails" :key="mail.id">
                <router-link :to="'/mail/' + mail.id">
                    <mail-preview :mail="mail"/>
                    </router-link>
                   
                        <!-- <router-link :to="'/mail/' + mail.id">Details</router-link> | -->
                        <!-- <router-link :to="'/mail/edit/' + mail.id">Edit</router-link> | -->
                        <!-- <button @click="remove(mail.id)">x</button> -->
                  
            <!-- </ul> -->
</table>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
    },
    components: {
        mailPreview,
    }
}