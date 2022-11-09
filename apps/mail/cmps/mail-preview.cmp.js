
export default {
    props: ['mail'],
    template: `
          <!-- <section class="mail-preview flex main-layout clickable" v-bind:class="mailStyle" > -->
          <section 
          class="mail-preview flex main-layout clickable" v-bind:class="mailStyle" >
           <td class="first-col">
              <span class="from">{{ mail.from }} &nbsp</span>
</td>
<span class="from">{{ mail.subject }}- &nbsp</span>
              <td>
              <span class="email-body">{{ mail.body }}</span>
</td>
<td class="last-col">Time</td>
</section>
      `,
    computed: {
        mailStyle() {
            return { opened: this.mail.isRead }
        }
    },
    methods: {
    }
}