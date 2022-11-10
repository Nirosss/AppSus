import notePreview from './note-preview.cmp.js'

export default {
  props: ['notes'],
  template: `<section className="notes">
                <div class="notes-list clean-list">
                    <div  v-for="note in notes" :key="note.id">
                        <note-preview :note="note"/>
                    </div>
                </div>
            </section> `,

  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
  },
  components: {
    notePreview,
  },
}

// <template v
// if=if="
// <h
// 1 Title </h 1
// <p>
// Paragraph </
// </template>
