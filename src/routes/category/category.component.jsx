import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categoryselector";

// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  // const { categoriesMap } = useContext(CategoriesContext);
  // fetching products is an asynchronous function inside category context
  // instead of passing useState an empty array, we need to pass in a fail-safe
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

// products && ... --> is is a fail-safe. It will only render the comp if products are present.
