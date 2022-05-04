export const selectCategoriesMap = (state) =>
  state.categories.categories

    // docs will now be an array of the data from FB
    // b/c docs is an array, we have to reduce down to an object
    .reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
