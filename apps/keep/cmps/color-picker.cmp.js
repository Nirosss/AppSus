export default {
  props: ['note'],
  template: `
  <section class="color-buttons flex">
    <button style="background-color: #ba883d" class="color-button" @click="changeColor('#ba883d')"></button>
    <button style="background-color: #b8b82e" class="color-button" @click="changeColor('#b8b82e')"></button>
    <button style="background-color: #83b853" class="color-button" @click="changeColor('#83b853')"></button>
    <button style="background-color: #3e876f" class="color-button" @click="changeColor('#3e876f')"></button>
    <button style="background-color: #3e7587" class="color-button" @click="changeColor('#3e7587')"></button>
    <button style="background-color: #b8b82e" class="color-button" @click="changeColor('#ba883d')"></button>
    <button style="background-color: #3e5587" class="color-button" @click="changeColor('#3e5587')"></button>
    <button style="background-color: #653e87" class="color-button" @click="changeColor('#653e87')"></button>
    <button style="background-color: #783868" class="color-button" @click="changeColor('#783868')"></button>
  </section>`,
  
  methods:{
    changeColor(color){
        this.$emit('setColor', this.note,color)
    }
  }
}
