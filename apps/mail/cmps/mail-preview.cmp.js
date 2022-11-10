
export default {
    props: ['mail'],
    template: `
          <section 
          class="mail-preview clickable" v-bind:class="mailStyle" >
           <div class="marks-container">⭐✡️</div>
              <div class="name-container">{{ mail.name }} </div>

          <div class="subject-body"> <div>{{ mail.subject }} &nbsp </div> <div> {{ mail.body }}
          </div>
          </div>      
             

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
                const hour = date.getHours()
                let minute = date.getMinutes()
                minute = (minute + '').padStart(2, '0')
                return `${hour}:${minute}`
            }
            var options = { day: "numeric", month: "short" };
            return new Date(this.mail.sentAt).toLocaleDateString("en-US", options);
        }

    },
}