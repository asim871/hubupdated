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
        fullDesc: "Contains Humic Acid (10%) and Potash (3.5%). Improves soil structure, water retention, and nutrient uptake.",
        usage: "4 Liters per acre."
    },
    {
        id: 86,
        name: "AZAMAX",
        category: "Nutrients",
        tag: "WS SOP",
        desc: "Potassium Sulphate (SOP) 100% Water Soluble.",
        urduName: "ایزامیکس",
        fullDesc: "Contains 50% Potash and 18% Sulphur. Essential for fruit weight, color, and sugar content. Chloride free.",
        usage: "10 kg per acre."
    },
    {
        id: 87,
        name: "BUMPER PLUS",
        category: "Nutrients",
        tag: "Liquid NPK",
        desc: "Liquid Fertilizer N.P.K 8:8:6.",
        urduName: "بمپر پلس",
        fullDesc: "Balanced liquid fertilizer containing Nitrogen (8%), Phosphorus (8%), and Potassium (6%). Promotes vigorous growth.",
        usage: "1-2 Liters per acre."
    },
    {
        id: 89,
        name: "BOOM",
        category: "Nutrients",
        tag: "Bio-Stimulant",
        desc: "Complex blend of Plant Growth Regulators and Amino Acids.",
        urduName: "بوم",
        fullDesc: "Enhances plant growth, improves flowering, and increases yield. Contains Gibberellic Acid and Amino Acids.",
        usage: "100g per acre."
    },
    {
        id: 90,
        name: "ZINC GOLD",
        category: "Nutrients",
        tag: "Micronutrients",
        desc: "Liquid Micronutrients Mix (Zn, B, Cu, Mn, Fe).",
        urduName: "زنک گولڈ",
        fullDesc: "Contains Zinc (10g/L), Boron (20g/L), Copper, Manganese, and Iron (10g/L each). Essential for correcting micronutrient deficiencies.",
        usage: "500 ml per acre."
    },
    {
        id: 92,
        name: "ZINC STAR",
        category: "Nutrients",
        tag: "Zinc Supplement",
        desc: "Zinc Sulphate for healthy crop growth.",
        urduName: "زنک سٹار",
        fullDesc: "High-quality Zinc supplement to boost crop immunity and yield. Corrects Zinc deficiency.",
        usage: "10 kg per acre."
    },
    {
        id: 79,
        name: "FINSH 20% SL",
        category: "Insecticide",
        tag: "Systemic",
        desc: "Imidacloprid 20% SL for effective sucking pest control.",
        urduName: "فنش",
        fullDesc: "Systemic insecticide with translaminar activity. Controls aphids, jassids, thrips and whiteflies effectively.",
        usage: "250-400 ml per acre."
    },
    {
        id: 81,
        name: "PROFAX 50% EC",
        category: "Insecticide",
        tag: "Cotton Expert",
        desc: "Profenofos 50% EC for chewing and sucking pests.",
        urduName: "پرو فیکس",
        fullDesc: "Broad spectrum insecticide. Highly effective against Bollworms, Jassids, and Thrips in Cotton.",
        usage: "800-1000 ml per acre."
    },
    {
        id: 85,
        name: "LAMBDA 2.5% EC",
        category: "Insecticide",
        tag: "Multi-Pest",
        desc: "Lambda-Cyhalothrin 2.5% EC for complete insect control.",
        urduName: "لیمڈا",
        fullDesc: "Effective against Whitefly, Thrips, Jassids, and Bollworms. Low dose, high effect.",
        usage: "300-500 ml per acre."
    },
    {
        id: 91,
        name: "BIO STAR 10% EC",
        category: "Insecticide",
        tag: "Sucking Pests",
        desc: "Effective control for Whitefly and Jassids.",
        urduName: "بائیو سٹار",
        fullDesc: "Insecticide formulation targeting sucking pests like Whitefly and Jassids. 10% EC formulation.",
        usage: "500 ml per acre."
    },
    {
        id: 78,
        name: "TOPIC",
        category: "Herbicide",
        tag: "Wheat Special",
        desc: "Clodinafop-Propargyl 15% WP for grassy weeds in wheat.",
        urduName: "ٹوپک",
        fullDesc: "Effective against Phalaris minor (Dumbi sitti) and Wild Oats (Jangli jai) in wheat crop. Safe for the main crop.",
        usage: "120 g per acre."
    },
    {
        id: 80,
        name: "BROMOXYNIL 40EC",
        category: "Herbicide",
        tag: "Broadleaf",
        desc: "Bromoxynil + MCPA for broadleaf weeds in wheat.",
        urduName: "بروموکسینیل",
        fullDesc: "Selective contact herbicide for the control of annual broadleaf weeds in wheat and barley.",
        usage: "800 ml per acre."
    },
    {
        id: 82,
        name: "PENDIMETHALIN 33% EC",
        category: "Herbicide",
        tag: "Pre-Emergence",
        desc: "Pendimethalin 33% EC for pre-emergence weed control.",
        urduName: "پینڈی میتھالین",
        fullDesc: "Selective pre-emergence herbicide. Controls annual grasses and broadleaf weeds in Cotton, Maize, and Vegetables.",
        usage: "1000-1200 ml per acre."
    },
    {
        id: 83,
        name: "KAM 15% EC",
        category: "Herbicide",
        tag: "Grass Killer",
        desc: "Quizalofop-p-ethyl 15% EC for grassy weeds.",
        urduName: "کام",
        fullDesc: "Selective systemic herbicide. Highly effective against annual and perennial grassy weeds in broadleaf crops.",
        usage: "300-400 ml per acre."
    },
    {
        id: 88,
        name: "TOPX 42% EC",
        category: "Herbicide",
        tag: "Cotton Weeds",
        desc: "Effective herbicide for weeds in Cotton.",
        urduName: "ٹوپیکس",
        fullDesc: "Controls annual grasses and broadleaf weeds in Cotton.",
        usage: "800-1000 ml per acre."
    }
];
{
    id: 84,
        name: "SUPER GOLD",
            category: "Nutrients",
                tag: "Potassium Humate",
                    desc: "Potassium Humate (Liquid) for soil health.",
                        urduName: "سپر گولڈ",
                            fullDesc: "Contains Humic Acid (10%) and Potash (3.5%). Improves soil structure, water retention, and nutrient uptake.",
                                usage: "4 Liters per acre."
},
{
    id: 86,
        name: "AZAMAX",
            category: "Nutrients",
                tag: "WS SOP",
                    desc: "Potassium Sulphate (SOP) 100% Water Soluble.",
                        urduName: "ایزامیکس",
                            fullDesc: "Contains 50% Potash and 18% Sulphur. Essential for fruit weight, color, and sugar content. Chloride free.",
                                usage: "10 kg per acre."
},
{
    id: 87,
        name: "BUMPER PLUS",
            category: "Nutrients",
                tag: "Liquid NPK",
                    desc: "Liquid Fertilizer N.P.K 8:8:6.",
                        urduName: "بمپر پلس",
                            fullDesc: "Balanced liquid fertilizer containing Nitrogen (8%), Phosphorus (8%), and Potassium (6%). Promotes vigorous growth.",
                                usage: "1-2 Liters per acre."
},
{
    id: 89,
        name: "BOOM",
            category: "Nutrients",
                tag: "Bio-Stimulant",
                    desc: "Complex blend of Plant Growth Regulators and Amino Acids.",
                        urduName: "بوم",
                            fullDesc: "Enhances plant growth, improves flowering, and increases yield. Contains Gibberellic Acid and Amino Acids.",
                                usage: "100g per acre."
},
{
    id: 90,
        name: "ZINC GOLD",
            category: "Nutrients",
                tag: "Micronutrients",
                    desc: "Liquid Micronutrients Mix (Zn, B, Cu, Mn, Fe).",
                        urduName: "زنک گولڈ",
                            fullDesc: "Contains Zinc (10g/L), Boron (20g/L), Copper, Manganese, and Iron (10g/L each). Essential for correcting micronutrient deficiencies.",
                                usage: "500 ml per acre."
},
{
    id: 92,
        name: "ZINC STAR",
            category: "Nutrients",
                tag: "Zinc Supplement",
                    desc: "Zinc Sulphate for healthy crop growth.",
                        urduName: "زنک سٹار",
                            fullDesc: "High-quality Zinc supplement to boost crop immunity and yield. Corrects Zinc deficiency.",
                                usage: "10 kg per acre."
},
{
    id: 79,
        name: "FINSH 20% SL",
            category: "Insecticide",
                tag: "Systemic",
                    desc: "Imidacloprid 20% SL for effective sucking pest control.",
                        urduName: "فنش",
                            fullDesc: "Systemic insecticide with translaminar activity. Controls aphids, jassids, thrips and whiteflies effectively.",
                                usage: "250-400 ml per acre."
},
{
    id: 81,
        name: "PROFAX 50% EC",
            category: "Insecticide",
                tag: "Cotton Expert",
                    desc: "Profenofos 50% EC for chewing and sucking pests.",
                        urduName: "پرو فیکس",
                            fullDesc: "Broad spectrum insecticide. Highly effective against Bollworms, Jassids, and Thrips in Cotton.",
                                usage: "800-1000 ml per acre."
},
{
    id: 85,
        name: "LAMBDA 2.5% EC",
            category: "Insecticide",
                tag: "Multi-Pest",
                    desc: "Lambda-Cyhalothrin 2.5% EC for complete insect control.",
                        urduName: "لیمڈا",
                            fullDesc: "Effective against Whitefly, Thrips, Jassids, and Bollworms. Low dose, high effect.",
                                usage: "300-500 ml per acre."
},
{
    id: 91,
        name: "BIO STAR 10% EC",
            category: "Insecticide",
                tag: "Sucking Pests",
                    desc: "Effective control for Whitefly and Jassids.",
                        urduName: "بائیو سٹار",
                            fullDesc: "Insecticide formulation targeting sucking pests like Whitefly and Jassids. 10% EC formulation.",
                                usage: "500 ml per acre."
},
{
    id: 78,
        name: "TOPIC",
            category: "Herbicide",
                tag: "Wheat Special",
                    desc: "Clodinafop-Propargyl 15% WP for grassy weeds in wheat.",
                        urduName: "ٹوپک",
                            fullDesc: "Effective against Phalaris minor (Dumbi sitti) and Wild Oats (Jangli jai) in wheat crop. Safe for the main crop.",
                                usage: "120 g per acre."
},
{
    id: 80,
        name: "BROMOXYNIL 40EC",
            category: "Herbicide",
                tag: "Broadleaf",
                    desc: "Bromoxynil + MCPA for broadleaf weeds in wheat.",
                        urduName: "بروموکسینیل",
                            fullDesc: "Selective contact herbicide for the control of annual broadleaf weeds in wheat and barley.",
                                usage: "800 ml per acre."
},
{
    id: 82,
        name: "PENDIMETHALIN 33% EC",
            category: "Herbicide",
                tag: "Pre-Emergence",
                    desc: "Pendimethalin 33% EC for pre-emergence weed control.",
                        urduName: "پینڈی میتھالین",
                            fullDesc: "Selective pre-emergence herbicide. Controls annual grasses and broadleaf weeds in Cotton, Maize, and Vegetables.",
                                usage: "1000-1200 ml per acre."
},
{
    id: 83,
        name: "KAM 15% EC",
            category: "Herbicide",
                tag: "Grass Killer",
                    desc: "Quizalofop-p-ethyl 15% EC for grassy weeds.",
                        urduName: "کام",
                            fullDesc: "Selective systemic herbicide. Highly effective against annual and perennial grassy weeds in broadleaf crops.",
                                usage: "300-400 ml per acre."
},
{
    id: 88,
        name: "TOPX 42% EC",
            category: "Herbicide",
                tag: "Cotton Weeds",
                    desc: "Effective herbicide for weeds in Cotton.",
                        urduName: "ٹوپیکس",
                            fullDesc: "Controls annual grasses and broadleaf weeds in Cotton.",
                                usage: "800-1000 ml per acre."
}
];
{
    id: 84,
        name: "SUPER GOLD",
            category: "Nutrients",
                tag: "Potassium Humate",
                    desc: "Potassium Humate (Liquid) for soil health.",
                        urduName: "سپر گولڈ",
                            fullDesc: "Contains Humic Acid (10%) and Potash (3.5%). Improves soil structure, water retention, and nutrient uptake.",
                                usage: "4 Liters per acre."
},
{
    id: 86,
        name: "AZAMAX",
            category: "Nutrients",
                tag: "WS SOP",
                    desc: "Potassium Sulphate (SOP) 100% Water Soluble.",
                        urduName: "ایزامیکس",
                            fullDesc: "Contains 50% Potash and 18% Sulphur. Essential for fruit weight, color, and sugar content. Chloride free.",
                                usage: "10 kg per acre."
},
{
    id: 87,
        name: "BUMPER PLUS",
            category: "Nutrients",
                tag: "Liquid NPK",
                    desc: "Liquid Fertilizer N.P.K 8:8:6.",
                        urduName: "بمپر پلس",
                            fullDesc: "Balanced liquid fertilizer containing Nitrogen (8%), Phosphorus (8%), and Potassium (6%). Promotes vigorous growth.",
                                usage: "1-2 Liters per acre."
},
{
    id: 89,
        name: "BOOM",
            category: "Nutrients",
                tag: "Bio-Stimulant",
                    desc: "Complex blend of Plant Growth Regulators and Amino Acids.",
                        urduName: "بوم",
                            fullDesc: "Enhances plant growth, improves flowering, and increases yield. Contains Gibberellic Acid and Amino Acids.",
                                usage: "100g per acre."
},
{
    id: 1,
        name: "BIG RICH",
            category: "Nutrients",
                tag: "Organic",
                    desc: "High-quality granular, 100% water-soluble organic soil enhancer.",
                        urduName: "بگ رچ",
                            fullDesc: "BIG RICH is a granular, 100% water-soluble organic soil amendment that improves nutrient availability for plants. It enhances soil structure, increases root development, improves aeration and boosts crop height, color and yield. FREE FROM harmful chemicals and chlorine.",
                                usage: "2 kg per acre for field crops. 15-20 kg for orchards."
},
{
    id: 2,
        name: "VITAL DP NPK 12:12:8",
            category: "Nutrients",
                tag: "Balanced",
                    desc: "Balanced NPK fertilizer for strong root development and healthy growth.",
                        urduName: "وائٹل ڈی پی",
                            fullDesc: "VITAL DP (NPK 12:12:8) is a balanced fertilizer containing Nitrogen, Phosphorus and Potash. This fertilizer strengthens roots, promotes green growth and increases overall yield.",
                                usage: "500 ml per acre during sowing or hoeing stages."
},
{
    id: 3,
        name: "WELL POSITION BIO-ORGANIC",
            category: "Nutrients",
                tag: "Bio-Fertilizer",
                    desc: "100% water-soluble bio-organic liquid fertilizer with amino acids.",
                        urduName: "ویل پوزیشن بائیو آرگینک",
                            fullDesc: "Made from condensed molasses fermentation solubles. Contains 13 essential amino acids. Improves soil physical and chemical properties.",
                                usage: "Apply every 10-15 days. Up to 6 times per season."
},
{
    id: 4,
        name: "SAR SABZ PLUS",
            category: "Nutrients",
                tag: "Stimulant",
                    desc: "Natural Bio Stimulant based on Amino Acids (10%) for vigor.",
                        urduName: "سر سبز پلس",
                            fullDesc: "Contains Cytokinesis, Auxin, and Gibberellins. Helps in improving plant growth, enhancing crop vigor, and supporting healthy development.",
                                usage: "500 ml per 100 liters of water for foliar spray."
},
{
    id: 5,
        name: "PLANOFIXER",
            category: "Nutrients",
                tag: "Regulator",
                    desc: "Plant Growth Regulator with NAA for flower and fruit retention.",
                        urduName: "پلانوفکسر",
                            fullDesc: "Formulated to improve plant growth, strengthen flower and fruit retention, and significantly reduce fruit drop.",
                                usage: "25 ml per acre for cotton. 25 ml per 100L water for fruits."
},
{
    id: 79,
        name: "FINSH 20% SL",
            category: "Insecticide",
                tag: "Systemic",
                    desc: "Imidacloprid 20% SL for effective sucking pest control.",
                        urduName: "فنش",
                            fullDesc: "Systemic insecticide with translaminar activity. Controls aphids, jassids, thrips and whiteflies effectively.",
                                usage: "250-400 ml per acre."
},
{
    id: 81,
        name: "PROFAX 50% EC",
            category: "Insecticide",
                tag: "Cotton Expert",
                    desc: "Profenofos 50% EC for chewing and sucking pests.",
                        urduName: "پرو فیکس",
                            fullDesc: "Broad spectrum insecticide. Highly effective against Bollworms, Jassids, and Thrips in Cotton.",
                                usage: "800-1000 ml per acre."
},
{
    id: 85,
        name: "LAMBDA 2.5% EC",
            category: "Insecticide",
                tag: "Multi-Pest",
                    desc: "Lambda-Cyhalothrin 2.5% EC for complete insect control.",
                        urduName: "لیمڈا",
                            fullDesc: "Effective against Whitefly, Thrips, Jassids, and Bollworms. Low dose, high effect.",
                                usage: "300-500 ml per acre."
},
{
    id: 6,
        name: "MEGA FALL 440 EC",
            category: "Insecticide",
                tag: "Systemic",
                    desc: "Powerful broad-spectrum insecticide for multiple pests.",
                        urduName: "میگا فال",
                            fullDesc: "A combination of Cypermethrin and Profenofos, providing quick knockdown and long-lasting pest control against American, Pink and Spotted Bollworms.",
                                usage: "500-600 ml per acre."
},
{
    id: 7,
        name: "EMMA CLASSIC 1.9% EC",
            category: "Insecticide",
                tag: "Miticide",
                    desc: "Advanced miticide for effective control of mites in cotton.",
                        urduName: "ایما کلاسک",
                            fullDesc: "Produced through fermentation from natural bacteria Streptomyces avermitilis. High efficacy at low dosage.",
                                usage: "200 ml per acre via spray."
},
{
    id: 78,
        name: "TOPIC",
            category: "Herbicide",
                tag: "Wheat Special",
                    desc: "Clodinafop-Propargyl 15% WP for grassy weeds in wheat.",
                        urduName: "ٹوپک",
                            fullDesc: "Effective against Phalaris minor (Dumbi sitti) and Wild Oats (Jangli jai) in wheat crop. Safe for the main crop.",
                                usage: "120 g per acre."
},
{
    id: 80,
        name: "BROMOXYNIL 40EC",
            category: "Herbicide",
                tag: "Broadleaf",
                    desc: "Bromoxynil + MCPA for broadleaf weeds in wheat.",
                        urduName: "بروموکسینیل",
                            fullDesc: "Selective contact herbicide for the control of annual broadleaf weeds in wheat and barley.",
                                usage: "800 ml per acre."
},
{
    id: 82,
        name: "PENDIMETHALIN 33% EC",
            category: "Herbicide",
                tag: "Pre-Emergence",
                    desc: "Pendimethalin 33% EC for pre-emergence weed control.",
                        urduName: "پینڈی میتھالین",
                            fullDesc: "Selective pre-emergence herbicide. Controls annual grasses and broadleaf weeds in Cotton, Maize, and Vegetables.",
                                usage: "1000-1200 ml per acre."
},
{
    id: 83,
        name: "KAM 15% EC",
            category: "Herbicide",
                tag: "Grass Killer",
                    desc: "Quizalofop-p-ethyl 15% EC for grassy weeds.",
                        urduName: "کام",
                            fullDesc: "Selective systemic herbicide. Highly effective against annual and perennial grassy weeds in broadleaf crops.",
                                usage: "300-400 ml per acre."
},
{
    id: 88,
        name: "TOPX 42% EC",
            category: "Herbicide",
                tag: "Cotton Weeds",
                    desc: "Effective herbicide for weeds in Cotton.",
                        urduName: "ٹوپیکس",
                            fullDesc: "Controls annual grasses and broadleaf weeds in Cotton.",
                                usage: "800-1000 ml per acre."
},
{
    id: 8,
        name: "HUBRO HERB-X",
            category: "Herbicide",
                tag: "Selective",
                    desc: "Pre-emergence herbicide for broadleaf and grassy weeds.",
                        urduName: "حب ہرب ایکس",
                            fullDesc: "Keeps the field weed-free in critical early stages, allowing crops to use full moisture and nutrients.",
                                usage: "300-500 ml per acre on moist soil."
},
{
    id: 9,
        name: "FUNGIGUARD PLUS",
            category: "Fungicide",
                tag: "Protective",
                    desc: "Systemic fungicide for leaf spot and fruit disease management.",
                        urduName: "فنگی گارڈ پلس",
                            fullDesc: "Protects stems and fruits from major fungal diseases, improving plant health and overall crop quality.",
                                usage: "150-250 g/ml per acre depending on severity."
},
// New 68 Products start here
{
    id: 10,
        name: "HUBRO ZINC-MAX",
            category: "Nutrients",
                tag: "Liquid",
                    desc: "High-concentration liquid zinc for early crop vigor.",
                        urduName: "حب زنک میکس",
                            fullDesc: "Corrects zinc deficiency quickly, essential for enzyme systems and growth hormones in rice and maize.",
                                usage: "500 ml per acre for rice and field crops."
},
{
    id: 11,
        name: "HUBRO BORON-PRO",
            category: "Nutrients",
                tag: "Micronutrient",
                    desc: "Foliar boron for better flowering and fruit set.",
                        urduName: "حب بورون پرو",
                            fullDesc: "Crucial for pollen tube growth and sugar transport. Prevents fruit cracking and hollow heart.",
                                usage: "250-400 ml per acre during pre-flowering."
},
{
    id: 12,
        name: "HUBRO CAL-MAG",
            category: "Nutrients",
                tag: "Soil Health",
                    desc: "Calcium and Magnesium supplement for cell wall strength.",
                        urduName: "حب کیل میگ",
                            fullDesc: "Enhances plant structure and chlorophyll production. Ideal for fruits and leafy vegetables.",
                                usage: "1 Liter per acre via irrigation or foliar spray."
},
{
    id: 13,
        name: "HUBRO ACY-BOOST",
            category: "Nutrients",
                tag: "Energy",
                    desc: "Energy-boosting complex for stress recovery from heat.",
                        urduName: "حب ایسی بوسٹ",
                            fullDesc: "Helps crops recover from environmental stress, drought, and transplanting shock.",
                                usage: "500 ml per acre during extreme weather conditions."
},
{
    id: 14,
        name: "HUBRO POTASH-L",
            category: "Nutrients",
                tag: "Liquid Potash",
                    desc: "Highly available liquid potassium for fruit weight and color.",
                        urduName: "حب پوٹاش ایل",
                            fullDesc: "Improves water utilization and grain filling. Increases weight, shine, and brix in fruits.",
                                usage: "1 Liter per acre during fruit development stage."
},
{
    id: 15,
        name: "HUBRO HUMO-ROOT",
            category: "Nutrients",
                tag: "Liquid Humic",
                    desc: "Liquid Humic Acid with Fulvic Acid for root explosion.",
                        urduName: "حب ہیومو روٹ",
                            fullDesc: "Improves soil structure and microbial activity. Accelerates seed germination and root growth.",
                                usage: "2-4 Liters per acre through drip or flood irrigation."
},
{
    id: 16,
        name: "HUBRO MAXI-GREEN",
            category: "Nutrients",
                tag: "Iron Chelate",
                    desc: "Iron chelate complex to solve leaf yellowing (Chlorosis).",
                        urduName: "حب میکسی گرین",
                            fullDesc: "Restores dark green color to leaves. Essential for chlorophyll synthesis in calcareous soils.",
                                usage: "300-500 g per acre via soil or foliar application."
},
{
    id: 17,
        name: "HUBRO FLOWER-SET",
            category: "Nutrients",
                tag: "Hormonal",
                    desc: "Balanced hormone mix for uniform flowering and fruit set.",
                        urduName: "حب فلاور سیٹ",
                            fullDesc: "Prevents abscission of flowers and small fruits. Promotes uniform maturity and higher yield.",
                                usage: "20-30 ml per 100 liters of water."
},
{
    id: 18,
        name: "HUBRO CROP-SHIELD",
            category: "Nutrients",
                tag: "Silica",
                    desc: "Potassium Silica based formula for hardier stems.",
                        urduName: "حب کراپ شیلڈ",
                            fullDesc: "Thickens plant cell walls, making them more resistant to insects and fungal penetration.",
                                usage: "500 ml per acre during peak vegetative growth."
},
{
    id: 19,
        name: "HUBRO AMINO-PLUS",
            category: "Nutrients",
                tag: "Pure Amino",
                    desc: "Concentrated 50% Amino Acids for quick protein synthesis.",
                        urduName: "حب امینو پلس",
                            fullDesc: "Direct supply of protein building blocks. Saves plant energy during critical growth phases.",
                                usage: "250-500 ml per acre for any crop under stress."
},
{
    id: 20,
        name: "HUBRO DELTA-CEL",
            category: "Insecticide",
                tag: "Contact",
                    desc: "Deltamethrin formulation for quick knockdown of pests.",
                        urduName: "حب ڈیلٹا سیل",
                            fullDesc: "Broad-spectrum contact insecticide. Effective against aphids, thrips, and beetles.",
                                usage: "250-400 ml per acre."
},
{
    id: 21,
        name: "HUBRO LAMBDA-X",
            category: "Insecticide",
                tag: "Strong",
                    desc: "Lambda-Cyhalothrin for bollworm and caterpillar control.",
                        urduName: "حب لیمڈا ایکس",
                            fullDesc: "Advanced pyrethroid for rapid control of armyworms, bollworms, and leaf folders.",
                                usage: "200-300 ml per acre."
},
{
    id: 22,
        name: "HUBRO IMIDA-GOLD",
            category: "Insecticide",
                tag: "Systemic",
                    desc: "Imidacloprid for effective control of sucking pests.",
                        urduName: "حبایمیڈا گولڈ",
                            fullDesc: "Long-lasting systemic protection against jassids, thrips, and whiteflies.",
                                usage: "100-200 ml per acre or as seed treatment."
},
{
    id: 23,
        name: "HUBRO ABAMECT-PRO",
            category: "Insecticide",
                tag: "Acaricide",
                    desc: "Abamectin based formula for spider mites and leaf miners.",
                        urduName: "حب ابامیکٹ پرو",
                            fullDesc: "High penetration power. Targets mites and developmental stages of insects on many crops.",
                                usage: "150-250 ml per acre."
},
{
    id: 24,
        name: "HUBRO THIA-SYSTEM",
            category: "Insecticide",
                tag: "Systemic",
                    desc: "Thiamethoxam for wide-spectrum sucking pest control.",
                        urduName: "حب تھیا سسٹم",
                            fullDesc: "Highly soluble systemic insecticide. Rapidly translocated within the plant for complete protection.",
                                usage: "40-80 g per acre."
},
{
    id: 25,
        name: "HUBRO CHLOR-FORCE",
            category: "Insecticide",
                tag: "Legendary",
                    desc: "Chlorpyrifos for soil-borne and foliage insects.",
                        urduName: "حب کلور فورس",
                            fullDesc: "Controls termites, root grubs, and various caterpillars via contact and stomach action.",
                                usage: "1-2 Liters per acre for soil or 500-800 ml for foliage."
},
{
    id: 26,
        name: "HUBRO BIFEN-PRO",
            category: "Insecticide",
                tag: "Residual",
                    desc: "Bifenthrin for controlling termites and whiteflies.",
                        urduName: "حب بائفن پرو",
                            fullDesc: "Excellent residual control. Effective against bollworms and chewing pests too.",
                                usage: "250-400 ml per acre."
},
{
    id: 27,
        name: "HUBRO ACETA-CLEAN",
            category: "Insecticide",
                tag: "Whitefly",
                    desc: "Acetamiprid for specialized whitefly and aphid control.",
                        urduName: "حب ایسیٹا کلین",
                            fullDesc: "Translaminar action controls pests on the underside of leaves. Safe for many beneficial insects.",
                                usage: "100-150 g per acre."
},
{
    id: 28,
        name: "HUBRO LUFEN-GUARD",
            category: "Insecticide",
                tag: "Growth Regulator",
                    desc: "Lufenuron for controlling armyworms and larvae.",
                        urduName: "حب لیوفن گارڈ",
                            fullDesc: "Insect growth regulator. Prevents larvae from molting, leading to death. Safe for adults.",
                                usage: "200-400 ml per acre."
},
{
    id: 29,
        name: "HUBRO CARTAP-SP",
            category: "Insecticide",
                tag: "Rice Expert",
                    desc: "Cartap hydrochloride for stem borers in rice.",
                        urduName: "حب کارٹاپ ایس پی",
                            fullDesc: "Systemic, contact and stomach action. Specifically designed for rice stem borers and leaf folders.",
                                usage: "500-1000 g per acre via granules or spray."
},
{
    id: 30,
        name: "HUBRO EMAMECT-MAX",
            category: "Insecticide",
                tag: "Caterpillar",
                    desc: "Concentrated Emamectin Benzoate for bollworms.",
                        urduName: "حب ایمامیکٹ میکس",
                            fullDesc: "High-speed control of bollworms, armyworms, and fruit borers. Minimal pre-harvest intervals.",
                                usage: "100-200 ml per acre."
},
{
    id: 31,
        name: "HUBRO INDOXA-KILL",
            category: "Insecticide",
                tag: "Advansed",
                    desc: "Indoxacarb for tough caterpillar species.",
                        urduName: "حب انڈوکساکل",
                            fullDesc: "Strong stomach action. Effective against lepidopteran pests resistant to other chemicals.",
                                usage: "150-250 ml per acre."
},
{
    id: 32,
        name: "HUBRO DINOTO-SYS",
            category: "Insecticide",
                tag: "New Gen",
                    desc: "Dinotefuran for resistant jassids and whiteflies.",
                        urduName: "حب ڈائینوٹو سس",
                            fullDesc: "Third-generation neonicotinoid. Excellent movement within plant and extremely fast action.",
                                usage: "100-200 g per acre."
},
{
    id: 33,
        name: "HUBRO SPIRO-MITE",
            category: "Insecticide",
                tag: "Mite Pro",
                    desc: "Spiromesifen for nymphal control of whiteflies and mites.",
                        urduName: "حب اسپائٹرو مائٹ",
                            fullDesc: "Unique mode of action inhibits lipid biosynthesis. Excellent for managing resistance.",
                                usage: "100-150 ml per acre."
},
{
    id: 34,
        name: "HUBRO DUA-STRIKE",
            category: "Insecticide",
                tag: "Combo",
                    desc: "Dual action formula (Imida + Lambda) for broad spectrum.",
                        urduName: "حب ڈوا اسٹرائیک",
                            fullDesc: "Combines systemic and contact modes for total insect protection in cotton and vegetables.",
                                usage: "300-500 ml per acre."
},
{
    id: 35,
        name: "HUBRO HEXA-FLUM",
            category: "Insecticide",
                tag: "IGR",
                    desc: "Hexaflumuron for termite control and forestry.",
                        urduName: "حب ہیکسا فلوم",
                            fullDesc: "High-end baiting and soil treatment for building protection and crop soil mites.",
                                usage: "As per soil volume or 500 ml per acre."
},
{
    id: 36,
        name: "HUBRO DIAFENT-SAFE",
            category: "Insecticide",
                tag: "Soft Body",
                    desc: "Diafenthiuron for whiteflies and aphids.",
                        urduName: "حب ڈایافینٹ سیف",
                            fullDesc: "Vapor action reaches deep into leaf canopy. Excellent for cotton and chilli crops.",
                                usage: "200-300 ml per acre."
},
{
    id: 37,
        name: "HUBRO PYRI-PRO",
            category: "Insecticide",
                tag: "Juvenile",
                    desc: "Pyriproxyfen for blocking egg hatch in whiteflies.",
                        urduName: "حب پائری پرو",
                            fullDesc: "Interrupts life cycle of sucking pests at egg and nymphal stage. Foundation of IPM programs.",
                                usage: "400-600 ml per acre."
},
{
    id: 38,
        name: "HUBRO TOP-GLYPHO",
            category: "Herbicide",
                tag: "Non-Selective",
                    desc: "Glyphosate 48% for total weed control in non-cropped areas.",
                        urduName: "حب ٹاپ گلائفوس",
                            fullDesc: "Systemic action kills weeds from the roots. Ideal for bunds, orchards, and clearings.",
                                usage: "1-2 Liters per acre."
},
{
    id: 39,
        name: "HUBRO PARA-QUAT",
            category: "Herbicide",
                tag: "Contact",
                    desc: "Paraquat for rapid green burn-back of weeds.",
                        urduName: "حب پیرا کواٹ",
                            fullDesc: "Fast-acting contact herbicide. Shows results within hours. No soil residue.",
                                usage: "500-800 ml per acre."
},
{
    id: 40,
        name: "HUBRO BUTA-CHLOR",
            category: "Herbicide",
                tag: "Pre-Emergence",
                    desc: "Butachlor for weed control in transplanted rice.",
                        urduName: "حب بیوٹا کلور",
                            fullDesc: "Forms a layer on water surface to prevent weed emergence. Safe for young rice seedlings.",
                                usage: "1-1.5 Liters per acre."
},
{
    id: 41,
        name: "HUBRO PENDI-MAX",
            category: "Herbicide",
                tag: "Foundation",
                    desc: "Pendimethalin for pre-emergence in cotton and onion.",
                        urduName: "حب پینڈی میکس",
                            fullDesc: "Broad spectrum control of annual grasses and broadleaf weeds before they emerge.",
                                usage: "1-1.2 Liters per acre."
},
{
    id: 42,
        name: "HUBRO ATRA-SOL",
            category: "Herbicide",
                tag: "Maize Expert",
                    desc: "Atrazine for broadleaf weeds in Maize and Sugarcane.",
                        urduName: "حب اٹرا سول",
                            fullDesc: "Selective pre and post-emergence herbicide. Keeps maize fields clean for longer yields.",
                                usage: "500-1000 g per acre."
},
{
    id: 43,
        name: "HUBRO CLODI-FAST",
            category: "Herbicide",
                tag: "Wheat Special",
                    desc: "Clodinafop-Propargyl for grassy weeds in Wheat.",
                        urduName: "حب کلوڈی فاسٹ",
                            fullDesc: "Specially formulated for controlling 'Phalaris minor' and other wild grasses in wheat crops.",
                                usage: "100-150 g per acre."
},
{
    id: 44,
        name: "HUBRO METRI-POWER",
            category: "Herbicide",
                tag: "Sugarcane",
                    desc: "Metribuzin for weeds in Potato and Sugarcane.",
                        urduName: "حب میٹری پاور",
                            fullDesc: "Controls a wide range of grasses and broadleaf weeds via root and leaf absorption.",
                                usage: "300-500 g per acre."
},
{
    id: 45,
        name: "HUBRO BENTA-CLEAN",
            category: "Herbicide",
                tag: "Broadleaf",
                    desc: "Bentazone for selective broadleaf weed control in rice.",
                        urduName: "حب بینٹا کلین",
                            fullDesc: "Post-emergence contact herbicide. Safe for paddy, effective against sedges.",
                                usage: "800-1000 ml per acre."
},
{
    id: 46,
        name: "HUBRO HALO-SYS",
            category: "Herbicide",
                tag: "Nutsedge",
                    desc: "Halosulfuron for tough nutsedge (Dela) control.",
                        urduName: "حب ہیلو سس",
                            fullDesc: "Systemic action targets the underground tubers of nutsedge for complete eradication.",
                                usage: "15-20 g per acre."
},
{
    id: 47,
        name: "HUBRO QUIZ-AGRO",
            category: "Herbicide",
                tag: "Grass Killer",
                    desc: "Quizalofop-p-ethyl for grassy weeds in broadleaf crops.",
                        urduName: "حب کوئز ایگرو",
                            fullDesc: "Kills grasses in Onion, Cotton, and Soybean without affecting the main crop.",
                                usage: "300-400 ml per acre."
},
{
    id: 48,
        name: "HUBRO OXADI-PRE",
            category: "Herbicide",
                tag: "Pre-Em",
                    desc: "Oxadiazon for weed control in onions and rice.",
                        urduName: "حب اوکسڈی پری",
                            fullDesc: "Long residual control. Prevents germination of tough grasses early in the season.",
                                usage: "500 ml per acre."
},
{
    id: 49,
        name: "HUBRO BISPYRI-TOP",
            category: "Herbicide",
                tag: "Rice Post",
                    desc: "Bispyribac Sodium for post-emergence weeds in rice.",
                        urduName: "حب بسپائری ٹاپ",
                            fullDesc: "One-shot control for multiple weed types in paddy fields. Highly selective.",
                                usage: "80-100 ml per acre."
},
{
    id: 50,
        name: "HUBRO FENOXA-MAX",
            category: "Herbicide",
                tag: "Wheat Grass",
                    desc: "Fenoxaprop-p-ethyl for grassy weeds in wheat.",
                        urduName: "حب فینوکسا میکس",
                            fullDesc: "Highly efficient grass killer. Safe for wheat, deadly for wild oats and canary grass.",
                                usage: "250-400 ml per acre."
},
{
    id: 51,
        name: "HUBRO ETHO-PADDY",
            category: "Herbicide",
                tag: "Early Post",
                    desc: "Ethoxysulfuron for broadleaf weeds and sedges in rice.",
                        urduName: "حب ایتھو پیڈی",
                            fullDesc: "Targeted control for problematic aquatic weeds and sedges in transplant rice.",
                                usage: "40-60 g per acre."
},
{
    id: 52,
        name: "HUBRO MANCO-GOLD",
            category: "Fungicide",
                tag: "Legendary",
                    desc: "Mancozeb 75% WP for multi-site fungal control.",
                        urduName: "حب مینکو گولڈ",
                            fullDesc: "Foundation fungicide. Protects against blights, leaf spots, and rusts on 70+ crops.",
                                usage: "600-800 g per acre."
},
{
    id: 53,
        name: "HUBRO COPPER-MAX",
            category: "Fungicide",
                tag: "Bactericide",
                    desc: "Copper Oxychloride for bacterial and fungal diseases.",
                        urduName: "حب کوپر میکس",
                            fullDesc: "Excellent for controlling canker, mildew, and early blights in fruits and vegetables.",
                                usage: "500-1000 g per acre."
},
{
    id: 54,
        name: "HUBRO CARBEN-SYS",
            category: "Fungicide",
                tag: "Systemic",
                    desc: "Carbendazim for systemic broad-spectrum control.",
                        urduName: "حب کاربن سس",
                            fullDesc: "Internal protection against powdery mildew, scab, and root rot. Absorbed via roots and leaves.",
                                usage: "200-500 g per acre."
},
{
    id: 55,
        name: "HUBRO TEBU-PRO",
            category: "Fungicide",
                tag: "Triazole",
                    desc: "Tebucinazole for grain rusts and blights.",
                        urduName: "حب ٹیبو پرو",
                            fullDesc: "Highly effective systemic fungicide. Controls rust in wheat and leaf spots in groundnut.",
                                usage: "200-300 ml per acre."
},
{
    id: 56,
        name: "HUBRO THIO-GUARD",
            category: "Fungicide",
                tag: "Scab Expert",
                    desc: "Thiophanate Methyl for powdery mildew and rot.",
                        urduName: "حب تھائیو گارڈ",
                            fullDesc: "Broad spectrum preventive and curative action. Ideal for seed treatment and foliage.",
                                usage: "300-500 g per acre."
},
{
    id: 57,
        name: "HUBRO HEXA-SOL",
            category: "Fungicide",
                tag: "Fast Action",
                    desc: "Hexaconazole for powdery mildew and sheath blight.",
                        urduName: "حب ہیکسا سول",
                            fullDesc: "Systemic fungicide with protective, curative, and eradicative action. Rapid translocation.",
                                usage: "250-500 ml per acre."
},
{
    id: 58,
        name: "HUBRO AZOXY-TOP",
            category: "Fungicide",
                tag: "Premium",
                    desc: "Azoxystrobin for comprehensive disease protection.",
                        urduName: "حب ایزوکسی ٹاپ",
                            fullDesc: "Modern fungicide that improves greening and yield. Targets blights, mildews, and rusts.",
                                usage: "200-300 ml per acre."
},
{
    id: 59,
        name: "HUBRO DIFE-PRO",
            category: "Fungicide",
                tag: "Leaf Spot",
                    desc: "Difenoconazole for scab and alternaria blights.",
                        urduName: "حب ڈائفی پرو",
                            fullDesc: "Strong curative power. Absorbed quickly by leaves, providing rain-fast protection.",
                                usage: "100-200 ml per acre."
},
{
    id: 60,
        name: "HUBRO PROM-GOLD",
            category: "Fungicide",
                tag: "Downy Expert",
                    desc: "Propamocarb for downy mildew and root rot.",
                        urduName: "حب پروم گولڈ",
                            fullDesc: "Specific for oomycete fungi. High systemic movement through soil and plant tissue.",
                                usage: "300-600 ml per acre."
},
{
    id: 61,
        name: "HUBRO DUAL-PROTECT",
            category: "Fungicide",
                tag: "Systemic Mix",
                    desc: "Metalaxyl + Mancozeb mix for downy mildews.",
                        urduName: "حب ڈوا پروٹیکٹ",
                            fullDesc: "Combines systemic and contact modes. Best for late blight in potato and downy in grapes.",
                                usage: "500-800 g per acre."
},
{
    id: 62,
        name: "HUBRO MYCO-FREE",
            category: "Fungicide",
                tag: "Pro-Green",
                    desc: "Myclobutanil for powdery mildew and rust.",
                        urduName: "حب مائیکو فری",
                            fullDesc: "Highly selective systemic fungicide. Controls powdery mildew in horticulture crops.",
                                usage: "100-200 g per acre."
},
{
    id: 63,
        name: "HUBRO VALI-SYS",
            category: "Fungicide",
                tag: "Rice Specialist",
                    desc: "Validamycin for sheath blight in rice.",
                        urduName: "حب ویلی سس",
                            fullDesc: "Antibiotic fungicide. Specifically inhibits the growth of Rhizoctonia solani in paddy.",
                                usage: "400-600 ml per acre."
},
{
    id: 64,
        name: "HUBRO PROPI-CAL",
            category: "Fungicide",
                tag: "Wheat Rust",
                    desc: "Propiconazole for rusts and leaf spots.",
                        urduName: "حب پروپی کیل",
                            fullDesc: "Systemic fungicide with growth stimulation properties. Protects against multiple cereal diseases.",
                                usage: "200-400 ml per acre."
},
{
    id: 65,
        name: "HUBRO TRI-STRONG",
            category: "Fungicide",
                tag: "Combination",
                    desc: "Tricyclazole formulation for Rice Blast.",
                        urduName: "حب ٹرائی اسٹرانگ",
                            fullDesc: "Systemic fungicide absorbed rapidly by roots and leaves. The gold standard for rice blast control.",
                                usage: "120-150 g per acre."
},
{
    id: 66,
        name: "HUBRO HYBRID-C1",
            category: "Seed",
                tag: "Premium Hybrid",
                    desc: "High-yielding hybrid cotton seeds for BT zones.",
                        urduName: "حب ہائبرڈ سی ون",
                            fullDesc: "Excellent heat tolerance and boll weight. Resistant to leaf curl virus. High ginning out-turn.",
                                usage: "2 packets per acre for optimal plant population."
},
{
    id: 67,
        name: "HUBRO GOLD-WHEAT",
            category: "Seed",
                tag: "High Yield",
                    desc: "Climate-resilient wheat seeds for late sowing.",
                        urduName: "حب گولڈ گندم",
                            fullDesc: "Shorter duration, heat resistant variety. High tillering and heavy grain weight.",
                                usage: "40-50 kg per acre."
},
{
    id: 68,
        name: "HUBRO RICE-PRIME",
            category: "Seed",
                tag: "Aromatic",
                    desc: "Extra-long grain Basmati hybrid rice seeds.",
                        urduName: "حب رائس پرائم",
                            fullDesc: "Superior aroma and grain lengthening. High resistance to bacterial leaf blight.",
                                usage: "5-7 kg nursery per acre."
},
{
    id: 69,
        name: "HUBRO MAIZE-KING",
            category: "Seed",
                tag: "Grain Power",
                    desc: "Dual purpose hybrid maize for grain and silage.",
                        urduName: "حب مکئی کنگ",
                            fullDesc: "Stays green till maturity. Bold orange grains with high starch content.",
                                usage: "80,000 - 90,000 seeds per hectare."
},
{
    id: 70,
        name: "HUBRO SUN-FLOWER",
            category: "Seed",
                tag: "Oil Seed",
                    desc: "High oil content hybrid sunflower seeds.",
                        urduName: "حب سورج مکھی",
                            fullDesc: "Uniform flowering and maturity. High tolerance to drought and lodging.",
                                usage: "2-3 kg per acre."
},
{
    id: 71,
        name: "HUBRO CHILLI-PRO",
            category: "Seed",
                tag: "Vegetable",
                    desc: "Hybrid hot chilli seeds for export quality.",
                        urduName: "حب مرچ پرو",
                            fullDesc: "Virulent green to deep red. High pungency and excellent shelf life.",
                                usage: "200-400 g nursery per acre."
},
{
    id: 72,
        name: "HUBRO TOMATO-MAX",
            category: "Seed",
                tag: "Firm Fruit",
                    desc: "Indeterminate hybrid tomato seeds for long seasons.",
                        urduName: "حب ٹماٹر میکس",
                            fullDesc: "Round, firm fruits. Heat tolerant and resistant to TYLCV virus.",
                                usage: "100-150 g nursery per acre."
},
{
    id: 73,
        name: "HUBRO OKRA-FAST",
            category: "Seed",
                tag: "Virus Resistant",
                    desc: "Dark green, virus-tolerant Lady Finger seeds.",
                        urduName: "حب بھنڈی فاسٹ",
                            fullDesc: "Short internodes, high picking frequency. Resistant to YVMV virus.",
                                usage: "3-5 kg per acre."
},
{
    id: 74,
        name: "HUBRO ONION-RED",
            category: "Seed",
                tag: "Storage",
                    desc: "Deep red onion seeds with excellent storage capacity.",
                        urduName: "حب پیاز ریڈ",
                            fullDesc: "Uniform globe shape, pungent taste. Slow bolting variety.",
                                usage: "3-4 kg nursery per acre."
},
{
    id: 75,
        name: "HUBRO CANOLA-PLUS",
            category: "Seed",
                tag: "Oil Yield",
                    desc: "Low erucic acid canola seeds for edible oil.",
                        urduName: "حب کینولا پلس",
                            fullDesc: "Early maturity, high branching, and very high oil extraction percentage.",
                                usage: "1.5 - 2 kg per acre."
},
{
    id: 76,
        name: "HUBRO PEA-GREEN",
            category: "Seed",
                tag: "Sweet Grain",
                    desc: "Early maturing sweet pea seeds for fresh market.",
                        urduName: "حب مٹر گرین",
                            fullDesc: "9-11 grains per pod. Very high sweetness index and frost tolerance.",
                                usage: "25-30 kg per acre."
},
{
    id: 77,
        name: "HUBRO FODDER-MAX",
            category: "Seed",
                tag: "Livestock",
                    desc: "Multi-cut green fodder (Sorghum Sudangrass hybrid).",
                        urduName: "حب چارہ میکس",
                            fullDesc: "Fast growth, juicy stems, and high protein content. Provides 4-5 cuts per season.",
                                usage: "10-12 kg per acre."
},

{
    id: 90,
        name: "ZINC GOLD",
            category: "Nutrients",
                tag: "Micronutrients",
                    desc: "Liquid Micronutrients Mix (Zn, B, Cu, Mn, Fe).",
                        urduName: "زنک گولڈ",
                            fullDesc: "Contains Zinc (10g/L), Boron (20g/L), Copper, Manganese, and Iron (10g/L each). Essential for correcting micronutrient deficiencies.",
                                usage: "500 ml per acre."
},
{
    id: 91,
        name: "BIO STAR 10% EC",
            category: "Insecticide",
                tag: "Sucking Pests",
                    desc: "Effective control for Whitefly and Jassids.",
                        urduName: "بائیو سٹار",
                            fullDesc: "Insecticide formulation targeting sucking pests like Whitefly and Jassids. 10% EC formulation.",
                                usage: "500 ml per acre."
},
{
    id: 92,
        name: "ZINC STAR",
            category: "Nutrients",
                tag: "Zinc Supplement",
                    desc: "Zinc Sulphate for healthy crop growth.",
                        urduName: "زنک سٹار",
                            fullDesc: "High-quality Zinc supplement to boost crop immunity and yield. Corrects Zinc deficiency.",
                                usage: "10 kg per acre."
},
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
