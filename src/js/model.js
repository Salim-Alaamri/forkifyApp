import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    //todo=> lets reformat the naming of recipe
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} ⚠️⚠️⚠️`);
    throw err;
  }
};

//Search Functionality
export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} ⚠️⚠️⚠️`);
    throw err;
  }
};

export const getSearchResultPage = function (page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // start page 0
  const end = page * state.search.resultsPerPage; //9
  return state.search.results.slice(start, end);
};  
