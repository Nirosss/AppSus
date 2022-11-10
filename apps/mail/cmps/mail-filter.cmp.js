export default {
    template: `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
}