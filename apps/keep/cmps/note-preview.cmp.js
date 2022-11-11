import { removeNote } from '../../../services/event-bus.service.js'
import { notesService } from '../services/note.service.js'
import colorPicker from '../cmps/color-picker.cmp.js'

const notetxt = {
  props: ['note'],
  template: `
      <section class="note-txt">
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

const notetodos = {
  props: ['note'],
  template: `
    <section class="note-todos">
      <h2>{{ note.info.lable }}</h2>
      <ul class="todos">
        <li v-for="(todo,idx) in note.info.todos" @click="toggleToDo(idx)"
        :class="isDone(idx)">{{todo.txt}}  Done: {{this.doneAtDate(idx)}}
        </li>
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
    toggleToDo(idx) {
      if (this.note.info.todos[idx].doneAt) return this.note.info.todos[idx].doneAt = null
      this.note.info.todos[idx].doneAt = Date.now()
    },
    isDone(idx) {
      return { done: !this.note.info.todos[idx].doneAt }
    }
  },
}

export default {
  props: ['note'],
  template: `
    <div  @mouseleave="unFocus" v-on:keyup.enter="unFocus">
        <section :style="getColor" class="card"  @mouseover="isHover = true" class="note-preview">
          <section class="note-content">  
            <component :is="getType" :note="note"></component>
          </section>
          <section v-bind:class="showButtons" class="actions-buttons flex justify-between">
          <router-link :to="'/notes/' + note.id" ><button style="background-image: url('../../../../assets/img/buttons/add20x20.png')" title="Edit"></button></router-link>
          <button  @click.stop="editTodo =! editTodo" style="background-image: url('../../../../assets/img/buttons/todo20x20.png')" title="Add to do list"></button>
          <button @click.stop="editUrl =! editUrl" style="background-image: url('../../../../assets/img/buttons/uploadimg20x20.png')" title="Add Image"></button>
          <button  @click.stop="editColor=true" style="background-image: url('../../../../assets/img/buttons/pallete20x20.png')" title="Change color"></button>
           <button style="background-image: url('../../../../assets/img/buttons/trash20x20.png')" @click="remove(note.id)" title="Delete"></button>
        </section>
      
    <section class="edits" onblur="closeEdits">

      <input v-if="editUrl" @mouseleave="editUrl = false"
      type="text" v-model="currNote.info.url" @change="makeType('note-img')"/> 

      <input v-if="editTodo" v-model="newTodo" @mouseleave="editTodo = false"
      type="text" @change="addTodo"/> 

      <div class="color-picker-container"v-if="editColor">
       <color-picker :note="note" @setColor="changeColor">
      </div>
    </section>
    </section> 
  </div>
      
      `,
  data() {
    return {
      isHover: false,
      currNote: this.note,
      noteType: this.getType,
      pageCmps: ['notetxt', 'noteimg'],
      editUrl: false,
      editColor: false,
      editTodo: false,
      newTodo: '',
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
      return { 'background-color': this.note.color }
    },
  },
  methods: {
    remove(noteId) {
      removeNote(noteId)
    },
    save() {
      notesService.save(this.currNote)
    },
    unFocus() {
      // [this.editUrl, this.isHover].forEach(edit => {edit = false}); not working
      this.editUrl = false
      this.editColor = false
      this.editTodo = false
      this.isHover = false
    },
    makeType(type) {
      this.currNote.type = type
      this.save()
    },
    addTodo() {
      if (!this.currNote.info.todos) this.currNote.info.todos = []
      this.currNote.info.todos.push({ txt: this.newTodo, doneAt: null })

      //not sure if we should have types if you can add images and tdo to same note
      console.log(this.newTodo)
      this.makeType('note-todos')
    },
    changeColor(note, color) {
      console.log(note)
      this.currNote = note
      this.currNote.color = color
      this.save()
    },
  },
  components: {
    notetxt,
    noteimg,
    notetodos,
    colorPicker,
  },
}
