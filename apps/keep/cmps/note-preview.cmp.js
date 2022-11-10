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
        <section class="note-preview">
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
