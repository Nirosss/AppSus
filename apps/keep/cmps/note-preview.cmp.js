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
        <section  @mouseover="upHere = true" @mouseleave="upHere = false" class="note-preview">
        <section class="note-content">  
            <component :is="getType" :note="note"></component>
        </section>
        <section v-bind:class="showButtons" class="actions-buttons flex justify-between">
                        <router-link :to="'/notes/' + note.id" ><button style="background-image: url('../../../../assets/img/buttons/add20x20.png')" title="Edit"></button></router-link>
                        <button style="background-image: url('../../../../assets/img/buttons/pallete16x16.png')" title="Add to do list"></button>
                        <button style="background-image: url('../../../../assets/img/buttons/uploadimg16x16.png')" title="Add ann image"></button>
                        <button style="background-image: url('../../../../assets/img/buttons/trash16x16.png')" @click="remove(note.id)"></button>
        </section>
</section>
    `,
  data() {
    return {
      upHere: false,
      currNote: this.note,
      noteType: this.getType,
      pageCmps: ['notetxt', 'noteimg'],
    }
  },
  computed: {
    showButtons(){
      return {invisible : !this.upHere}
    },
    getType() {
      return this.note.type.replace('-', '')
    },
    imgUrl() {
      return this.note.info.url
    },
  },
  components: {
    notetxt,
    noteimg,
    notetodos,
  },
}
