export default {
  template: `

            <input class="mail-search center"
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search"  />
                
                <ul class=" sidebar clean-list">
                    <li><div class="side-bar flex flex-column align-start"></li>
                    <li><button @click="setFolder('inbox')"> <img src="assets/img/buttons/inbox.png">Inbox</button></li>
                    <li> <button @click="setFolder('draft')"><img src="assets/img/buttons/draft.png">  Draft Folder</button></li>
                    <li><button @click="setFolder('sent')"> <img src="assets/img/buttons/sent.png"> Sent Folder</button></li>
                    <li><button @click="setFolder('star')"> <img src="assets/img/buttons/star-empty.png">Starred Folder</button></li>
                </ul>

               
                
                        
    `,
  data() {
    return {
      filterBy: {
        name: '',
        folder: null,
      },
    }
  },
  methods: {
    setFolder(searchFolder) {
      console.log('setFolder')
      this.filterBy.folder = searchFolder
      this.filter()
    },
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },
}