import { notesService } from '../services/note.service.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
  template: `
        <section class="main-layout">
          <h1>Notes Index</h1>
          <note-list :notes="notesToShow" @remove="remove"/>  
        </section>
    `,
  data() {
    return {
      notes: [],
      selectedNote: null,
      filterBy: {},
    }
  },
  methods: {
    remove(noteId) {
        notesService.remove(noteId).then(() => {
        const idx = this.notes.findIndex((note) => note.id === noteId)
        this.notes.splice(idx, 1)
      })
      // this.$emit('remove', noteId)
    },
    getNotes() {
      notesService.query().then(notes => this.notes = notes)
    },
    filter(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    notesToShow() {
      // const regex = new RegExp(this.filterBy.title, 'i')
      // return this.notes.filter((note) => regex.test(note.info))
      return this.notes
    },
  },
  created() {
    this.getNotes()
  },
  components: {
    noteList,
  },
}
