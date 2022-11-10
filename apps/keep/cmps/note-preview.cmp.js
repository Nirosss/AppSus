const notetxt = {
  props:['note'],
  template: `
      <section class="notetxt">
      <p>{{ note.info.txt }}</p>
    </section>
    `,
 
}

const noteimg = {
  props: ['note'],
  template: `
    <section class="note-img">
      <img :src="imgUrl" alt="">
      <h2>{{ note.info.title }}</h2>
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
            <component :is="getType" :note="note"></component>
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
    imgUrl() {
      return this.note.info.url
    },
  },
  components: {
    notetxt,
    noteimg,
  },
}
