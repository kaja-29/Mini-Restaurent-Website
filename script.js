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
        cartb.addEventListener("click",cartadd);
    });

    updateprice(); // we calling this update price function here for excution when loadcontent excutes
    
}
// this function used to remove the cart item
function removeitem() {
    if(confirm("Are u sure to remove this item")){
    const cartitem = this.closest(".cart-items");
    let title = cartitem.querySelector(".item-naam").innerText;
    itemslist=itemslist.filter(el=>el.productname !== title);
    cartitem.style.animation = "magic 0.5s ease";
    cartitem.addEventListener("animationend",()=>{
    cartitem.remove();
    updateprice();
    })
    lodecontent();
    }// closest is used to find the class name and remove that using remove method
    

    // cart icon animation
    let carticon = document.querySelector(".cart-icon");
    carticon.style.animation = "none";
    void carticon.offsetWidth; // infinite time this helps to run this animation
    carticon.style.animation = "bounce 0.3s ease";    
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

let itemslist = [];

function cartadd(){

    // carticon animtion
    let carticon = document.querySelector(".cart-icon");
    carticon.style.animation = "none";
    void carticon.offsetWidth; // infinite time this helps to run this animation
    carticon.style.animation = "bounce 0.3s ease";
    
    //-------------------------------//
    
   let product = this.closest(".product-head");
   let productimg = product.querySelector(".product-img").src;
   let productname = product.querySelector(".product-name").innerText;
   let productprice = product.querySelector(".product-price").innerText;

   let itemdetail = {productimg,productname,productprice};
   if(itemslist.find(el=>el.productname==itemdetail.productname)){
    alert("Product already in Cart");
    return;
   }

   else{
    itemslist.push(itemdetail);
   }
   

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
                <p class="item-naam">${productname}</p>
                <p class="item-price">${productprice}</p>
            </div>

            <div class="cart-d2">
                <div class="addminbtn"><button class="decrement">-</button><p class="qty">1</p><button class="increment">+</button></div>
            </div>

            <div class="finalprice">
                 <p class="item-amt">${productprice}</p>
                <i class="remove fa-solid fa-trash-arrow-up"></i>
            </div>

        </div>
        `;
}



function updateprice(){
    const totalamt = document.querySelector(".item-total"); //finally tally total amount
    const cartitem = document.querySelectorAll(".cart-items"); // getting each food items while added in cart
    let total = 0;

    cartitem.forEach(items=>{           // inside the each food items getting an each item using this then getting an ecah items price 
        let priceel = items.querySelector(".item-price"); 

        let price = parseFloat(priceel.innerHTML.replace("₹","")); // for calculation purpose when filtering as a string to number 
        let qtyvalue = items.querySelector(".qty").innerHTML; // using loop we getting an qty of each food items
        total += (price*qtyvalue); 
        items.querySelector(".item-amt").innerText = "₹" +" "+(price*qtyvalue); //showing the amt with quantity in final food amount
        
    })
        totalamt.innerHTML =  "Total - ₹"+" "+total; // this for tally all food price with each quantity wise

        const cartcount = document.querySelector(".cart-count");
        let count = itemslist.length;
        cartcount.innerHTML = count;
        cartcount.style.fontSize = "12px";
        cartcount.style.fontWeight = "bold";

}





