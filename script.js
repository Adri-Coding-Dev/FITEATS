// ====================== DESCARGAR PDF ======================
document.getElementById('download-menu').addEventListener("click", function(){
    const link = document.createElement("a");
    link.href = "assets/menu.pdf";
    link.download = "Carta_FITEATS.pdf";
    link.click();
});



// ====================== CANVAS PARA EL FONDO FIJO ======================
class WaveBackground {
    constructor() {
        this.canvas = document.getElementById('background-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.drawBackground();
        
        // Redimensionar canvas cuando cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.drawBackground();
        });
    }
    
    setupCanvas() {
        // Ajustar el canvas al tamaño de la ventana
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.dpr = window.devicePixelRatio || 1;
        
        // Ajustar para dispositivos con alta densidad de píxeles
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }
    
    drawBackground() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ctx = this.ctx;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, width, height);
        
        // Dibujar fondo negro en toda la pantalla
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        
        // Crear forma orgánica para la parte blanca
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        // Línea superior recta
        ctx.lineTo(width * 0.48, 0);
        
        // Crear curva orgánica en el medio
        const wavePoints = 10;
        const waveAmplitude = 80;
        
        for (let i = 0; i <= wavePoints; i++) {
            const y = (i / wavePoints) * height;
            // Crear una curva suave y orgánica
            const xOffset = Math.sin((i / wavePoints) * Math.PI * 2) * waveAmplitude;
            const x = width * 0.48 + xOffset;
            
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                // Usar curvas bezier para transición suave
                const prevX = width * 0.48 + Math.sin(((i-1) / wavePoints) * Math.PI * 2) * waveAmplitude;
                const prevY = ((i-1) / wavePoints) * height;
                
                const cp1x = prevX + (x - prevX) * 0.5;
                const cp1y = prevY + 30;
                const cp2x = prevX + (x - prevX) * 0.5;
                const cp2y = y - 30;
                
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            }
        }
        
        // Completar la forma (parte inferior derecha a parte inferior izquierda)
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        
        // Rellenar con blanco
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Añadir un degradado sutil en el borde para suavizar la transición
        const gradient = ctx.createLinearGradient(width * 0.45, 0, width * 0.55, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(width * 0.45, 0, width * 0.1, height);
    }
}

