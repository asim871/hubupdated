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
