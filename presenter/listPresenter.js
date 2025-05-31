import { getStories, loginAndSaveToken } from '../model/storyModel.js';
import { renderStories } from '../view/listView.js';

export async function showList() {
    const container = document.getElementById('app');
    container.innerHTML = '<p>Loading stories...</p>';

    const email = 'testemaila@gmail.com';
    const password = 'test1234';

    let token = localStorage.getItem('token');

    try {
        const stories = await getStories(token);
        container.innerHTML = '<p></p>';
        renderStories(stories, container);
    } catch (err) {
        container.innerHTML = '<p>Loading stories...</p>';
        try {
            token = await loginAndSaveToken(email, password);
            localStorage.setItem('token', token);

            const stories = await getStories(token);
            container.innerHTML = '<p></p>';
            renderStories(stories, container);
        } catch (loginError) {
            container.innerHTML = '<p>Gagal login atau memuat cerita. Coba lagi nanti.</p>';
        }
    }
}
