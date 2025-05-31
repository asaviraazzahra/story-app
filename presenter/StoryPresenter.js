import ListView from '../view/listView.js';
import AddStoryView from '../view/addStoryView.js';

const StoryPresenter = {
  showList(container) {
    container.innerHTML = '';
    ListView.render(container);
  },

  showAddForm(container) {
    container.innerHTML = '';
    AddStoryView.render(container);
  },
};

export default StoryPresenter;
