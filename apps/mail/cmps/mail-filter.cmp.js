export default {
    template: `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />
                <div>Draft Folder
                <input type="checkbox" @input="filter" v-model="filterBy.draft"
                         /></div>
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