export default {
  template: `
    <header>
      <div class="main-header flex justify-between align-center">
        <section class="logo-container flex align-center">
          <img src="../assets/img/logo100x100.png" alt="logo">
           <h2 class="logo">
           AppSus
          </h2>
        </section>
        <nav class="main-nav" @click="toggleMenu">
          <ul class="nav-bar flex clean-list">
          <li><router-link :to="'/notes'" class="flex justify-center align-center">
          Notes
        </router-link></li>
          <li><router-link :to="'/mail'" class="flex justify-center align-center">
          Mail
        </router-link></li>
          <li>
            <router-link :to="'/about'" class="flex justify-center align-center">About</router-link>
          </li>
        </ul>
        </nav>
        <button 
          type="button"
          class="burger-btn-menu"
          @click="toggleMenu"
        ></button>
      </div>
    </header>`,
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      document.querySelector('body').classList.toggle('menu-open')
    }
  }
}
