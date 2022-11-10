
export default {
    props: ['mail'],
    template: `
          <!-- <section class="mail-preview flex main-layout clickable" v-bind:class="mailStyle" > -->
          <section 
          class="mail-preview main-layout clickable" v-bind:class="mailStyle" >
           <div class="marks-container">⭐✡️</div>
              <div class="name-container">{{ mail.name }} </div>

          <div class="subject-body">{{ mail.subject }}- &nbsp   {{ mail.body }}</div>      
             

            <div class="changeable-container">{{time}}</div>
</section>
      `,
    computed: {
        mailStyle() {
            return { opened: this.mail.isRead }
        }
    },
    computed: {
        time() {
            console.log("time")
            if (Date.now() - this.mail.sentAt < 1000 * 60 * 60 * 24) {
                const date = new Date(this.mail.sentAt);
                return date.toLocaleTimeString()
            }
            const date = new Date(this.mail.sentAt);
            const month = date.getMonth() + 1
            const day = date.getDate()
            return [month, day].join("/")

        }
    }
}