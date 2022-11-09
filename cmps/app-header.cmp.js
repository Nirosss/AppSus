export default {
    template: `
       

       <header>
      <div class="main-header main-layout flex justify-between align-center">
        <h2 class="logo">
          AppSus
        </h2>
        <ul class="nav-bar flex clean-list">
          <li><router-link :to="'/notes'" class="flex justify-center align-center">
          Notes
        </a></li>
          <li><router-link :to="'/mail'" class="flex justify-center align-center">
          Mail
        </a></li>
          <li>
            <a href="#" class="flex justify-center align-center">About</a>
          </li>
        </ul>
    `,
    created() {
        console.log("app-heder")
    }
}