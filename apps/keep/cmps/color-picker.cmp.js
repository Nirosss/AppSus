export default {
  props: ['note'],
  template: `
  <section class="color-picker-buttons">
    <button class="color-picker-button" style="background-color: #f28b82" class="color-button" @click="changeColor('#f28b82')"></button>
    <button class="color-picker-button" style="background-color: #fbbc04" class="color-button" @click="changeColor('#fbbc04')"></button>
    <button class="color-picker-button" style="background-color: #ccff90" class="color-button" @click="changeColor('#ccff90')"></button>
    <button class="color-picker-button" style="background-color: #a7ffeb" class="color-button" @click="changeColor('#a7ffeb')"></button>
    <button class="color-picker-button" style="background-color: #aecbfa" class="color-button" @click="changeColor('#aecbfa')"></button>
    <button class="color-picker-button" style="background-color: #d7aefb" class="color-button" @click="changeColor('#d7aefb')"></button>
    <button class="color-picker-button" style="background-color: #fdcfe8" class="color-button" @click="changeColor('#fdcfe8')"></button>
    <button class="color-picker-button" style="background-color: #e8eaed" class="color-button" @click="changeColor('#e8eaed')"></button>
    <button class="color-picker-button" style="background-color: #e6c9a8" class="color-button" @click="changeColor('#e6c9a8')"></button>
    <button class="color-picker-button" style="background-color: 'white'" class="color-button" @click="changeColor('white')"></button>
  </section>`,

  methods: {
    changeColor(color) {
      this.$emit('setColor', this.note, color)
    },
  },
}
