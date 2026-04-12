var thumbnail_item = document.querySelectorAll(
  ".thumbnail_item .thumbnail_button_img",
);
var mainImage = document.getElementById("main-product-img");

thumbnail_item.forEach((thumb) => {
  thumb.addEventListener("click", function () {
    thumbnail_item.forEach((t) => t.classList.remove("active"));

    thumb.classList.add("active");

    mainImage.src = this.src;
  });
});
if (thumbnail_item.length > 0) {
  thumbnail_item[0].classList.add("active");
}

// variant selection

// var main_block = document.getElementsByClassName("product-variant-options");
// var option_data = document.querySelectorAll(".option_data");
// var option_value = document.querySelectorAll(".option_data .option_value");
// option_data.forEach((option) => {
//   option_value.forEach((value) => {
//     value .addEventListener("click", function () {
//       option_value.forEach((v) => v.classList.remove("active"));
//       value.classList.add("active");
//     });
//   });

// });

var option_data = document.querySelectorAll(".option_data");
var selectedOptions = [];
let variantId = null;

function setVariant() {
  selectedOptions = [];

  option_data.forEach((opt) => {
    let active = opt.querySelector(".option_value.active");
    if (active) {
      selectedOptions.push(active.getAttribute("value"));
    }
  });

  let concatenation = selectedOptions.join(" / ");

  variantId = null;

  document
    .querySelectorAll(".variant-box .variant_option")
    .forEach((variant) => {
      let variantOptions = variant.getAttribute("data-variant-title");

      if (variantOptions === concatenation) {
        variantId = variant.getAttribute("data-variant-id");
      }
    });
}

option_data.forEach((option) => {
  var option_values = option.querySelectorAll(".option_value");

  option_values.forEach((value) => {
    value.addEventListener("click", function () {
      option_values.forEach((v) => v.classList.remove("active"));
      value.classList.add("active");
      setVariant();
    });
  });

  if (option_values.length > 0) {
    option_values[0].classList.add("active");
  }
});

setVariant();

var quantityInput = document.getElementById("quantity-input");
var incrementButton = document.getElementById("increment-btn");
var decrementButton = document.getElementById("decrement-btn");

incrementButton.addEventListener("click", function () {
  let currentValue = parseInt(quantityInput.value) || 1;
  quantityInput.value = currentValue + 1;
});

decrementButton.addEventListener("click", function () {
  let currentValue = parseInt(quantityInput.value) || 1;

  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

let buyNowButton = document.querySelector(".btn-buy-now");

buyNowButton.addEventListener("click", function () {
  if (variantId === null) {
    alert("Please select the variant before proceeding to checkout.");
    return;
  }

  let qty = parseInt(quantityInput.value) || 1;

  window.location.href = `/cart/${variantId}:${qty}?checkout`;
});

let addToCartButton = document.querySelector(".btn-add-to-cart");

addToCartButton.addEventListener("click", function () {
  if (variantId === null) {
    alert("Please select the variant before adding to cart.");
    return;
  }

  let qty = parseInt(quantityInput.value) || 1;

  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => {
      let existingItem = cart.items.find((item) => item.id == variantId);

      if (existingItem) {
        let newQty = existingItem.quantity + qty;

        return fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updates: {
              [variantId]: newQty,
            },
          }),
        });
      } else {
        return fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: variantId,
            quantity: qty,
          }),
        });
      }
    })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "/cart";
    })
    .catch((error) => {
      console.error(error);
    });
});
