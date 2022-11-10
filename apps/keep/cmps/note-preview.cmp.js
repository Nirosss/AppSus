const notetxt = {
  props:['note'],
  template: `
      <section class="notetxt">
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
      <ul class="todos clean list">
        <li v-for="todo in note.info.todos">{{todo.txt}}</li>
      </ul>
    </section>
    `,
  data() {
    return{
      todos:[]
    }
  },
  computed: {
    toDos() {
      console.log(note)
      return this.note.info.todos
    },
  },
}



export default {
  props: ['note'],
  template: `
        <section class="note-preview flex">
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
