import { removeNote } from '../../../services/event-bus.service.js'
import { notesService } from '../services/note.service.js'
import colorPicker from '../cmps/color-picker.cmp.js'

const notevideo = {
  props: ['note'],
  template: `
      <section class="note-video">
        <article class="iframe-container">
              <iframe class="video-frame"  :src="videoUrl" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
              gyroscope; picture-in-picture" allowfullscreen>
              title="YouTube video player"</iframe>
            </article>
        <h2>{{ note.info.title }}</h2>
    </section>
    `,
  methods: {},
  computed: {
    videoUrl() {
      return this.note.info.url
    },
  },
}


const notetxt = {
  props: ['note'],
  template: `
      <section class="note-txt" @mouseleave="saveEdit">
         
      <!-- <span class='text' @click="enableEditing">{{value}}</span> --> 
     <!-- </div>
    
      <textarea type="textarea" v-model="tempValue" class="input-area"></textarea>
       <button @click="disableEditing"> Cancel </button>
      <button @click="saveEdit"> Save </button> 
    </div> -->
       <p ref="text" contenteditable="true">{{ note.info.txt }}</p> 
    </section>
    `,
  data() {
    return {
      value: this.note.info.txt,
      tempValue: this.note.info.txt,
      editing: false,
    }
  },
  methods: {
    enableEditing: function () {
      this.tempValue = this.value
      this.editing = true
    },
    disableEditing: function () {
      this.tempValue = null
      this.editing = false
    },
    saveEdit: function () {
      // However we want to save it to the database
      console.log(this.$refs.text.innerText)
      this.note.info.txt = this.$refs.text.innerText
      console.log("save me")
      this.value = this.tempValue
      this.$emit('saveMe')
      this.disableEditing()
    },
    created() {
      this.setInterval(this.saveEdit, 500)
    }
  },
}

const noteimg = {
  props: ['note'],
  template: `
    <section class="note-img">
      <img :src="imgUrl" alt="" onerror="this.src='assets/img/imagerror.jpg'">
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
      <ul class="todos clean-list">
        <li class="todo-phrase" v-for="(todo,idx) in note.info.todos" :class="isDone(idx)">
        <input class="todo-checkbox" type="checkbox" :checked="this.note.info.todos[idx].doneAt != null" @input='toggleToDo(idx)'>
        <input class="todo-input" type="textarea" @mouseleave="flaggedtext =null" @focus="isFocused=idx" :class="{'flaggedtext' : isFocused===idx}" v-model="note.info.todos[idx].txt" @change="$emit('saveMe')">
        <button class="removeToDo-btn"  @click="removeItem(idx)" style="background-image: url('assets/img/buttons/trash16x16.png')"></button> </li>
      </ul>
    </section>
    `,
  data() {
    return {
      todos: [],
      isFocused: false,
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
      if (this.note.info.todos[idx].doneAt) {
        this.note.info.todos[idx].doneAt = null
        this.$emit('todoitemchange', idx, this.note.info.todos[idx].doneAt)
        return this.note.info.todos[idx].doneAt
      }
      this.note.info.todos[idx].doneAt = Date.now()
      this.$emit('todoitemchange', idx, this.note.info.todos[idx].doneAt)
    },
    isDone(idx) {
      return { done: this.note.info.todos[idx].doneAt != null }
    },
    removeItem(idx) {
      this.$emit('removetodo', idx)
    }
  },
}

export default {
  props: ['note'],
  template: `
    <div  @mouseleave="unFocus" v-on:keyup.enter="unFocus">
      <section :style="getColor" class="card" :class=" {active:isActive}"   @mouseover="isHover = true">
        <section class="note-content">  
          <component :is="getType" :note="note" @saveMe='save' @todoitemchange="updateToDo" @removetodo="removeToDo"></component>
          </section>
          <section v-bind:class="showButtons" class="actions-buttons flex justify-between">
         <button @click="isActive=true" style="background-image: url('assets/img/buttons/add20x20.png')" title="Edit"></button>
          <button  @click.stop="editTodo =! editTodo" style="background-image: url('assets/img/buttons/todo20x20.png')" title="Add to do item"></button>
          <button @click.stop="editUrl =! editUrl" style="background-image: url('assets/img/buttons/uploadimg20x20.png')" title="Add Image"></button>
          <button  @click.stop="editColor=true" style="background-image: url('assets/img/buttons/pallete20x20.png')" title="Change color"></button>
          <button style="background-image: url('assets/img/buttons/trash20x20.png')" @click="remove(note.id)" title="Delete"></button>
          </section>
      
        <section class="note-edits" onblur="closeEdits">
          <input v-if="editUrl" @mouseleave="editUrl = false" type="text" v-model="currNote.info.url" @change="makeType('note-img')" placehoder="Input image url"/> 
          <input v-if="editTodo" v-model="newTodo" @mouseleave="editTodo = false" type="text" @change="addTodo"/> 
          <div class="color-picker-container" v-if="editColor">
            <color-picker :note="note" @setColor="changeColor"/>
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
      isActive: false
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
      if (this.note.style)
        return { 'background-color': this.note.style.backgroundColor }
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
      this.currNote = note
      this.currNote.style = {}
      this.currNote.style.backgroundColor = color
      this.save()
      this.editColor = false
    },
    updateToDo(idx, doneTime) {
      this.currNote.info.todos[idx].doneAt = doneTime
      this.save()
    },
    removeToDo(idx) {
      this.currNote.info.todos.splice(idx, 1)
      if (this.currNote.info.todos.length < 1) {
        this.remove(this.currNote.id)
      } else this.save()
    },
  },
  components: {
    notetxt,
    noteimg,
    notetodos,
    colorPicker,
    notevideo,
  },
}
