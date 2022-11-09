export default {
  props: ['note'],
  template: `
        <section class="note-preview">
            <h2>{{ note.type }}</h2>
            <!-- <img :src="imgUrl" alt=""> -->
            <h3>{{ note.info }}</h3>
        </section>
    `,
  computed: {
    // imgUrl() {
    //   return this.note.info.url
    //   }
    },
}