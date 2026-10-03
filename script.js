const PRODUCTS = [
    {
        id: 1,
        title: 'Caneca "Dev Full Stack & Café"',
        category: 'Canecas',
        theme: 'Profissões',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop',
        desc: 'Caneca de cerâmica 325ml com estampa sublimada em alta definição.',
        hasVariants: true,
        variantType: 'mug',
        variants: [
            { name: 'Cerâmica Branca', priceOffset: 0 },
            { name: 'Polímero Leve', priceOffset: -5.00 },
            { name: 'Mágica (Muda de Cor)', priceOffset: 10.00 }
        ]
    },
    {
        id: 2,
        title: 'Caneca "Melhor Advogado(a)"',
        category: 'Canecas',
        theme: 'Profissões',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop',
        desc: 'Presente sofisticado para profissionais do Direito com caixa e sacola.',
        hasVariants: true,
        variantType: 'mug',
        variants: [
            { name: 'Cerâmica Branca', priceOffset: 0 },
            { name: 'Mágica (Preta ao Frio)', priceOffset: 10.00 }
        ]
    },
    {
        id: 3,
        title: 'Camiseta "Full Stack Developer"',
        category: 'Camisetas',
        theme: 'Geek',
        price: 59.90,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop',
        desc: '100% Algodão penteado fio 30.1. Toque macio e estampa resistente.',
        hasVariants: true,
        variantType: 'tshirt',
        variants: [
            { name: 'Tamanho P', priceOffset: 0 },
            { name: 'Tamanho M', priceOffset: 0 },
            { name: 'Tamanho G', priceOffset: 0 },
            { name: 'Tamanho GG', priceOffset: 5.00 }
        ]
    },
    {
        id: 4,
        title: 'Caneca Mágica "Amor Eterno"',
        category: 'Canecas',
        theme: 'Românticos',
        price: 49.90,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
        desc: 'Revela a frase e foto especial ao despejar bebida quente.',
        hasVariants: false
    },
    {
        id: 5,
        title: 'Caneca "Level 100 Boss Gamer"',
        category: 'Canecas',
        theme: 'Geek',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop',
        desc: 'Para os apaixonados por video games e setups de alta performance.',
        hasVariants: true,
        variantType: 'mug',
        variants: [
            { name: 'Cerâmica Branca', priceOffset: 0 },
            { name: 'Polímero Resistente', priceOffset: -5.00 }
        ]
    },
    {
        id: 6,
        title: 'Camiseta "Foco no Objetivo"',
        category: 'Camisetas',
        theme: 'Profissões',
        price: 59.90,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop',
        desc: 'Minimalista e inspiradora. Tecido respirável e muito confortável.',
        hasVariants: true,
        variantType: 'tshirt',
        variants: [
            { name: 'Tamanho P', priceOffset: 0 },
            { name: 'Tamanho M', priceOffset: 0 },
            { name: 'Tamanho G', priceOffset: 0 },
            { name: 'Tamanho GG', priceOffset: 5.00 }
        ]
    }
];

let state = {
    activeCategory: 'Todos',
    activeTheme: 'Todos',
    searchQuery: '',
    cart: [],
    selectedProductForModal: null,
    modalSelectedVariant: null,
    modalQty: 1,
    uploadedImageObj: null
};

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    calculateSolar();
});

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let filtered = PRODUCTS.filter(p => {
        const matchCat = state.activeCategory === 'Todos' || p.category === state.activeCategory;
        const matchTheme = state.activeTheme === 'Todos' || p.theme === state.activeTheme;
        const matchSearch = p.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchCat && matchTheme && matchSearch;
    });

    filtered.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = "bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-mimo-500/50 transition duration-300 group";
    card.innerHTML = `
        <div>
            <div class="relative bg-slate-950 h-52 overflow-hidden border-b border-slate-800/80">
                <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 left-3 bg-mimo-600/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">🎁 Caixa + Sacola</span>
            </div>
            <div class="p-5 space-y-2">
                <span class="text-[10px] font-extrabold text-mimo-400 bg-mimo-950 px-2 py-0.5 rounded border border-mimo-800/60 uppercase">${product.theme}</span>
                <h3 class="font-bold text-white text-base">${product.title}</h3>
                <p class="text-xs text-slate-400 line-clamp-2">${product.desc}</p>
            </div>
        </div>
        <div class="p-5 pt-0">
            <div class="flex items-center justify-between mb-3 pt-3 border-t border-slate-800">
                <span class="text-xl font-black text-white">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <span class="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-1 rounded">Embalagem Grátis</span>
            </div>
            <button type="button" onclick="openProductModal(${product.id})" class="w-full bg-slate-800 hover:bg-mimo-600 text-white font-extrabold text-xs py-3 rounded-xl transition">
                Simular & Personalizar
            </button>
        </div>
    `;
    return card;
}

