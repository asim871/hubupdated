document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initAboutTabs();
    initScrollAnimations();
    initStatsCounter();
    initProducts();
    initYear();
    initMagneticButtons();
    initParallax();
    initScrollProgress();
});

// Scroll Progress Bar
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    });
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower effect
    function animateFollower() {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;

        follower.style.left = (posX - 16) + 'px';
        follower.style.top = (posY - 16) + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const hoverables = document.querySelectorAll('a, button, .btn, .product-card, .tab-btn, .bento-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.background = 'white';
            follower.style.transform = 'scale(1.8)';
            follower.style.borderColor = 'var(--primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--primary)';
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.querySelector('span') && (btn.querySelector('span').style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`);
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.querySelector('span') && (btn.querySelector('span').style.transform = 'translate(0px, 0px)');
        });
    });
}

// Parallax Effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero Background Parallax
        const heroBg = document.querySelector('.hero-bg .hero-video');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }

        // Floating Cards Parallax
        const c1 = document.querySelector('.floating-card.c1');
        const c2 = document.querySelector('.floating-card.c2');
        if (c1) c1.style.transform = `translateY(${-scrolled * 0.1}px)`;
        if (c2) c2.style.transform = `translateY(${scrolled * 0.05}px)`;
    });
}

// Navbar & Scroll Logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = document.querySelectorAll('.nav-link');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// About Tabs
function initAboutTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.bento-stat .number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCount(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    stats.forEach(s => observer.observe(s));

    function animateCount(el, target) {
        let current = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const inc = target / steps;

        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current);
            }
        }, stepTime);
    }
}


// Products Data & Logic
const products = [
    {
        id: 84,
        name: "SUPER GOLD",
        category: "Nutrients",
        tag: "Potassium Humate",
        desc: "Potassium Humate (Liquid) for soil health.",
        urduName: "سپر گولڈ",
        formula: "C₉H₈K₂O₄",
        fullDesc: "Formula: C₉H₈K₂O₄. Contains 60% Humic Acid and 10-12% K₂O (Potash). Improves soil structure, enhances water retention, increases cation exchange capacity, and boosts nutrient uptake. 100% water-soluble organic soil conditioner.",
        usage: "4 Liters per acre."
    },
    {
        id: 86,
        name: "AZAMAX",
        category: "Nutrients",
        tag: "WS SOP",
        desc: "Potassium Sulphate (SOP) 100% Water Soluble.",
        urduName: "ایزامیکس",
        formula: "K₂SO₄",
        fullDesc: "Formula: K₂SO₄. Contains 50% K₂O (Potash) and 18% Sulphur. Premium chloride-free fertilizer essential for fruit weight, color enhancement, and sugar content. Ideal for high-value and chloride-sensitive crops.",
        usage: "10 kg per acre."
    },
    {
        id: 87,
        name: "BUMPER PLUS",
        category: "Nutrients",
        tag: "Liquid NPK",
        desc: "Liquid Fertilizer N.P.K 8:8:6.",
        urduName: "بمپر پلس",
        formula: "NPK 8:8:6",
        fullDesc: "Formula: NPK 8:8:6. Balanced liquid fertilizer with 8% Nitrogen, 8% Phosphorus (P₂O₅), and 6% Potassium (K₂O). Promotes vigorous vegetative growth, strong root development, and enhanced flowering. Fast-acting foliar and soil application.",
        usage: "1-2 Liters per acre."
    },
    {
        id: 89,
        name: "BOOM",
        category: "Nutrients",
        tag: "Bio-Stimulant",
        desc: "Complex blend of Plant Growth Regulators and Amino Acids.",
        urduName: "بوم",
        formula: "PGR + Amino Acids",
        fullDesc: "Advanced bio-stimulant containing Gibberellic Acid (GA3), Cytokinins, Auxins, and essential Amino Acids. Enhances cell division, improves flowering and fruit set, increases yield, and helps crops recover from stress conditions.",
        usage: "100g per acre."
    },
    {
        id: 90,
        name: "ZINC GOLD",
        category: "Nutrients",
        tag: "Micronutrients",
        desc: "Liquid Micronutrients Mix (Zn, B, Cu, Mn, Fe).",
        urduName: "زنک گولڈ",
        formula: "Zn+B+Cu+Mn+Fe",
        fullDesc: "Multi-micronutrient complex: Zinc 10g/L, Boron 20g/L, Copper 10g/L, Manganese 10g/L, Iron 10g/L. EDTA-chelated for superior absorption. Corrects deficiencies, enhances enzyme activity, improves photosynthesis and overall plant health.",
        usage: "500 ml per acre."
    },
    {
        id: 92,
        name: "ZINC STAR",
        category: "Nutrients",
        tag: "Zinc Supplement",
        desc: "Zinc Sulphate for healthy crop growth.",
        urduName: "زنک سٹار",
        formula: "ZnSO₄·7H₂O",
        fullDesc: "Formula: ZnSO₄·7H₂O (Zinc Sulphate Heptahydrate). Contains 21% Zinc. Essential for enzyme activation, protein synthesis, and growth hormone production. Corrects Zinc deficiency, boosts crop immunity, and increases yield.",
        usage: "10 kg per acre."
    },
    {
        id: 79,
        name: "FINSH 20% SL",
        category: "Insecticide",
        tag: "Systemic",
        desc: "Imidacloprid 20% SL for effective sucking pest control.",
        urduName: "فنش",
        formula: "C₉H₁₀ClN₅O₂",
        fullDesc: "Formula: C₉H₁₀ClN₅O₂ (Imidacloprid 20% SL). Systemic neonicotinoid insecticide with translaminar activity. Acts on nicotinic acetylcholine receptors. Highly effective against aphids, jassids, thrips, and whiteflies. Long-lasting protection.",
        usage: "250-400 ml per acre."
    },
    {
        id: 81,
        name: "PROFAX 50% EC",
        category: "Insecticide",
        tag: "Cotton Expert",
        desc: "Profenofos 50% EC for chewing and sucking pests.",
        urduName: "پرو فیکس",
        formula: "C₁₁H₁₅BrClO₃PS",
        fullDesc: "Formula: C₁₁H₁₅BrClO₃PS (Profenofos 50% EC). Organophosphate insecticide with contact and stomach action. Inhibits acetylcholinesterase enzyme. Broad spectrum control of Bollworms, Jassids, Thrips, and Armyworms in Cotton and vegetables.",
        usage: "800-1000 ml per acre."
    },
    {
        id: 85,
        name: "LAMBDA 2.5% EC",
        category: "Insecticide",
        tag: "Multi-Pest",
        desc: "Lambda-Cyhalothrin 2.5% EC for complete insect control.",
        urduName: "لیمڈا",
        formula: "C₂₃H₁₉ClF₃NO₃",
        fullDesc: "Formula: C₂₃H₁₉ClF₃NO₃ (Lambda-Cyhalothrin 2.5% EC). Synthetic pyrethroid with fast knockdown and residual activity. Disrupts sodium channels in nerve cells. Multi-pest control: Whitefly, Thrips, Jassids, Bollworms. Low dose, high efficacy.",
        usage: "300-500 ml per acre."
    },
    {
        id: 91,
        name: "BIO STAR 10% EC",
        category: "Insecticide",
        tag: "Sucking Pests",
        desc: "Effective control for Whitefly and Jassids.",
        urduName: "بائیو سٹار",
        formula: "10% EC",
        fullDesc: "Bio-rational insecticide 10% EC formulation. Specialized for sucking pest control including Whitefly, Jassids, Aphids, and Thrips. Systemic and contact action with low environmental impact. Safe for beneficial insects when used as directed.",
        usage: "500 ml per acre."
    },
    {
        id: 93,
        name: "CURE 1.8% EC",
        category: "Insecticide",
        tag: "Mite Control",
        desc: "Abamectin 1.8% EC for mites and leaf miners.",
        urduName: "کیور",
        formula: "C₄₈H₇₂O₁₄",
        fullDesc: "Formula: C₄₈H₇₂O₁₄ (Abamectin 1.8% EC). Natural fermentation product from Streptomyces avermitilis. GABA-gated chloride channel activator. Highly effective against spider mites, leaf miners, and other micro-pests. Translaminar activity for complete protection.",
        usage: "150-200 ml per acre."
    },
    {
        id: 94,
        name: "CYPERMETHRIN 10% EC",
        category: "Insecticide",
        tag: "Broad Spectrum",
        desc: "Cypermethrin 10% EC for multiple pests.",
        urduName: "سائپرمیتھرین",
        formula: "C₂₂H₁₉Cl₂NO₃",
        fullDesc: "Formula: C₂₂H₁₉Cl₂NO₃ (Cypermethrin 10% EC). Synthetic pyrethroid with contact and stomach action. Disrupts nerve function by interfering with sodium channels. Broad-spectrum control of Bollworms, Aphids, Jassids, Thrips, and Caterpillars. Fast knockdown effect.",
        usage: "200-400 ml per acre."
    },
    {
        id: 95,
        name: "EMA SUPER 3% SL",
        category: "Insecticide",
        tag: "Lepidoptera",
        desc: "Emamectin Benzoate 3% SL for caterpillar control.",
        urduName: "ایما سپر",
        formula: "C₅₆H₈₁NO₁₅",
        fullDesc: "Formula: C₅₆H₈₁NO₁₅ (Emamectin Benzoate 3% SL). Semi-synthetic derivative of Abamectin. Activates glutamate-gated chloride channels. Superior control of American Bollworm, Pink Bollworm, Spotted Bollworm, and Armyworms. Low application rate with extended residual activity.",
        usage: "80-120 ml per acre."
    },
    {
        id: 78,
        name: "TOPIC",
        category: "Herbicide",
        tag: "Wheat Special",
        desc: "Clodinafop-Propargyl 15% WP for grassy weeds in wheat.",
        urduName: "ٹوپک",
        formula: "C₁₇H₁₃ClFNO₄",
        fullDesc: "Formula: C₁₇H₁₃ClFNO₄ (Clodinafop-Propargyl 15% WP). Post-emergence selective herbicide. Inhibits ACCase enzyme in grassy weeds. Highly effective against Phalaris minor (Dumbi sitti) and Wild Oats (Jangli jai) in wheat. Safe for wheat crop.",
        usage: "120 g per acre."
    },
    {
        id: 80,
        name: "BROMOXYNIL 40EC",
        category: "Herbicide",
        tag: "Broadleaf",
        desc: "Bromoxynil + MCPA for broadleaf weeds in wheat.",
        urduName: "بروموکسینیل",
        formula: "C₇H₃Br₂NO + C₉H₉ClO₃",
        fullDesc: "Formula: Bromoxynil (C₇H₃Br₂NO) + MCPA (C₉H₉ClO₃) 40% EC. Combination herbicide with contact and systemic action. Bromoxynil inhibits photosynthesis; MCPA acts as synthetic auxin. Controls annual broadleaf weeds in wheat and barley.",
        usage: "800 ml per acre."
    },
    {
        id: 82,
        name: "PENDIMETHALIN 33% EC",
        category: "Herbicide",
        tag: "Pre-Emergence",
        desc: "Pendimethalin 33% EC for pre-emergence weed control.",
        urduName: "پینڈی میتھالین",
        formula: "C₁₃H₁₉N₃O₄",
        fullDesc: "Formula: C₁₃H₁₉N₃O₄ (Pendimethalin 33% EC). Selective pre-emergence dinitroaniline herbicide. Inhibits cell division and root development in germinating weeds. Controls annual grasses and broadleaf weeds in Cotton, Maize, Vegetables, and Onion.",
        usage: "1000-1200 ml per acre."
    },
    {
        id: 83,
        name: "KAM 15% EC",
        category: "Herbicide",
        tag: "Grass Killer",
        desc: "Quizalofop-p-ethyl 15% EC for grassy weeds.",
        urduName: "کام",
        formula: "C₁₉H₁₇ClN₂O₄",
        fullDesc: "Formula: C₁₉H₁₇ClN₂O₄ (Quizalofop-p-ethyl 15% EC). Post-emergence selective systemic herbicide. Inhibits ACCase enzyme specific to grasses. Highly effective against annual and perennial grassy weeds in Cotton, Onion, Soybean, and other broadleaf crops.",
        usage: "300-400 ml per acre."
    },
    {
        id: 88,
        name: "TOPX 42% EC",
        category: "Herbicide",
        tag: "Cotton Weeds",
        desc: "Effective herbicide for weeds in Cotton.",
        urduName: "ٹوپیکس",
        formula: "42% EC",
        fullDesc: "Advanced herbicide formulation 42% EC. Dual-action control of annual grasses and broadleaf weeds in Cotton. Pre and post-emergence activity with selective safety for Cotton crop. Provides extended weed control for clean fields.",
        usage: "800-1000 ml per acre."
    }
];

function initProducts() {
    const grid = document.getElementById('productGrid');
    const searchInput = document.getElementById('productSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProducts(filtered) {
        grid.innerHTML = filtered.map(p => `
            <div class="product-card animate-on-scroll visible" data-category="${p.category}">
                <div class="product-tag">${p.tag}</div>
                <div class="product-img-box">
                    <span style="font-size: 5rem; opacity: 0.2; filter: grayscale(1);">🧪</span>
                </div>
                <div class="product-info">
                    <div class="product-cat">${p.category}</div>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-urdu urdu" style="font-size: 1.1rem; color: var(--primary); margin-bottom: 1rem;">${p.urduName}</div>
                    <p>${p.desc}</p>
                    <div class="product-footer">
                        <button class="btn btn-outline" style="padding: 0.7rem 1.5rem; font-size: 0.8rem; border-radius: 12px;" onclick="openProduct(${p.id})">
                            Detailed Science
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProducts(products);

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
            renderProducts(filtered);
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(val) ||
            p.urduName.includes(val) ||
            p.category.toLowerCase().includes(val)
        );
        renderProducts(filtered);
    });
}

