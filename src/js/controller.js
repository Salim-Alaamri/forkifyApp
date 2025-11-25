import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/paginations.js';


// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // resultsView.renderSpinner();
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //rendring recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    //load search result
    await model.loadSearchResult(query);

    //render result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(4));

    //render initial pagination buttons
    PaginationView.render(model.state.search)
  } catch (err) {
    console.log(`${err} ⚠️⚠️⚠️`);
  }
};

const controlPagination = function(goToPage) {
 //render new result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(goToPage));

    //render new pagination buttons
    PaginationView.render(model.state.search)
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerClick(controlPagination)
};

init();


