const products=[
{id:1,name:"EYEVIL Classic Hoodie",type:"clothing",price:699,icon:"🧥",tag:"NEW",desc:"Heavyweight black streetwear hoodie."},
{id:2,name:"EYEVIL Oversized Tee",type:"clothing",price:499,icon:"👕",tag:"BESTSELLER",desc:"Premium oversized cotton tee."},
{id:3,name:"EYEVIL Joggers",type:"clothing",price:649,icon:"👖",tag:"NEW",desc:"Relaxed-fit everyday streetwear."},
{id:4,name:"EYEVIL Cap",type:"accessories",price:299,icon:"🧢",tag:"POPULAR",desc:"Classic embroidered street cap."},
{id:5,name:"Self Improvement Guide",type:"digital",price:149,icon:"📕",tag:"DIGITAL",desc:"A practical downloadable mindset guide."},
{id:6,name:"Social Media Template Pack",type:"digital",price:199,icon:"📱",tag:"DIGITAL",desc:"Editable templates for your content."},
{id:7,name:"Digital Planner",type:"digital",price:149,icon:"📓",tag:"DIGITAL",desc:"Plan goals, habits and projects."},
{id:8,name:"Business Startup Guide",type:"digital",price:199,icon:"💼",tag:"DIGITAL",desc:"A beginner-friendly business guide."}
];

let cart=JSON.parse(localStorage.getItem("eyevilCart")||"[]");
const productsEl=document.getElementById("products");
const searchEl=document.getElementById("search");

function money(n){return "R"+n.toFixed(2)}
function renderProducts(filter="all",query=""){
  const q=query.toLowerCase().trim();
  const list=products.filter(p=>(filter==="all"||p.type===filter)&&(!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
  productsEl.innerHTML=list.length?list.map(p=>`
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${money(p.price)}</div>
      <button class="add" onclick="addToCart(${p.id})">ADD TO CART</button>
    </article>`).join(""):`<p style="color:#999">No products found.</p>`;
}
function addToCart(id){cart.push(id);saveCart();openCart()}
function removeFromCart(index){cart.splice(index,1);saveCart()}
function saveCart(){localStorage.setItem("eyevilCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const items=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);
  document.getElementById("cartItems").innerHTML=items.length?items.map((p,i)=>`
    <div class="cart-row"><div><b>${p.name}</b><br><small>${money(p.price)}</small></div>
    <button class="remove" onclick="removeFromCart(${i})">Remove</button></div>`).join(""):`<p style="color:#888">Your cart is empty.</p>`;
  document.getElementById("cartTotal").textContent=money(items.reduce((s,p)=>s+p.price,0));
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>alert("Checkout is not connected yet. Your store is ready for a payment provider when you choose one.");
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter,searchEl.value)});
document.querySelectorAll(".categories a").forEach(a=>a.onclick=()=>{const f=a.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===f));renderProducts(f,"")});
searchEl.addEventListener("input",()=>{const active=document.querySelector(".filter.active").dataset.filter;renderProducts(active,searchEl.value)});
renderProducts();renderCart();
