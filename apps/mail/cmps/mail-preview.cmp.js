export default {
    props: ['mail'],
    template: `
          <section class="mail-preview">
              <h2>{{ mail.title }}</h2>
              <!-- <img :src="imgUrl" alt=""> -->
              <h3>{{ mail.body }}</h3>
          </section>
      `,
    computed: {
        // imgUrl() {
        //   return this.mail.info.url
        //   }
    },
}