// ====================== DATOS DE LA APLICACIÓN ======================
// Datos de los platos
const dishes = {
    "popular": [
        {
            id: 1,
            name: "BOWL MEDITERRANEO",
            description: "Quinoa orgánica con tomate cherry, pepino, maíz y aderezo de limón",
            ingredients: "Quinoa, tomate cherry, pepino",
            price: 19.80,
            image: "assets/platos/plato_1.jpg"
        },
        {
            id: 2,
            name: "ARROZ DEL BIENESTAR",
            ingredients: "Arroz integral, pollo troceado, zanahoria, pimiento",
            price: 17.60,
            image: "assets/platos/plato_2.jpg"
        },
        {
            id: 3,
            name: "MAR Y TIERRA",
            ingredients: "Pescado al horno, boniato asado y verduras",
            price: 20.90,
            image: "assets/platos/plato_3.jpg"
        },
        {
            id: 4,
            name: "Pasta vital",
            ingredients: "Pasta integral, tomate natural, jamon iberico, albahaca fresca",
            price: 16.50,
            image: "assets/platos/plato_4.jpg"
        },
        {
            id: 5,
            name: "TORTILLA VERDE",
            ingredients: "Huevo ecologico, espinacas, cebolla",
            price: 15.40,
            image: "assets/platos/plato_5.jpg"
        },
        {
            id: 6,
            name: "WRAP NATURAL",
            ingredients: "Tortilla integral, verduras, tofu, pollo",
            price: 14.30,
            image: "assets/platos/plato_6.jpg"
        }
    ],
    "sensaciones": [
        {
            id: 7,
            name: "CROQUETAS BUENAS VIBRAS",
            ingredients: "Pure de boniato, avena, cebolla",
            price: 17.60,
            image: "assets/platos/plato_7.jpg"
        },
        {
            id: 8,
            name: "ENSALADA DE PRIMAVERA",
            ingredients: "Lechuga, tomate, maiz, atun, aceite de oliva",
            price: 15.40,
            image: "assets/platos/plato_8.jpg"
        },
        {
            id: 9,
            name: "POLLO DORADO",
            ingredients: "Pechuga de pollo al horno, brocoli, boniato asado",
            price: 22.00,
            image: "assets/platos/plato_9.jpg"
        },
        {
            id: 10,
            name: "HUEVOS CAMPESTRES",
            ingredients: "Huevos ecologicos, jamon iberico, verduras salteadas",
            price: 19.80,
            image: "assets/platos/plato_10.jpg"
        },
        {
            id: 11,
            name: "SOPA FRESCA",
            ingredients: "Gazpacho natural, trozos de pepino, cebolla, pan integral",
            price: 12.20,
            image: "assets/platos/plato_11.jpg"
        },
        {
            id: 12,
            name: "MAR DEL SUR",
            ingredients: "Pescado al vapor, verduras, arroz integral",
            price: 22.00,
            image: "assets/platos/plato_12.jpg"
        }
    ],
    "mediterraneo": [
        {
            id: 13,
            name: "BOWL VITAL POLLO POWER",
            ingredients: "Pollo grillado, quinoa, hojas verdes, palta, tomate cherry, zanahoria",
            price: 13.50,
            image: "assets/platos/plato_13.png"
        },
        {
            id: 14,
            name: "SALMON FIT MEDITERRANEO",
            ingredients: "Salmon al horno, hierbas, vegetales asados, pure suave",
            price: 15.90,
            image: "assets/platos/plato_14.png"
        },
        {
            id: 15,
            name: "CARNE MAGRA ANDINA",
            ingredients: "Carne magra a la plancha, pure de camote, ensalada tibia de espinaca",
            price: 14.90,
            image: "assets/platos/plato_15.png"
        },
        {
            id: 16,
            name: "WRAP PROTEICO DE RES",
            ingredients: "Wrap integral con carne salteada, hojas verdes, palta, hummus",
            price: 9.50,
            image: "assets/platos/plato_16.png"
        },
        {
            id: 17,
            name: "POLLO ORIENTAL LIGHT",
            ingredients: "Pollo salteado estilo wok con vegetales, arroz integral, jengibre, soja baja",
            price: 13.90,
            image: "assets/platos/plato_17.png"
        }
    ],
    "postres": [
        {
            id: 18,
            name: "TARTA ZEN",
            ingredients: "Zanahoria rallada, avena, yogurt natural, canela",
            price: 5.50,
            image: "assets/platos/postre_1.jpg"
        },
        {
            id: 19,
            name: "MANZANA AL CIELO",
            ingredients: "Manzana al horno, miel, canela",
            price: 4.40,
            image: "assets/platos/postre_2.jpg"
        },
        {
            id: 20,
            name: "BOLA ENERGETICA",
            ingredients: "Datiles, coco rallado, matequilla de cacahuete",
            price: 8.80,
            image: "assets/platos/postre_3.jpg"
        },
        {
            id: 21,
            name: "CREMA TROPICAL",
            ingredients: "Mango triturado, yogurt griego",
            price: 6.60,
            image: "assets/platos/postre_4.jpg"
        },
        {
            id: 22,
            name: "CHESSCAKE FIT",
            ingredients: "Avena, almendras, yogurt griego, topping de frutos",
            price: 4.90,
            image: "assets/platos/postre_5.png"
        },
        {
            id: 23,
            name: "PARFAIT DE CHIA, COCO Y MANGO",
            ingredients: "Pudding de chia, leche, mango, frutos secos",
            price: 4.20,
            image: "assets/platos/postre_6.png"
        },
        {
            id: 24,
            name: "BROWNIE SALUDABLE DE CHOCOLATE",
            ingredients: "Brownie de cacao, harina de avena, datiles",
            price: 4.50,
            image: "assets/platos/postre_7.png"
        }
    ]
};