/* Customizador com Canvas HTML5 */
function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id == productId);
    if (!product) return;

    state.selectedProductForModal = product;
    state.modalQty = 1;
    state.uploadedImageObj = null;

    document.getElementById('modalProductTitle').innerText = product.title;
    document.getElementById('modalProductCategory').innerText = `${product.category} • ${product.theme}`;
    document.getElementById('customTextInput').value = '';
    document.getElementById('customImageInput').value = '';

    const variantContainer = document.getElementById('modalVariantContainer');
    const variantOptions = document.getElementById('modalVariantOptions');
    variantOptions.innerHTML = '';

    if (product.hasVariants && product.variants.length > 0) {
        variantContainer.classList.remove('hidden');
        state.modalSelectedVariant = product.variants[0];
        product.variants.forEach((v, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `p-2 rounded-xl border text-left font-semibold ${idx === 0 ? 'border-mimo-500 bg-mimo-950 text-white' : 'border-slate-700 bg-slate-800 text-slate-300'}`;
            btn.onclick = () => selectModalVariant(v, btn);
            btn.innerHTML = `<div>${v.name}</div>`;
            variantOptions.appendChild(btn);
        });
    } else {
        variantContainer.classList.add('hidden');
        state.modalSelectedVariant = null;
    }

    updateModalPrice();
    const modal = document.getElementById('productModal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    renderCanvasPreview();
}

