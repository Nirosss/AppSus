import notePreview from '../cmps/note-preview.cmp.js'
import { notesService } from '../services/note.service.js'

export default {
  template: `
        <section class="note-list">
            <h1>Notes Index</h1>
            <ul>
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
      notes:null,
      selectedNote: null,
      filterBy: {},
    }
  },
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    getNotes() {
      notesService.query().then((notes) => (this.notes = notes))
    },
  },
  created() {
    this.getNotes()
  },
  components: {
    notePreview,
  },
}
