import preloader from '../images/preloader.gif';
import phone from '../images/phone.svg';
import email from '../images/email.svg';
import website from '../images/website.svg';
import ascSort from '../images/sort-asc.svg';


export const preloaderHTML = () => {
    return `<img class="preloader" src="${preloader}" alt="preloader" />`
};

export const userCardHTML = (props) => {
    return `<div class="userCard">
                    <h2>${props.name}</h2>
                    <span class="id">${props.id}</span>
                    <div class="info">
                        <a href="tel:${props.phone}">
                            <img class="icon" src="${phone}" alt="phone" />
                            <span>${props.phone}</span>
                        </a>
                        <a href="mailto:${props.email}">
                            <img class="icon" src="${email}" alt="email" />
                            <span>${props.email}</span>
                        </a>
                        <a href="https://${props.website}">
                            <img class="icon" src="${website}" alt="website" />
                            <span>${props.website}</span>
                        </a>
                    </div>
                </div>`
};

export const filtersHTML = () => {
    return `
        <button class="revert-button" data-revert-button>
            <img class="icon" src="${ascSort}" alt="sorting" />
        </button>
        <button class="button active" data-filter-button="id">User ID sorting</button>
        <button class="button" data-filter-button="alphabetical">Alphabetical sorting</button>
    `;
};

export const errorWrapperHTML = (message) => {
    return `<h1>${message}</h1>`;
};