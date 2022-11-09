import notePreview from '../cmps/note-preview.cmp.js'
import { notesService } from '../services/note.service.js'

export default {
  template: `
        <section class="main-layout">
            <h1>Notes Index</h1>
            <ul class="notes-list flex">
                <li class="flex" v-for="note in notes" :key="note.id">
                    <note-preview :note="note"/>
                    <section class="actions">
                        <router-link :to="'/notes/' + note.id">Details</router-link> |
                        <button @click="remove(note.id)">x</button>
                    </section>
                </li>
            </ul>
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
      notesService.query().then((notes) => {
        console.log(notes), (this.notes = notes)
      })
    },
  },
  created() {
    this.getNotes()
  },
  components: {
    notePreview,
  },
}
