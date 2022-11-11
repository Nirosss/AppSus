export default {
    template: `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />
                <div>Draft Folder
                <input type="radio" @input="filter" v-model="filterBy.draft"
                        min="0" max="500" /></div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                draft: false
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
}