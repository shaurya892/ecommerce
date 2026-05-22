
const products=[
{id:1,name:'Wireless Headphones',price:1999},
{id:2,name:'Smart Watch',price:2499},
{id:3,name:'Gaming Mouse',price:899},
{id:4,name:'Bluetooth Speaker',price:1499}
]

let cart=JSON.parse(localStorage.getItem("cart"))||[]

function addToCart(id){
let p=products.find(x=>x.id===id)
cart.push(p)
localStorage.setItem("cart",JSON.stringify(cart))
alert("Added to cart")
}

function renderCart(){
let items=document.getElementById("cart-items")
let total=document.getElementById("cart-total")

if(!items)return

items.innerHTML=""
let sum=0

cart.forEach(i=>{
sum+=i.price
items.innerHTML+=`<p>${i.name} ₹${i.price}</p>`
})

total.innerText=sum
}

function placeOrder(){
localStorage.removeItem("cart")
window.location='thankyou.html'
}

renderCart()
