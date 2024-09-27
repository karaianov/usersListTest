class App {
    constructor() {
        this.state = {
            users: [],
            sorting: 'asc',
            filter: null,
        };

        this.messages = {
            error: 'Something was wrong, please try again...',
            emptyUsers: 'Users list is empty...',
        };

        this.htmlElements = {
            usersWrapper: document.querySelector('[data-users-wrapper]'),
            filtersWrapper: document.querySelector('[data-filters-wrapper]'),
        };
    }
}

export default App;