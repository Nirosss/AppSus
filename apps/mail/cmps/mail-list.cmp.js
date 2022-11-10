import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list main-layout">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                <router-link :to="'/mail/' + mail.id">
                    <mail-preview :mail="mail"/>
                    </router-link>
                   
                        <!-- <router-link :to="'/mail/' + mail.id">Details</router-link> | -->
                        <!-- <router-link :to="'/mail/edit/' + mail.id">Edit</router-link> | -->
                        <!-- <button @click="remove(mail.id)">x</button> -->
                  
            <!-- </ul> -->
</section>
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