
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
        },
        time() {
            if (Date.now() - this.mail.sentAt < 1000 * 60 * 60 * 24) {
                const date = new Date(this.mail.sentAt);
                return date.toLocaleTimeString()
            }
            var options = { day: "numeric", month: "short" };
            return new Date(this.mail.sentAt).toLocaleDateString("en-US", options);
        }

    },
}