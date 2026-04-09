const miWhatsApp = "59100000000"; // Reemplaza con tu número de Bolivia

const productos = [
    // PERFUMES
    { id: 1, nombre: "Vibranza Ésika", precio: 95.00, cat: "perfumes", img: "https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, nombre: "Mithyka L'Bel", precio: 150.00, cat: "perfumes", img: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, nombre: "Magnífica Ésika", precio: 89.00, cat: "perfumes", img: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 4, nombre: "Illumina L'Bel", precio: 110.00, cat: "perfumes", img: "https://images.pexels.com/photos/3989394/pexels-photo-3989394.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // MAQUILLAJE
    { id: 5, nombre: "Labial Matte Cy", precio: 35.00, cat: "maquillaje", img: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 6, nombre: "Paleta Studio Look", precio: 80.00, cat: "maquillaje", img: "https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 7, nombre: "Base L'Bel Perfect", precio: 95.00, cat: "maquillaje", img: "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 8, nombre: "Delineador Cyzone", precio: 25.00, cat: "maquillaje", img: "https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // TRATAMIENTO
    { id: 9, nombre: "Nocturne Serum", precio: 180.00, cat: "tratamiento", img: "https://images.pexels.com/photos/3617019/pexels-photo-3617019.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 10, nombre: "Concentré Total", precio: 210.00, cat: "tratamiento", img: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 11, nombre: "Bio Resist L'Bel", precio: 125.00, cat: "tratamiento", img: "https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=400" }
];

let carrito = [];

// --- SLIDER LÓGICA ---
let current = 0;
const slides = document.querySelectorAll('.slide');
function moveSlide(n) {
    slides[current].classList.remove('active');
    current = (current + n + slides.length) % slides.length;
    slides[current].classList.add('active');
}
setInterval(() => moveSlide(1), 5000);

// --- CARGAR PRODUCTOS ---
function cargarProductos() {
    productos.forEach(p => {
        const grid = document.getElementById(`grid-${p.cat}`);
        if(grid) {
            grid.innerHTML += `
                <div class="card">
                    <img src="${p.img}">
                    <h3>${p.nombre}</h3>
                    <p class="price">Bs ${p.precio.toFixed(2)}</p>
                    <button class="btn-add" onclick="agregar(${p.id})">Añadir</button>
                </div>
            `;
        }
    });
}

// --- CARRITO LÓGICA ---
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function agregar(id) {
    const p = productos.find(x => x.id === id);
    carrito.push(p);
    actualizarCarrito();
    // Animación pequeña en el contador
    const count = document.getElementById('cart-count');
    count.style.transform = "scale(1.5)";
    setTimeout(() => count.style.transform = "scale(1)", 200);
}

function actualizarCarrito() {
    const items = document.getElementById('cartItems');
    const total = document.getElementById('cart-total');
    const count = document.getElementById('cart-count');
    items.innerHTML = "";
    let suma = 0;
    carrito.forEach((p, i) => {
        suma += p.precio;
        items.innerHTML += `
            <div class="cart-item">
                <span>${p.nombre}</span>
                <span>Bs ${p.precio.toFixed(2)}</span>
                <button onclick="eliminar(${i})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-weight:bold">X</button>
            </div>`;
    });
    total.innerText = suma.toFixed(2);
    count.innerText = carrito.length;
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
}

// --- MENSAJE DE WHATSAPP ---
function checkoutWhatsApp() {
    if(carrito.length === 0) return alert("Tu carrito está vacío");
    
    let msg = `*🛍️ NUEVO PEDIDO - BELCORP BEAUTY*\n`;
    msg += `-\n\n`;
    msg += `¡Hola! Vengo de tu tienda web y me interesa adquirir estos productos:\n\n`;

    carrito.forEach((p, index) => {
        msg += `*${index + 1}.* ${p.nombre}\n`;
        msg += `   — Precio: *Bs ${p.precio.toFixed(2)}*\n\n`;
    });

    const totalFinal = document.getElementById('cart-total').innerText;
    msg += `-\n`;
    msg += `💰 *TOTAL A PAGAR: Bs ${totalFinal}*\n\n`;
    msg += `¿Podrías confirmarme disponibilidad? 😊`;

    window.open(`https://wa.me/${59165899791}?text=${encodeURIComponent(msg)}`);
}

window.onload = cargarProductos;