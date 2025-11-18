export const state = {
  recipe: {},
};


export const loadRecipe = async function (id) {
    try {
    const res = await fetch(
          `https://forkify-api.jonas.io/api/v2/recipes/${id}`
          // `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e8297`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}`);
    
        console.log(res, data);
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
        console.log(state.recipe);
    } catch(err) {
        alert(err)
    }
}