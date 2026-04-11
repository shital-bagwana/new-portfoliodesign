var thumbnail_item = document.querySelectorAll('.thumbnail_item .thumbnail_button_img');
var mainImage = document.getElementById('main-product-img');

thumbnail_item.forEach((thumb) => {
  thumb.addEventListener('click', function () {

    thumbnail_item.forEach((t) => t.classList.remove('active'));

    thumb.classList.add('active');

    mainImage.src = this.src;
  });
});
if (thumbnail_item.length > 0) {
  thumbnail_item[0].classList.add('active');
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

option_data.forEach((option) => {
  var option_values = option.querySelectorAll(".option_value");

  option_values.forEach((value) => {
    value.addEventListener("click", function () {

      option_values.forEach((v) => v.classList.remove("active"));
      value.classList.add("active");

      selectedOptions = [];

        option_data.forEach((opt) => {
        let active = opt.querySelector(".option_value.active");
        if (active) {
          selectedOptions.push(active.getAttribute("value"));
        }
      });

      


    });
  });
}); 