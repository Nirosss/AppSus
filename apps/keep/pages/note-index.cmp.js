import { notesService } from '../services/note.service.js'
import {  eventBus } from '../../../services/event-bus.service.js'
import noteList from '../cmps/note-list.cmp.js'
import createNote from '../cmps/create-note.cmp.js'

export default {
  template: `
        <section >
          <createNote @addNote="addNewNote"/>
          <note-list :notes="notesToShow" />  
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
    removeNote(noteId) {
      notesService.remove(noteId).then(() => {
        const idx = this.notes.findIndex((note) => note.id === noteId)
        this.notes.splice(idx, 1)
      })
      
    },
    getNotes() {
      notesService.query().then(notes => this.notes = notes)
    },
    filter(filterBy) {
      this.filterBy = filterBy
    },
    addNewNote(note){
      this.notes.unshift(note)
    }
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
    eventBus.on('addNewNote',this.addNewNote)
    eventBus.on('removeNote', this.removeNote)
  },
  components: {
    noteList,
    createNote,
  },
}
