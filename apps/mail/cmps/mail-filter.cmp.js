export default {
    template: `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />

                <button @click="setFolder('draft')">Draft Folder</button>
                <button @click="setFolder('sent')">Sent Folder</button>
                <button @click="setFolder('starred')">Starred Folder</button>
                <button @click="setFolder('inbox')">Draft inbox</button>

                <div>Draft Folder<input type="checkbox" @input="filter" v-model="filterBy.draft" /></div>
                <div>Sent Folder<input type="checkbox" @input="filter" v-model="filterBy.sent" /></div>
                <div>Starred Folder<input type="checkbox" @input="filter" v-model="filterBy.Starred" /></div>
                <div>inbox<input type="checkbox" @input="filter" v-model="filterBy.inbox" /></div>
                
                        
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                folder: null
            }
        }
    },
    methods: {
        setFolder(searchFolder) {
            this.filterBy.folder = searchFolder
            this.filter()
        },
        filter() {
            console.log(this.filterBy)
            this.$emit('filter', this.filterBy)
        }
    },
}