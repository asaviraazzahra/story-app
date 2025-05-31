import { getStories } from '../model/storyModel.js';
import { renderStories } from '../view/listView.js';

export async function showList() {
  const token = localStorage.getItem('token');
  const stories = await getStories(token);
  renderStories(stories);
}