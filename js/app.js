/* =========================================================
   CompraAmigo – lógica compartida del prototipo (cliente)
   Todo se guarda en localStorage del navegador:
     ca_user, ca_cart, ca_favs, ca_orders, ca_lastOrder
   ========================================================= */

/* ---------- Catálogo de productos (datos de ejemplo) ---------- */
const PRODUCTS = [
    /* ---------- Casacas ---------- */
    { id: 1, name: "Casaca Impermeable Azul", price: 120, cat: "Casacas", img: "casaca-impermeable-azul", co2: 3.2,
      sizes: ["S", "M", "L", "XL"],
      desc: "Casaca impermeable confeccionada con poliéster reciclado. Ligera, cortaviento y con capucha ajustable.",
      specs: ["Poliéster 100 % reciclado", "Costuras selladas", "Lavable a 30 °C"] },
    { id: 7, name: "Casaca de Mezclilla Reciclada", price: 135, cat: "Casacas", img: "casaca-mezclilla", co2: 3.6,
      sizes: ["S", "M", "L", "XL"],
      desc: "Clásica casaca de mezclilla hecha con algodón reciclado. Resistente, versátil y con un teñido que gasta menos agua.",
      specs: ["Algodón reciclado 100 %", "Botones metálicos", "Dos bolsillos frontales"] },
    { id: 8, name: "Parka Térmica Verde Oliva", price: 180, cat: "Casacas", img: "parka-verde", co2: 4.1,
      sizes: ["S", "M", "L", "XL"],
      desc: "Parka abrigadora con relleno reciclado y capucha. Ideal para las noches frías y los días de viento.",
      specs: ["Relleno de fibra reciclada", "Capucha desmontable", "Cierre doble con solapa"] },

    /* ---------- Calzado ---------- */
    { id: 2, name: "Zapatillas Eco-Friendly", price: 150, cat: "Calzado", img: "zapatillas-eco", co2: 4.5,
      sizes: ["38", "39", "40", "41", "42", "43"],
      desc: "Zapatillas cómodas para el día a día, hechas con suela de caucho natural y tela de botellas recicladas.",
      specs: ["Suela de caucho natural", "Tela de botellas PET recicladas", "Plantilla removible"] },
    { id: 9, name: "Zapatillas Urbanas de Lona", price: 110, cat: "Calzado", img: "zapatillas-lona", co2: 3.4,
      sizes: ["38", "39", "40", "41", "42", "43"],
      desc: "Zapatillas de lona de algodón orgánico con suela de caucho. Ligeras y fáciles de combinar.",
      specs: ["Lona de algodón orgánico", "Suela de caucho natural", "Cordones reciclados"] },
    { id: 10, name: "Sandalias de Caucho Reciclado", price: 75, cat: "Calzado", img: "sandalias-caucho", co2: 2.2,
      sizes: ["38", "39", "40", "41", "42", "43"],
      desc: "Sandalias frescas y resistentes fabricadas con caucho reciclado. Perfectas para el verano y la playa.",
      specs: ["Caucho 100 % reciclado", "Correas ajustables", "Suela antideslizante"] },

    /* ---------- Polos ---------- */
    { id: 3, name: "Polo de Algodón Orgánico", price: 45, cat: "Polos", img: "polo-organico", co2: 2.1,
      sizes: ["S", "M", "L", "XL"],
      desc: "Polo suave y fresco de algodón orgánico certificado, cultivado sin pesticidas y con menor consumo de agua.",
      specs: ["Algodón orgánico 100 %", "Teñido con tintes de bajo impacto", "Corte regular"] },
    { id: 11, name: "Polo Básico Blanco", price: 40, cat: "Polos", img: "polo-blanco", co2: 1.9,
      sizes: ["S", "M", "L", "XL"],
      desc: "El polo básico que no puede faltar. Algodón orgánico de tacto suave y cuello reforzado que no se deforma.",
      specs: ["Algodón orgánico 100 %", "Cuello reforzado", "Corte clásico"] },
    { id: 12, name: "Polo Deportivo Reciclado", price: 55, cat: "Polos", img: "polo-deportivo", co2: 2.0,
      sizes: ["S", "M", "L", "XL"],
      desc: "Polo deportivo transpirable hecho con botellas recicladas. Seca rápido y es ideal para entrenar.",
      specs: ["Poliéster reciclado (botellas PET)", "Secado rápido", "Costuras planas"] },

    /* ---------- Pantalones ---------- */
    { id: 4, name: "Pantalón de Cáñamo", price: 95, cat: "Pantalones", img: "pantalon-canamo", co2: 2.8,
      sizes: ["S", "M", "L", "XL"],
      desc: "Pantalón resistente y transpirable de cáñamo mezclado con algodón. Una fibra que requiere muy poca agua.",
      specs: ["55 % cáñamo, 45 % algodón orgánico", "Cintura elástica", "Dos bolsillos laterales"] },
    { id: 13, name: "Jean de Algodón Orgánico", price: 130, cat: "Pantalones", img: "jean-organico", co2: 3.9,
      sizes: ["S", "M", "L", "XL"],
      desc: "Jean de corte recto con algodón orgánico y un proceso de lavado que ahorra agua. Duradero y cómodo.",
      specs: ["Algodón orgánico 98 %, elastano 2 %", "Corte recto", "Lavado con bajo consumo de agua"] },

    /* ---------- Accesorios ---------- */
    { id: 5, name: "Mochila de Material Reciclado", price: 89, cat: "Accesorios", img: "mochila-reciclada", co2: 1.9,
      sizes: ["Única"],
      desc: "Mochila de 20 litros con compartimento para laptop, fabricada con lona reciclada y cierres duraderos.",
      specs: ["Capacidad 20 L", "Compartimento acolchado para laptop de 14\"", "Resistente a salpicaduras"] },
    { id: 6, name: "Botella Reutilizable de Acero", price: 35, cat: "Accesorios", img: "botella-acero", co2: 0.8,
      sizes: ["Única"],
      desc: "Botella de acero inoxidable de 750 ml que mantiene el frío por 24 h. Reemplaza cientos de botellas de plástico.",
      specs: ["Acero inoxidable 18/8", "750 ml", "Libre de BPA"] },
    { id: 14, name: "Bolso Tote de Algodón", price: 25, cat: "Accesorios", img: "tote-algodon", co2: 0.7,
      sizes: ["Única"],
      desc: "Bolso tote de algodón grueso para tus compras diarias. Dile adiós a las bolsas plásticas.",
      specs: ["Algodón 100 %", "Asas reforzadas", "Lavable a máquina"] }
];