// Carrito de compras
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// ====================== INICIALIZACIÓN DE LA APLICACIÓN ======================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el fondo de canvas FIJO
    const waveBackground = new WaveBackground();
    
    // Ocultar pantalla de carga después de 1.5 segundos
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden');
    }, 1500);
    
    // Cargar los platos en los catálogos
    loadDishes();
    
    // Configurar eventos
    setupEventListeners();
    
    // Inicializar animaciones de aparición al hacer scroll
    initScrollAnimations();
    
    // Configurar scroll horizontal en los catálogos
    setupHorizontalScroll();
    
    // Configurar navbar al hacer scroll
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar animaciones del equipo
    initTeamAnimations();
});

// ====================== FUNCIONES DE LA APLICACIÓN ======================
// Cargar los platos en los catálogos
function loadDishes() {
    // Cargar platos populares
    const popularContainer = document.getElementById('popular-scroll');
    dishes.popular.forEach(dish => {
        popularContainer.innerHTML += createDishCard(dish);
    });
    
    // Cargar platos sensaciones
    const sensacionesContainer = document.getElementById('sensaciones-scroll');
    dishes['sensaciones'].forEach(dish => {
        sensacionesContainer.innerHTML += createDishCard(dish);
    });
    
    // Cargar platos mediterraneo
    const mediterraneoContainer = document.getElementById('mediterraneo-scroll');
    dishes['mediterraneo'].forEach(dish => {
        mediterraneoContainer.innerHTML += createDishCard(dish);
    });

    // Cargar platos postres
    const postresContainer = document.getElementById('postres-scroll');
    dishes['postres'].forEach(dish => {
        postresContainer.innerHTML += createDishCard(dish);
    });
}

