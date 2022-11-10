import { removeNote } from '../../../services/event-bus.service.js'
import { notesService } from '../services/note.service.js'

const notetxt = {
  props: ['note'],
  template: `
      <section class="note-txt">
      <h3>{{ note.info.txt }}</h3>
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

const notetodos = {
  props: ['note'],
  template: `
    <section class="note-todos">
      <h2>{{ note.info.lable }}</h2>
      <ul class="todos">
        <li v-for="(todo,idx) in note.info.todos">{{todo.txt}} Done: {{this.doneAtDate(idx)}}</li>
      </ul>
    </section>
    `,
  data() {
    return {
      todos: [],
    }
  },
  computed: {
    toDos() {
      console.log(note)
      return 'this.note.info.todos'
    },
  },
  methods: {
    doneAtDate(idx) {
      let doneAt = this.note.info.todos[idx].doneAt
      if (doneAt) {
        let date = new Date(doneAt)
        return date.toDateString().slice(4, 10)
      }
    },
  },
}

export default {
  props: ['note'],
  template: `
    <div  @mouseleave="unFocus">
        <section :class="getColor" class="card"  @mouseover="isHover = true" class="note-preview">
        <section class="note-content">  
            <component :is="getType" :note="note"></component>
        </section>
        <section v-bind:class="showButtons" class="actions-buttons flex justify-between">
          <router-link :to="'/notes/' + note.id" ><button style="background-image: url('../../../../assets/img/buttons/add20x20.png')" title="Edit"></button></router-link>
          <button style="background-image: url('../../../../assets/img/buttons/todo20x20.png')" title="Add to do list"></button>
          <button @click.stop="editUrl =! editUrl" style="background-image: url('../../../../assets/img/buttons/uploadimg20x20.png')" title="Add Image"></button>
          <button  @click.stop="editColor=true" style="background-image: url('../../../../assets/img/buttons/pallete20x20.png')" title="Change color"></button>
           <button style="background-image: url('../../../../assets/img/buttons/trash20x20.png')" @click="remove(note.id)" title="Delete"></button>
        </section>
      </section>
      <section class="edits" onblur="closeEdits">
      <input v-if="editUrl" @mouseleave="editUrl = false"
      type="text" v-model="currNote.info.url" @change="makeType('note-img')"/> 
        <div v-if="editColor">
      <h1 @click="currNote.color='blue'">click me to turn blue</h1>
      </div>
      </section> 
      </div>
      
      `,
  data() {
    return {
      isHover: false,
      currNote: this.note,
      noteType: this.getType,
      pageCmps: ['notetxt', 'noteimg'],
      "editUrl": false,
      "editColor": false
    }
  },
  computed: {
    showButtons() {
      return { invisible: !this.isHover }
    },
    getType() {
      return this.note.type.replace('-', '')
    },
    imgUrl() {
      return this.note.info.url
    },
    getColor() {
      return this.note.color
    }
  },
  methods: {
    remove(noteId) {
      removeNote(noteId)
    },
    save() {
      console.log(this.currNote.info.url)
      notesService.save(this.currNote)
    },
    unFocus() {
      console.log("close")
      // [this.editUrl, this.isHover].forEach(edit => {edit = false}); not working
      this.editUrl = false
      this.editColor = false
      this.isHover = false
    },
    makeType(type) {
      this.currNote.type = type
      this.save()
    }
  },
  components: {
    notetxt,
    noteimg,
    notetodos,
  },
}
