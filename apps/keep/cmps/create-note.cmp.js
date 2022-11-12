import { notesService } from '../services/note.service.js'

export default {
  props: ['note'],
  template: `<section>
    <div class="new-note-line-container flex">
        <div class="new-note-txt-container">
            <textarea auto-grow class="new-note-input" v-model="typedTxt" type="textarea" v-bind:placeholder="placeHolder"/>
        </div>
        <div class="new-note-buttons flex">
        <button class="save-new-note" v-if="typedTxt" @click="createNote">Save</button>
          <div v-if="!typedTxt" class="new-note-btn-container flex">
            <button @click="setType('txt')" style="background-image: url('../../../../assets/img/buttons/text16x16.png')"  title="Create Text Note"></button>
           <button @click="setType('img')" style="background-image: url('../../../../assets/img/buttons/uploadimg16x16.png')" title="Create Image note"></button>
            <button @click="setType('video')" style="background-image: url('../../../../assets/img/buttons/video16x16.png')" title="Create video note"></button>
            <button @click="setType('list')" style="background-image: url('../../../../assets/img/buttons/todo16x16.png')" title="Create list note"></button>
         </div>
        </div>
    </div>
  </section>
   `,
  data() {
    return {
      typedTxt: null,
      placeHolder: 'Take a note',
      noteType: 'note-txt',
    }
  },
  computed: {},
  methods: {
    setType(type) {
      switch (type) {
        case 'img':
          this.typedTxt = null
          this.placeHolder = 'Paste image link here'
          this.noteType = 'note-img'
          break
        case 'video':
          this.typedTxt = null
          this.placeHolder = 'Paste embeded video link here'
          this.noteType = 'note-video'
          break
        case 'list':
          this.typedTxt = null
          this.placeHolder = 'Create a new list note'
          this.noteType = 'note-todos'
          break
        case 'txt':
          this.typedTxt = null
          this.placeHolder = 'Create a new note'
          this.noteType = 'note-txt'
      }
    },
    createNote() {
      notesService.createNote(this.typedTxt, this.noteType)
      this.typedTxt = null
    },
  },
}
