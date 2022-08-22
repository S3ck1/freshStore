/*
  API link: https://fakestoreapi.com/ <3
  My github: https://github.com/S3ck1/ ( ͡° ͜ʖ ͡°)
*/

const API = "https://fakestoreapi.com";
let categories = [];
let allProducts = {};

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}


async function getProducts(urlApi) {
  categories = await fetchData(`${urlApi}/products/categories`);
  categories.splice(categories.indexOf("electronics"), 1); //remove extra category
  console.log(categories);
  //get products
  for (const category of categories) {
    const categoryProducts = await fetchData(
      `${urlApi}/products/category/${category}`
    );
    allProducts[category] = categoryProducts;
  }
  return allProducts;
}

let productCards = [];
let productsArea = document.querySelector(".products-container");

async function displayProducts(category) {
  let products = [];

  if (category == "all") {
    //saves all products on products array
    await getProducts(API).then(
      (response) =>
        (products = [
          ...response["men's clothing"],
          ...response["women's clothing"],
          ...response["jewelery"],
        ])
    );
  } else {
    await getProducts(API).then(
      //saves specific category on products array
      (response) => (products = [...response[`${category}`]])
    );
  }

  //Displays selected products
  products.forEach((product) => {
    productCards.push(`
    <div class="product-card">
      <div class="product-img-container">
        <img src=${product.image} alt="" class="product-img">
      </div>
    </div>
    `);
    const cardText = productCards.join("");
    productsArea.innerHTML = cardText;
  });
}

let productCategoriesBtns = document.querySelectorAll(".category");
(function () {
  productCategoriesBtns.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", () => {
      //First clean product cards array and products area
      //get all categories
      productsArea.innerHTML = "<div></div><div>LOADING...</div><div></div>";
      productCards = [];
      let category = categoryBtn.id;
      switch (category) {
        case "category-all":
          displayProducts("all");
          break;
        case "category-men":
          displayProducts("men's clothing");
          break;
        case "category-women":
          displayProducts("women's clothing");
          break;
        case "category-jewelery":
          displayProducts("jewelery");
          break;
        default:
          console.log("Error, that product doesn't exist :(");
          break;
      }
    });
  });
})();
