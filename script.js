function big(img) {
    const inmg = document.querySelector('.big');
    inmg.src = img;
    inmg.style.opacity = "1";

    inmg.style.animation = 'none';
    void inmg.offsetWidth;
    inmg.style.animation = 'popup 0.3s ease-in-out';
}

function hideimage() {
    const inmg = document.querySelector(".big")
    inmg.style.opacity = "0";
}

const section = document.querySelectorAll('section');
const navlink = document.querySelectorAll('nav ul li a');

window.addEventListener("scroll", () => {

    let current = "";

    section.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 20;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            current = id;
        }
    });

    navlink.forEach(nav => {
        nav.classList.remove("active");
        if (nav.getAttribute("href") === "#" + current) {
            nav.classList.add("active");
        }
    })
});

// nav bar toggle event in mobile view 

const hamber = document.querySelector(".hamberger");
const navbar = document.querySelector("nav ul");
const nalink = navbar.querySelectorAll("a");

hamber.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

nalink.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
    });
});

document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !hamber.contains(e.target)) {
        navbar.classList.remove("show");
    }
});

const carticon = document.querySelector(".cart-icon");
const cartcontainer = document.querySelector(".cart-container");


carticon.addEventListener("click", () => {
    cartcontainer.classList.toggle("cart-active");
})

// cart creation ----------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", Contentloaded);

function Contentloaded() {
    lodecontent()
}

function lodecontent() {

    // cart item remove functions
    const removebtn = document.querySelectorAll(".remove");
    removebtn.forEach(btn => {
        btn.addEventListener("click", removeitem);
    })

    // cart qty increment and decrement functionality
    const decrement = document.querySelectorAll(".decrement");
    decrement.forEach(decre => {
        decre.addEventListener("click",decrease);
    });

    const increment = document.querySelectorAll(".increment");
    increment.forEach(incre => {
        incre.addEventListener("click",increase);
    })

    const cartbtn = document.querySelectorAll(".cartbtn");
    cartbtn.forEach(cartb=>{
        cartb.addEventListener("click",cartadd)
    })

}
// this function used to remove the cart item
function removeitem() {
    this.closest(".cart-items").remove();         // closest is used to find the class name and remove that using remove method
    console.log("clicked");
    lodecontent();
}

// increment and decrement function
function decrease(){
    const qty = this.parentElement.querySelector(".qty");
    let value = parseInt(qty.innerText);

    if(value>1){
        value--;
    }

    qty.innerText = value;
    lodecontent();
}

function increase(){
    const qty = this.parentElement.querySelector(".qty");
    let value = parseInt(qty.innerText);

    value++;
    qty.innerText = value;
    lodecontent();
}


function cartadd(){
   let product = this.closest(".product-head");
   let productimg = product.querySelector(".product-img").src;
   let productname = product.querySelector(".product-name").innerText;
   let productprice = product.querySelector(".product-price").innerText;

let fooddetails = creatingcart(productimg,productname,productprice); //here we store the all fetched function in one variable
    // console.log(fooddetails); this will prints the entire return value inside the function
let createdelement = document.createElement("div");  // we are creating one div because without creating div that fooddetails function data stays as just html tags 
createdelement.innerHTML = fooddetails; // now we assigning the fooddetails data of html to create element variable
let cartcollector = document.querySelector(".cart-home"); // here we getting the cart item placed parent div 
cartcollector.append(createdelement); // here we append the funftion data contained createelement to the cart item's parent space
    lodecontent(); // then calling this function to rest of all functionally happens
}


function creatingcart(productimg,productname,productprice){
    return`
    <div class="cart-items">
            <div>
                <img src="${productimg}" alt="">
            </div>

            <div class="item-name">
                <p>${productname}</p>
                <p>${productprice}</p>
            </div>

            <div class="cart-d2">
                <div class="addminbtn"><button class="decrement">-</button><p class="qty">1</p><button class="increment">+</button></div>
            </div>

            <div class="finalprice">
                 <p>${productprice}</p>
                <i class="remove fa-solid fa-trash-arrow-up"></i>
            </div>

        </div>
        `;
}