function renderCanvasPreview() {
    const canvas = document.getElementById('previewCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = state.selectedProductForModal ? state.selectedProductForModal.image : '';

    baseImg.onload = function() {
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
        ctx.setLineDash([]);

        if (state.uploadedImageObj) {
            ctx.save();
            const imgW = 110;
            const imgH = 110;
            ctx.drawImage(state.uploadedImageObj, (canvas.width / 2) - (imgW / 2), (canvas.height / 2) - (imgH / 2) - 15, imgW, imgH);
            ctx.restore();
        }

        const text = document.getElementById('customTextInput').value;
        if (text.trim() !== '') {
            const font = document.getElementById('customFontSelect').value || 'Georgia';
            const color = document.getElementById('customColorSelect').value || '#F59E0B';

            ctx.save();
            ctx.font = `bold 22px "${font}", Georgia, serif`;
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 2;

            const yPos = state.uploadedImageObj ? canvas.height - 55 : canvas.height / 2 + 10;
            ctx.fillText(text, canvas.width / 2, yPos);
            ctx.restore();
        }
    };
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                state.uploadedImageObj = img;
                renderCanvasPreview();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        state.uploadedImageObj = null;
        renderCanvasPreview();
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
}

function selectModalVariant(variant, btnElement) {
    state.modalSelectedVariant = variant;
    const buttons = document.querySelectorAll('#modalVariantOptions button');
    buttons.forEach(b => b.className = "p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-left font-semibold");
    btnElement.className = "p-2 rounded-xl border border-mimo-500 bg-mimo-950 text-white text-left font-semibold";
    updateModalPrice();
}

function changeModalQty(delta) {
    state.modalQty = Math.max(1, state.modalQty + delta);
    document.getElementById('modalQtyDisplay').innerText = state.modalQty;
    updateModalPrice();
}

function updateModalPrice() {
    if (!state.selectedProductForModal) return;
    let unitPrice = state.selectedProductForModal.price;
    if (state.modalSelectedVariant) {
        unitPrice += state.modalSelectedVariant.priceOffset;
    }
    const totalPrice = unitPrice * state.modalQty;
    document.getElementById('modalProductPrice').innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

function addModalItemToCart() {
    if (!state.selectedProductForModal) return;

    const customText = document.getElementById('customTextInput').value.trim();
    const customFont = document.getElementById('customFontSelect').value;
    const customColor = document.getElementById('customColorSelect').value;
    const hasPhoto = state.uploadedImageObj !== null;

    let unitPrice = state.selectedProductForModal.price;
    let variantName = 'Padrão';
    if (state.modalSelectedVariant) {
        unitPrice += state.modalSelectedVariant.priceOffset;
        variantName = state.modalSelectedVariant.name;
    }

    const cartItem = {
        cartItemId: Date.now(),
        title: state.selectedProductForModal.title,
        image: state.selectedProductForModal.image,
        variantName: variantName,
        customText: customText || 'Padrão da Estampa',
        customFont: customFont,
        customColor: customColor,
        hasPhoto: hasPhoto ? 'Sim (Envia no WhatsApp)' : 'Não',
        unitPrice: unitPrice,
        qty: state.modalQty
    };

    state.cart.push(cartItem);
    updateCartUI();
    closeProductModal();
    showToast(`🎁 "${cartItem.title}" adicionado com sucesso!`);
    toggleCartDrawer();
}

function updateCartUI() {
    const badge = document.getElementById('cartCountBadge');
    badge.innerText = state.cart.reduce((acc, item) => acc + item.qty, 0);

    const itemsList = document.getElementById('cartItemsList');
    const emptyMsg = document.getElementById('cartEmptyMsg');
    itemsList.innerHTML = '';

    if (state.cart.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
        state.cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = "bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs";
            itemEl.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${item.image}" class="w-12 h-12 object-cover rounded-xl border border-slate-800">
                    <div>
                        <h4 class="font-bold text-white">${item.title}</h4>
                        <span class="text-[10px] text-mimo-400 font-semibold block">${item.variantName}</span>
                        ${item.customText !== 'Padrão da Estampa' ? `<span class="text-[10px] text-slate-300 block">✍️ "${item.customText}"</span>` : ''}
                        <span class="font-black text-slate-200 mt-0.5 block">R$ ${(item.unitPrice * item.qty).toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <button type="button" onclick="removeCartItem(${index})" class="text-slate-500 hover:text-rose-400 font-bold p-1">✕</button>
            `;
            itemsList.appendChild(itemEl);
        });
    }

    const subtotal = state.cart.reduce((acc, item) => acc + (item.unitPrice * item.qty), 0);
    document.getElementById('cartSubtotalVal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('cartTotalVal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

function removeCartItem(index) {
    state.cart.splice(index, 1);
    updateCartUI();
}

function toggleCartDrawer() {
    document.getElementById('cartDrawer').classList.toggle('hidden');
}

function filterCategory(cat) {
    state.activeCategory = cat;
    renderProducts();
}

function filterTheme(theme) {
    state.activeTheme = theme;
    renderProducts();
}

function resetFilters() {
    state.activeCategory = 'Todos';
    state.activeTheme = 'Todos';
    renderProducts();
}

function handleSearch() {
    state.searchQuery = document.getElementById('searchInput').value;
    renderProducts();
}

function handleMobileSearch() {
    state.searchQuery = document.getElementById('mobileSearchInput').value;
    renderProducts();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    state.searchQuery = '';
    renderProducts();
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

function checkoutViaWhatsApp() {
    if (state.cart.length === 0) return;

    const phone = "5521965480938";
    let itemsSummary = "";
    let total = 0;

    state.cart.forEach((item, i) => {
        const totalItem = item.unitPrice * item.qty;
        total += totalItem;
        itemsSummary += `${i + 1}. *${item.title}* (${item.variantName}) x${item.qty} - R$ ${totalItem.toFixed(2)}%0A` +
                        `   ✍️ *Texto Estampa:* ${item.customText}%0A` +
                        `   🎨 *Fonte/Cor:* ${item.customFont} / ${item.customColor}%0A` +
                        `   🖼️ *Anexo de Foto:* ${item.hasPhoto}%0A%0A`;
    });

    const text = `🎁 *PEDIDO COM PRÉ-VISUALIZAÇÃO - ESTÚDIO MIMO*%0A%0A` +
                 `*Itens Personalizados:*%0A${itemsSummary}` +
                 `*TOTAL:* R$ ${total.toFixed(2)}%0A%0A` +
                 `Gostaria de confirmar a entrega e o pagamento!`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = "bg-slate-900 border border-mimo-500 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl transition transform opacity-100 pointer-events-auto";
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function updateSolarFromRange() {
    const val = document.getElementById('solarRange').value;
    document.getElementById('solarBillInput').value = val;
    calculateSolar();
}

function updateSolarFromInput() {
    const val = document.getElementById('solarBillInput').value;
    document.getElementById('solarRange').value = val;
    calculateSolar();
}

function calculateSolar() {
    const bill = parseFloat(document.getElementById('solarBillInput').value) || 0;
    const monthlySavings = bill * 0.90;
    const annualSavings = monthlySavings * 12;

    document.getElementById('resMonthlySavings').innerText = `R$ ${monthlySavings.toFixed(2).replace('.', ',')}`;
    document.getElementById('resAnnualSavings').innerText = `R$ ${annualSavings.toFixed(2).replace('.', ',')}`;
}

function sendSolarWhatsAppLead() {
    const bill = document.getElementById('solarBillInput').value;
    const phone = "5521965480938";
    const text = `☀️ *SOLICITAÇÃO DE ESTUDO SOLAR - ESTÚDIO SOL*%0A%0A*Valor da Conta:* R$ ${bill},00/mês%0AGostaria de receber uma proposta detalhada!`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}