const notetxt = {
  template: `
    <section class="notetxt">
      <h1>this is text note</h1>
      <p>{{ note }}</p>
    </section>
    `,
 
}

const noteimg = {
  template: `
    <section class="note-img">
        <h1>This is img note</h1>
        <h2>{{ info }}</h2>
        <img src="imgUrl" alt="">
    </section>
    `,
  methods: {},
  computed: {
    imgUrl() {
      return this.note.info.url
    },
  },
}

export default {
  props: ['note'],
  template: `
        <section class="note-preview flex">
            <component :is="getType"></component>
        </section>
    `,
  data() {
    return {
      currNote: this.note,
      noteType: this.getType,
      pageCmps: ['notetxt', 'noteimg'],
    }
  },
  computed: {
    getType() {
      console.log(this.note)
      return this.note.type.replace('-', '')
    },
  },
  components: {
    notetxt,
    noteimg,
  },
}
