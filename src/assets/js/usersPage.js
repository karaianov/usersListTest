import { removePreloader, setPreloader } from "./utils";
import App from './app';
import { userCardHTML, filtersHTML, errorWrapperHTML } from "./templates";

import ascSVG from '../images/sort-asc.svg';
import descSVG from '../images/sort-desc.svg';

class UsersPage extends App {
    constructor() {
        super();

        if (!this.htmlElements.usersWrapper || !this.htmlElements.filtersWrapper) {
            alert(this.messages.error);
            return;
        }

        this.fetchUsers();
    }

    fetchUsers() {
        setPreloader(this.htmlElements.usersWrapper);

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.state.users = [...data];
                    this.renderFilters()
                        .renderUsers()
                        .attachEvents();
                }
            })
            .catch(error => {
                this.renderErrorWrapper(this.messages.error);
                console.error(error);
            })
            .finally(() => {
                removePreloader(this.htmlElements.usersWrapper);
            });

    }

    renderFilters() {
        this.htmlElements.filtersWrapper.insertAdjacentHTML('beforeend', filtersHTML());
        return this;
    }

    renderUsers() {
       this.htmlElements.usersWrapper.innerHTML = '';
       this.htmlElements.usersWrapper.insertAdjacentHTML('beforeend', this.state.users.length ? this.renderCards() : errorWrapperHTML(this.messages.emptyUsers));
       
       return this;
    }

    renderCards() {
        return this.state.users.map((user) => userCardHTML(user)).join('');
    }

    renderErrorWrapper(message) {
        this.htmlElements.usersWrapper.insertAdjacentHTML('beforeend', errorWrapperHTML(message));
    }

    attachEvents() {
        this.htmlElements.filterButtons = document.querySelectorAll('[data-filter-button]');
        this.htmlElements.revertButton = document.querySelector('[data-revert-button]');

        if (this.htmlElements.revertButton) {
            this.htmlElements.revertIcon = this.htmlElements.revertButton.querySelector('.icon');

            this.htmlElements.revertButton.addEventListener('click', () => this.reverseUsers());
        }

        this.htmlElements.filterButtons.length && this.htmlElements.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterUsers(button));
        });
    }

    reverseUsers() {
        if (!this.state.users.length) return;

        this.state.users = [...this.state.users].reverse();
        this.renderUsers();

        this.state.sorting = this.state.sorting === 'asc' ? 'desc' : 'asc';
        this.htmlElements.revertIcon.src = this.state.sorting === 'asc' ? ascSVG : descSVG;
    }

    resetReverse() {
        this.state.sorting = 'asc';
        this.htmlElements.revertIcon.src = ascSVG;
    }

    filterUsers(button) {
        this.htmlElements.filtersWrapper.querySelector('.active')?.classList.remove('active');

        switch(button.dataset.filterButton) {
            
            case 'alphabetical':
                this.state.users = [...this.state.users].sort((a, b) => {
                  return a.name.localeCompare(b.name);
                });
                break;

            case 'id':
                this.state.users = [...this.state.users].sort((a, b) => {
                  return a.id - b.id;
                });
                break;

            default:
                break;
        }

        button.classList.add('active');
        this.renderUsers();
        this.resetReverse();
    }

}

export default () => new UsersPage();