// Crear tarjeta de plato
function createDishCard(dish) {
    return `
        <div class="catalogo-item fade-in" data-id="${dish.id}">
            <img src="${dish.image}" alt="${dish.name}" class="catalogo-item-image">
            <div class="catalogo-item-content">
                <h3>${dish.name}</h3>
                ${dish.description ? `<p>${dish.description}</p>` : ''}
                <div class="catalogo-item-ingredients">
                    <i class="fas fa-seedling"></i>
                    <span>${dish.ingredients}</span>
                </div>
                <div class="catalogo-item-footer">
                    <div class="catalogo-item-price">${dish.price.toFixed(2)}€</div>
                    <button class="add-to-cart" data-id="${dish.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Inicializar animaciones del equipo
function initTeamAnimations() {
    const members = document.querySelectorAll('.member-black, .member-white');
    
    // Animación escalonada para las tarjetas
    members.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            member.style.display = 'flex';
            
            // Forzar reflow para activar la transición
            member.offsetHeight;
            
            member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, 150 * index);
    });
    
    // Efecto de hover mejorado
    members.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botones del carrito (desktop y móvil)
    document.querySelector('.cart-btn')?.addEventListener('click', openCart);
    document.querySelector('.mobile-cart-btn')?.addEventListener('click', openCart);
    document.querySelector('.close-cart')?.addEventListener('click', closeCart);
    
    // Botón de finalizar compra
    document.getElementById('checkout-btn')?.addEventListener('click', openCheckout);
    document.querySelector('.close-checkout')?.addEventListener('click', closeCheckout);
    
    // Formulario de checkout
    document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);
    
    // Formulario de contacto
    document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);
    
    
    // Botones de añadir al carrito (se delegan porque se crean dinámicamente)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const dishId = parseInt(button.getAttribute('data-id'));
            addToCart(dishId);
        }
        
        // Eliminar item del carrito
        if (e.target.closest('.cart-item-remove')) {
            const button = e.target.closest('.cart-item-remove');
            const dishId = parseInt(button.getAttribute('data-id'));
            removeFromCart(dishId);
        }
    });
    
    // Menú móvil
    document.querySelector('.mobile-menu-btn')?.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
    
    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.mobile-menu-btn') &&
            !e.target.closest('.mobile-navbar')) {
            mobileMenu.classList.remove('active');
        }
    });
}

// Alternar menú móvil
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Configurar scroll horizontal en los catálogos
function setupHorizontalScroll() {
    // Botones de scroll izquierda/derecha
    document.querySelectorAll('.scroll-left').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.parentNode.querySelector('.catalogo-scroll');
            container.scrollBy({ left: -300, behavior: 'smooth' });
        });
    });
    
    document.querySelectorAll('.scroll-right').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.parentNode.querySelector('.catalogo-scroll');
            container.scrollBy({ left: 300, behavior: 'smooth' });
        });
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Manejar el scroll para los navbars
function handleScroll() {
    // Navbar desktop
    if (window.innerWidth > 992) {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Navbar móvil
    if (window.innerWidth <= 992) {
        const mobileNavbar = document.querySelector('.mobile-navbar');
        if (window.scrollY > 50) {
            mobileNavbar.classList.add('scrolled');
        } else {
            mobileNavbar.classList.remove('scrolled');
        }
    }
}

// Añadir producto al carrito
function addToCart(dishId) {
    // Buscar el plato en todos los catálogos
    let dish = null;
    for (const category in dishes) {
        const found = dishes[category].find(item => item.id === dishId);
        if (found) {
            dish = found;
            break;
        }
    }
    
    if (!dish) return;
    
    // Verificar si el plato ya está en el carrito
    const existingItem = cart.find(item => item.id === dishId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            image: dish.image,
            quantity: 1
        });
    }
    
    // Actualizar carrito
    updateCart();
    
    // Animación de confirmación
    const button = document.querySelector(`.add-to-cart[data-id="${dishId}"]`);
    if (button) {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
            button.style.backgroundColor = '';
        }, 1000);
    }
}

// Eliminar producto del carrito
function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    updateCart();
}

// Actualizar carrito
function updateCart() {
    // Actualizar contador
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Actualizar contadores en desktop y móvil
    const desktopCartCount = document.querySelector('.cart-count');
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    
    if (desktopCartCount) desktopCartCount.textContent = cartCount;
    if (mobileCartCount) mobileCartCount.textContent = cartCount;
    
    // Actualizar total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Actualizar vista del carrito
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotalElement = document.querySelector('.cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartTotalElement) cartTotalElement.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cartItemsContainer.appendChild(cartEmpty);
        }
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartTotalElement) cartTotalElement.style.display = 'flex';
        if (checkoutBtn) checkoutBtn.style.display = 'block';
        
        // Generar items del carrito
        let cartHTML = '';
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${item.price.toFixed(2)}€ x ${item.quantity}</p>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cartHTML;
        }
        
        const cartTotalPrice = document.getElementById('cart-total-price');
        if (cartTotalPrice) {
            cartTotalPrice.textContent = cartTotal.toFixed(2) + '€';
        }
    }
}

// Abrir carrito
function openCart() {
    document.querySelector('.cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cerrar menú móvil si está abierto
    if (window.innerWidth <= 992) {
        document.querySelector('.mobile-menu').classList.remove('active');
    }
}

// Cerrar carrito
function closeCart() {
    document.querySelector('.cart-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Abrir checkout
function openCheckout() {
    closeCart();
    document.querySelector('.checkout-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar checkout
function closeCheckout() {
    document.querySelector('.checkout-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Resetear formulario si se completó la compra
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutSuccess = document.getElementById('checkout-success');
    
    if (checkoutSuccess && checkoutSuccess.style.display === 'block') {
        checkoutSuccess.style.display = 'none';
        if (checkoutForm) checkoutForm.style.display = 'block';
        document.getElementById('checkoutForm').reset();
        
        // Vaciar carrito después de completar la compra
        cart = [];
        updateCart();
    }
}

// Manejar envío del formulario de checkout
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    // Simular procesamiento
    setTimeout(() => {
        // Mostrar éxito
        const checkoutForm = document.getElementById('checkout-form');
        const checkoutSuccess = document.getElementById('checkout-success');
        
        if (checkoutForm) checkoutForm.style.display = 'none';
        if (checkoutSuccess) checkoutSuccess.style.display = 'block';
    }, 1000);
}

// Manejar envío del formulario de contacto
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Simular envío
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        document.getElementById('contactSuccess').classList.add('active');
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            document.getElementById('contactSuccess').classList.remove('active');
        }, 5000);
    }, 1000);
}