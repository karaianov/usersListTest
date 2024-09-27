import { preloaderHTML } from './templates';

export const setPreloader = (element) => {
    element?.insertAdjacentHTML("beforeEnd", preloaderHTML());
};

export const removePreloader = (element) => {
    element?.querySelector('.preloader')?.remove();
};