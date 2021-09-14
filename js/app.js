const controller = new AbortController();
const { signal } = controller;
const showLoading = document.getElementById("showingSpinner");
const errorMessage = document.getElementById("error-message");
// Fetch API Data
const loadProducts = () => {
   fetch("../js/shop.json", { signal })
      .then((response) => response.json())
      .then((data) => showProducts(data));
};

/* Search By Product Category */

document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-field");
   const inputText = inputField.value;

   const url = `https://fakestoreapi.com/products/category/${inputText}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => showProducts(data));
   errorMessage.textContent = "";
   displaySpinner();

   //error handling

   if (inputText === "") {
      const div = document.createElement("div");
      div.innerHTML = `
      <h4 class = "text-center bg-danger w-50 mx-auto p-3 text-white rounded-3" >Please Search By a Valid Category Name </br> <small class= "fst-italic fw-lighter fs-5" >Ex: electronics, men's clothing, women's clothing, jewelery etc. </small> </h4>
      
      
      `;
      errorMessage.appendChild(div);
      showLoading.textContent = "";
   }

   controller.abort();

   inputField.value = "";
   document.getElementById("all-products").textContent = "";
});

// https://fakestoreapi.com/products
const div = document.createElement("div");
// show all product in UI
const showProducts = (products) => {
   /* Error Validation */
   if (products.length === 0) {
      const errorMessage = document.getElementById("error-message");

      errorMessage.innerHTML = `
      <h4 class = "text-center bg-danger w-50 mx-auto p-3 text-white rounded-3" >Please Search By a Valid Input </br> <small class= "fst-italic fw-lighter fs-5" >Ex: electronics, men's clothing, women's clothing, jewelery etc. </small> </h4>
      
      
      `;
      showLoading.textContent = "";
   }
   //  console.log(products);
   const allProducts = products.map((product) => product);

   console.log(allProducts);
   for (const product of allProducts) {
      showLoading.textContent = "";
      const image = product.image;
      const div = document.createElement("div");
      div.classList.add("product");

      div.innerHTML = `<div id="hide-info" class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class="my-5">${product.title.slice(0, 29)}</h5>
      <h3>Price: $ ${product.price}</h3>
      <p class="course-info" >Category: ${product.category}</p>
            <div id="star-info" class="product-info">   
                         <div>
                         <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star empty"></i>
                         </div>
                        <div>
                        <small> ${product.rating.rate} out of 5 </small>
                         
                        </div>


                        </div>
                        <div class="my-2"><small>${
                           product.rating.count
                        } global ratings</small></div>
                        
      <button onclick="addToCart(${product.id},${
         product.price
      })" id="addToCart-btn" class="buy-now btn btn btn-info my-2">add to cart</button>
      <button type="button" onclick= "productInfo('${
         product.id
      }')" id="details-btn" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#detail-product">Details</button>
      </div>
      

      `;

      document.getElementById("all-products").appendChild(div);
   }
};

let count = 0;
const addToCart = (id, price) => {
   //Count Total Added-Products
   count = count + 1;
   updatePrice("price", price);

   updateTaxAndCharge();
   updateTotal();
   document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseFloat(element);
   return converted;
};

// main price update function
const updatePrice = (id, value) => {
   const convertedOldPrice = getInputValue(id);
   const convertPrice = parseFloat(value);
   const total = convertedOldPrice + convertPrice;
   document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue("price");
   if (priceConverted > 200) {
      setInnerText("delivery-charge", 30);
      setInnerText("total-tax", priceConverted * 0.2);
   }
   if (priceConverted > 400) {
      setInnerText("delivery-charge", 50);
      setInnerText("total-tax", priceConverted * 0.3);
   }
   if (priceConverted > 500) {
      setInnerText("delivery-charge", 60);
      setInnerText("total-tax", priceConverted * 0.4);
   }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue("price") +
      getInputValue("delivery-charge") +
      getInputValue("total-tax");
   document.getElementById("total").innerText =
      parseFloat(grandTotal).toFixed(2);
};

// load product info
const productInfo = async (id) => {
   const url = `https://fakestoreapi.com/products/${id}`;
   const res = await fetch(url);
   const data = await res.json();
   displayProductInfo(data);
};

//display product info

const displayProductInfo = (info) => {
   const productDetailContainer = document.getElementById("product-info");
   productDetailContainer.textContent = "";
   const div = document.createElement("div");
   div.classList.add("text-center");
   div.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${info.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${info.title}</h5>
        <h2 class="card-text">Price: $ ${info.price}</h2>
       <p class="course-info" >Category: ${info.category}</p>
       <p> <h5>Description:</h5>  ${info.description}</p>
        
      </div>
    </div>
  </div>
</div>

`;
   productDetailContainer.appendChild(div);
};

loadProducts();

/* Display Loading Spinner */
const displaySpinner = () => {
   showLoading.innerHTML = `
   <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
   </div>
   
   `;
   errorMessage.textContent = "";
};