const SHIPPING = {
    estandar: { label: "Estándar (3 a 5 días)", price: 10 },
    express:  { label: "Express (24 horas)", price: 20 },
    recojo:   { label: "Recojo en tienda", price: 0 }
};
const FREE_SHIPPING_FROM = 200; // envío estándar gratis desde este monto

/* ---------- Utilidades ---------- */
const LS = {
    get(key, fallback) {
        try {
            const v = JSON.parse(localStorage.getItem(key));
            return v === null || v === undefined ? fallback : v;
        } catch (e) { return fallback; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = n => "S/ " + Number(n).toFixed(2);
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const getProduct = id => PRODUCTS.find(p => p.id === Number(id));
const defaultSize = p => p.sizes[Math.min(1, p.sizes.length - 1)];
const sizeLabel = (p, size) => (p.sizes.length > 1 ? "Talla " + size : size);
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = iso => new Date(iso + "T00:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
const statusClass = s => ({ "En preparación": "prep", "En camino": "ship", "Entregado": "done" }[s] || "prep");

/* ---------- Usuario ---------- */
function getUser() { return LS.get("ca_user", null); }
function setUser(u) { LS.set("ca_user", u); }

/* ---------- Carrito ---------- */
const getCart = () => LS.get("ca_cart", []);
function saveCart(cart) { LS.set("ca_cart", cart); updateBadge(); }

function addToCart(id, size, qty = 1) {
    const p = getProduct(id);
    if (!p) return;
    size = size || defaultSize(p);
    const cart = getCart();
    const line = cart.find(l => l.id === p.id && l.size === size);
    if (line) line.qty += qty; else cart.push({ id: p.id, size, qty });
    saveCart(cart);
    toast(`${p.name} (${sizeLabel(p, size)}) añadido al carrito`);
}

function cartLines() {
    return getCart().map((l, idx) => ({ ...getProduct(l.id), size: l.size, qty: l.qty, idx }));
}

function shippingCost(method, subtotal) {
    if (method === "estandar" && subtotal >= FREE_SHIPPING_FROM) return 0;
    return SHIPPING[method].price;
}

function cartTotals(lines, method = "estandar") {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const co2 = lines.reduce((s, l) => s + l.co2 * l.qty, 0);
    const shipping = lines.length ? shippingCost(method, subtotal) : 0;
    return { subtotal, shipping, total: subtotal + shipping, co2 };
}

function updateBadge() {
    const b = $("#cart-badge");
    if (!b) return;
    const n = getCart().reduce((s, l) => s + l.qty, 0);
    b.textContent = n;
    b.classList.toggle("zero", n === 0);
}

/* ---------- Favoritos ---------- */
const getFavs = () => LS.get("ca_favs", []);
function toggleFav(id) {
    let favs = getFavs();
    const on = !favs.includes(id);
    favs = on ? [...favs, id] : favs.filter(f => f !== id);
    LS.set("ca_favs", favs);
    toast(on ? "♥ Guardado en favoritos" : "Quitado de favoritos");
    return on;
}

/* ---------- Pedidos ---------- */
const getOrders = () => LS.get("ca_orders", []);

// Pedidos de ejemplo para que "Mis pedidos" e "Impacto" se vean completos en la demo
function seedDemo() {
    if (localStorage.getItem("ca_seeded")) return;
    LS.set("ca_orders", [
        { id: "CA-10517", date: "2026-09-15", status: "En camino",
          items: [
              { id: 2, name: "Zapatillas Eco-Friendly", size: "41", qty: 1, price: 150 },
              { id: 6, name: "Botella Reutilizable de Acero", size: "Única", qty: 1, price: 35 }
          ],
          subtotal: 185, shipping: 10, total: 195, co2: 5.3,
          method: SHIPPING.estandar.label, pay: "Yape / Plin", address: "Av. Arequipa 1234, Lince, Lima" },
        { id: "CA-10482", date: "2026-08-28", status: "Entregado",
          items: [{ id: 3, name: "Polo de Algodón Orgánico", size: "M", qty: 2, price: 45 }],
          subtotal: 90, shipping: 10, total: 100, co2: 4.2,
          method: SHIPPING.estandar.label, pay: "Tarjeta", address: "Av. Arequipa 1234, Lince, Lima" }
    ]);
    localStorage.setItem("ca_seeded", "1");
}

/* ---------- Componentes reutilizables ---------- */

// Fotos de producto: images/productos/<nombre>.jpg (prueba también png, webp y jpeg)
function productImg(p) {
    const base = "images/productos/" + p.img;
    return `<img src="${base}.jpg" alt="${escapeHtml(p.name)}" loading="lazy" data-base="${base}" data-try="0" onerror="imgFallback(this)">`;
}
function imgFallback(el) {
    const exts = ["png", "webp", "jpeg"];
    const i = Number(el.dataset.try);
    if (i < exts.length) {
        el.dataset.try = i + 1;
        el.src = el.dataset.base + "." + exts[i];
        return;
    }
    el.onerror = null;
    const ph = document.createElement("span");
    ph.className = "img-missing";
    ph.innerHTML = "Falta la foto<small>" + el.dataset.base + ".jpg</small>";
    el.replaceWith(ph);
}

function productCard(p) {
    const fav = getFavs().includes(p.id);
    return `
    <article class="product-card">
        <button class="fav-btn ${fav ? "on" : ""}" data-fav="${p.id}" aria-label="Guardar en favoritos">${fav ? "♥" : "♡"}</button>
        <a class="product-img" href="producto.html?id=${p.id}" aria-label="Ver ${escapeHtml(p.name)}">${productImg(p)}</a>
        <div><span class="tag">🌱 Ahorra ${p.co2} kg CO₂</span></div>
        <h3>${p.name}</h3>
        <p class="cat">${p.cat}</p>
        <p class="price">${fmt(p.price)}</p>
        <div class="card-actions">
            <a class="btn btn-outline btn-sm" href="producto.html?id=${p.id}">Ver detalle</a>
            <button class="btn btn-sm" data-add="${p.id}">Añadir al carrito</button>
        </div>
    </article>`;
}

function toast(msg) {
    let t = $("#toast");
    if (!t) {
        t = document.createElement("div");
        t.id = "toast";
        t.className = "toast";
        t.setAttribute("role", "status");
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function renderNav(active) {
    const h = $("#site-header");
    if (!h) return;
    const links = [
        ["inicio", "inicio.html", "Inicio"],
        ["tienda", "tienda.html", "Catálogo"],
        ["pedidos", "pedidos.html", "Mis pedidos"],
        ["tips", "tips.html", "Tips"],
        ["impacto", "impacto.html", "Impacto ODS 12"]
    ];
    h.innerHTML = `
        <a class="brand" href="inicio.html">Compra<span>Amigo</span></a>
        <nav class="nav-links" aria-label="Principal">
            ${links.map(l => `<a href="${l[1]}" class="${l[0] === active ? "active" : ""}">${l[2]}</a>`).join("")}
        </nav>
        <div class="nav-actions">
            <a class="cart-link" href="carrito.html" title="Ver carrito" aria-label="Carrito">🛒<span class="cart-badge zero" id="cart-badge">0</span></a>
            <span class="user-name">👤 ${escapeHtml(getUser().name.split(" ")[0])}</span>
            <a class="btn btn-outline btn-sm" href="login.html" id="logout-link">Cerrar sesión</a>
        </div>`;
    $("#logout-link").addEventListener("click", () => localStorage.removeItem("ca_user"));
    updateBadge();
}

function renderFooter() {
    const f = $("#site-footer");
    if (f) f.innerHTML = "© 2026 CompraAmigo · Prototipo académico · ODS 12: Producción y consumo responsables";
}

/* ---------- Chatbot asistente (respuestas simuladas por reglas) ---------- */
function initChat() {
    const w = document.createElement("div");
    w.className = "chatbot-widget";
    w.innerHTML = `
        <div class="chat-header" id="chat-toggle" role="button" tabindex="0">🤖 Asistente CompraAmigo <span id="chat-arrow">▾</span></div>
        <div class="chat-body" id="chat-body">
            <div class="chat-message bot">¡Hola! Soy tu asistente inteligente. ¿Buscas alguna talla o recomendación?</div>
        </div>
        <form class="chat-input" id="chat-form">
            <input type="text" id="chat-text" placeholder="Escribe aquí..." autocomplete="off" aria-label="Mensaje">
            <button type="submit">Enviar</button>
        </form>`;
    document.body.appendChild(w);

    const body = $("#chat-body");
    let pending = null; // lo último que el bot ofreció agregar

    const toggle = () => {
        w.classList.toggle("collapsed");
        $("#chat-arrow").textContent = w.classList.contains("collapsed") ? "▴" : "▾";
    };
    $("#chat-toggle").addEventListener("click", toggle);
    $("#chat-toggle").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });

    const addMsg = (html, who, asText) => {
        const d = document.createElement("div");
        d.className = "chat-message " + who;
        if (asText) d.textContent = html; else d.innerHTML = html;
        body.appendChild(d);
        body.scrollTop = body.scrollHeight;
    };

    const productLinks = [
        [/casaca|impermeable|chaqueta/, 1], [/zapatilla|calzado|zapato/, 2], [/polo|camiseta|algod/, 3],
        [/pantal/, 4], [/mochila/, 5], [/botella|agua/, 6]
    ];

    function reply(text) {
        const t = text.toLowerCase().trim();

        if (pending && /^(s[ií]($|[^a-záéíóúñ])|ok\b|dale|claro|agr[eé]gal|por favor|listo)/.test(t)) {
            const p = getProduct(pending.id);
            addToCart(p.id, pending.size, 1);
            const s = pending.size;
            pending = null;
            return `¡Listo! Añadí <strong>${p.name}</strong> (Talla ${s}) a tu carrito. Puedes verlo en el <a href="carrito.html">carrito</a>.`;
        }
        const h = t.match(/(\d)[.,](\d{1,2})\s*m/);
        const kg = t.match(/(\d{2,3})\s*kg/);
        if (h && kg) {
            const w = Number(kg[1]);
            const size = w < 60 ? "S" : w <= 75 ? "M" : w <= 90 ? "L" : "XL";
            pending = { id: 1, size };
            return `Con esas medidas te recomiendo la <strong>Talla ${size}</strong> en la casaca. ¿Te la agrego al carrito?`;
        }
        if (/talla|medida/.test(t)) return "Cuéntame tu estatura y peso (por ejemplo: <em>1.65m y 60kg</em>) y te digo qué talla elegir. También tienes la guía en <a href='tips.html'>Tips</a>.";
        if (/env[ií]o|entrega|delivery|demora/.test(t)) return "Hacemos envíos estándar (3 a 5 días, gratis desde S/ 200), express en 24 horas o recojo en tienda sin costo.";
        if (/pago|yape|plin|tarjeta|pagar/.test(t)) return "Puedes pagar con tarjeta, Yape / Plin o contra entrega al momento del checkout.";
        if (/pedido|orden|seguimiento/.test(t)) return "Revisa el estado de tus compras en <a href='pedidos.html'>Mis pedidos</a>.";
        if (/impacto|co2|eco|ods|sosten|ambiente/.test(t)) return "Cada producto muestra cuánto CO₂ ahorras. Mira tu total en <a href='impacto.html'>Impacto ODS 12</a>.";
        for (const [re, id] of productLinks) {
            if (re.test(t)) {
                const p = getProduct(id);
                pending = { id: p.id, size: defaultSize(p) };
                return `<strong>${p.name}</strong> cuesta ${fmt(p.price)}. Mira el <a href="producto.html?id=${p.id}">detalle</a> o dime "sí" y te lo agrego al carrito.`;
            }
        }
        if (/hola|buenas|hey/.test(t)) return "¡Hola! ¿Te ayudo con una talla, un producto o el estado de tu pedido?";
        if (/gracias/.test(t)) return "¡De nada! Aquí sigo por si necesitas algo más. 🙂";
        return "Puedo ayudarte con tallas, productos, envíos, pagos y tus pedidos. ¿Sobre qué quieres saber?";
    }

    $("#chat-form").addEventListener("submit", e => {
        e.preventDefault();
        const input = $("#chat-text");
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, "user", true);
        input.value = "";
        setTimeout(() => addMsg(reply(text), "bot"), 450);
    });
}

/* ---------- Eventos globales: añadir al carrito y favoritos ---------- */
document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) { addToCart(Number(add.dataset.add)); return; }

    const fav = e.target.closest("[data-fav]");
    if (fav) {
        const on = toggleFav(Number(fav.dataset.fav));
        fav.classList.toggle("on", on);
        fav.textContent = on ? "♥" : "♡";
        if (typeof window.onFavChange === "function") window.onFavChange();
    }
});

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
    // Las pantallas del cliente (body con data-page) exigen sesión de cliente
    if (document.body.dataset.page) {
        const u = getUser();
        if (!u) { location.replace("login.html"); return; }
        if (u.role === "admin") { location.replace("dashboard.html"); return; }
    }
    seedDemo();
    renderNav(document.body.dataset.page);
    renderFooter();
    if (document.body.dataset.chat === "1") initChat();
});
