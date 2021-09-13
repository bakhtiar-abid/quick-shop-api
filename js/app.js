const loadProducts = () => {
   fetch("../js/shop.json")
      .then((response) => response.json())
      .then((data) => showProducts(data));
};
loadProducts();
// https://fakestoreapi.com/products

// show all product in UI
const showProducts = (products) => {
   //  console.log(products);
   const allProducts = products.map((product) => product);
   for (const product of allProducts) {
      console.log(product);
      const image = product.image;
      const div = document.createElement("div");
      div.classList.add("product");
      div.style.width = "18rem";
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class="my-5">${product.title}</h5>
      <h3>Price: $ ${product.price}</h3>
      <p class="course-info" >Category: ${product.category}</p>
            <div class="product-info">   
            <div>
            <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star empty"></i></div> 
                        <div>
                        <small> ${product.rating.rate} out of 5 </small>
                        </div>
                        
                        </div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn btn-info my-4">add to cart</button>
      <button id="details-btn" class="btn btn-outline-danger">Details</button></div>

      
      `;
      document.getElementById("all-products").appendChild(div);
   }
};
let count = 0;
const addToCart = (id, price) => {
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
   document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText = Math.round(value);
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

// showing shipping information
const shippingInfo = () => {};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue("price") +
      getInputValue("delivery-charge") +
      getInputValue("total-tax");
   document.getElementById("total").innerText =
      parseFloat(grandTotal).toFixed(2);
};
