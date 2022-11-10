import { notesService } from '../services/note.service.js'
import { eventBus, removeNote, showUserMsg } from "../../../services/event-bus.service.js"





export default {
  template: `<section v-if="note" class=" note-details">
    <img :src="imgUrl" alt="">
    <h1 class="subject-container">{{note.info.txt}}</h1>

    <ul class="todos">
        <li v-for="(todo,idx) in note.info.todos" @click="toggleToDo(idx)"
        :class="isDone(idx)">{{todo.txt}}  Done: {{this.doneAtDate(idx)}}
        </li>
      </ul>


      <div class="buttons-container">
        
      <button @click="$router.go(-1)">	
        <img src="assets/img/back.png" alt="Delete">

      </button>

        <button @click="remove()">	
      	<img src="assets/img/trash.png" alt="Delete">
      </button> 
     
    </div>

      <div class="from-container flex">
    <h1 class="detail-note name">{{note.name}}</h1>
    <h1 class="detail-note from"><{{note.from}}></h1>
</div>
    <pre class= "note-body-container">{{note.body}}</pre>
  </section>`,
  data() {
    return {
      note: null,
      id: null
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    notesService.get(id)
      .then(note => {
        this.note = note
        console.log(note)
      })
  },
  computed: {
    imgUrl() {
      console.log(this.note.info.url)
      return this.note.info.url
    },
  },
  methods: {
    remove() {
      removeNote(this.id)
      showUserMsg({ txt: "note deleted" })
      this.$router.go(-1)
    },
    doneAtDate(idx) {
      let doneAt = this.note.info.todos[idx].doneAt
      if (doneAt) {
        let date = new Date(doneAt)
        return date.toDateString().slice(4, 10)
      }
    },
    toggleToDo(idx) {
      if (this.note.info.todos[idx].doneAt) return this.note.info.todos[idx].doneAt = null
      this.note.info.todos[idx].doneAt = Date.now()
    },
    isDone(idx) {
      return { done: !this.note.info.todos[idx].doneAt }
    }
  },
}
