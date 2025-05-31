import StoryPresenter from './presenter/StoryPresenter.js';

const main = document.getElementById('app');
console.log(main);
const routes = {
    '/': StoryPresenter.showList,
    '/add': StoryPresenter.showAddForm,
};

function router() {
    const hash = window.location.hash.slice(1) || '/';
    const render = routes[hash];

    if (render) {
        render(main);
    } else {
        main.innerHTML = '<h2>Halaman tidak ditemukan</h2>';
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