// Modal Logic
window.openProduct = function (id) {
    const modal = document.getElementById('productModal');
    const body = document.getElementById('modalBody');
    const p = products.find(prod => prod.id === id);

    if (!p) return;

    body.innerHTML = `
        <div class="modal-grid" style="display:grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start;">
            <div class="modal-img-placeholder" style="background:var(--bg-soft); border-radius:30px; height:500px; display:flex; align-items:center; justify-content:center; font-size:12rem; border:1px solid rgba(0,0,0,0.05); position:relative;">
                <span style="opacity:0.3;">📦</span>
                <div style="position:absolute; bottom:2rem; left:2rem; background:white; padding:1rem 2rem; border-radius:15px; font-weight:800; font-size:0.8rem; text-transform:uppercase; color:var(--primary); box-shadow:var(--shadow-md);">Certified Pure</div>
            </div>
            <div class="modal-info">
                <span class="subtitle" style="font-size:0.8rem;">Chemical Profile</span>
                <h2 style="font-size:3.5rem; line-height:1; margin-bottom:0.5rem; letter-spacing:-0.04em;">${p.name}</h2>
                <h3 class="urdu" style="font-size:2.2rem; color:var(--primary); margin-bottom:2.5rem;">${p.urduName}</h3>
                
                <div class="modal-item" style="margin-bottom:2.5rem;">
                    <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.15em; color:var(--text-muted); margin-bottom:1rem;">Technical Specifications</h4>
                    <p style="font-size:1.15rem; line-height:1.6; color:var(--text-main); font-weight:500;">${p.fullDesc}</p>
                </div>
                
                <div class="usage-card" style="background:var(--secondary); padding:2.5rem; border-radius:30px; color:white; position:relative; overflow:hidden;">
                    <div style="position:relative; z-index:1;">
                        <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.2rem;">
                            <span style="font-size:1.5rem;">⚙️</span>
                            <strong style="font-size:1rem; text-transform:uppercase; letter-spacing:0.15em;">Field Application Strategy</strong>
                        </div>
                        <p style="font-size:1.1rem; opacity:0.85; line-height:1.7;">${p.usage}</p>
                    </div>
                </div>
                
                <a href="https://wa.me/923312407096?text=Hello%20Hub%20Agro%2C%20I%20need%20expert%20consultation%20on%3A%20${encodeURIComponent(p.name)}" target="_blank" class="btn btn-primary" style="margin-top:3rem; width:100%; padding:1.4rem; font-size:1.1rem; border-radius:24px; box-shadow:var(--shadow-lg);">
                    Connect with Technical Expert
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close Modal
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initYear() {
    document.getElementById('year').innerText = new Date().getFullYear();
}
