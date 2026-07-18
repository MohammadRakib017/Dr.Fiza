import { Service, Testimonial, FAQItem } from './types';

export const SERVICES: Service[] = [
  // Orthodontics
  {
    name: "Braces",
    category: "Orthodontics",
    description: "Traditional and ceramic bracket systems engineered to align teeth, correct bites, and create beautifully balanced facial structures for children and adults.",
    icon: "Sliders",
    duration: "12 - 24 Months",
    benefits: ["Corrects complex bite issues", "Improves long-term chewing health", "Durable and highly effective results"]
  },
  {
    name: "Clear Aligners",
    category: "Orthodontics",
    description: "Premium invisible aligners (including Invisalign) custom-modeled to guide your teeth into pristine alignment without traditional metal brackets.",
    icon: "Sparkles",
    duration: "6 - 18 Months",
    benefits: ["Virtually invisible & discreet", "Removable for easy eating & brushing", "Custom computer-designed comfortable fit"]
  },

  // Cosmetic Dentistry
  {
    name: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    description: "State-of-the-art medical whitening using specialized laser activation to eliminate stubborn stains and brighten teeth up to 8 shades safely.",
    icon: "Sun",
    duration: "45 - 60 Minutes",
    benefits: ["Instant aesthetic transformation", "Enamel-safe, custom-calibrated agents", "Long-lasting radiant brightness"]
  },
  {
    name: "Dental Veneers",
    category: "Cosmetic Dentistry",
    description: "Bespoke ultra-thin porcelain or composite shells bonded to the front of teeth to instantly perfect shape, size, spacing, and color.",
    icon: "Award",
    duration: "2 Sessions",
    benefits: ["Resistance to future coffee & tea staining", "Flawless, symmetrical smile design", "Strengthens and preserves natural structure"]
  },
  {
    name: "Smile Makeovers",
    category: "Cosmetic Dentistry",
    description: "A comprehensive personalized treatment plan blending veneers, crowns, whitening, and alignment to create your ultimate dream smile.",
    icon: "Gem",
    duration: "Custom Timeline",
    benefits: ["Complete customized aesthetic design", "Solves multiple dental issues concurrently", "Restores youthful vitality and high confidence"]
  },
  {
    name: "Dental Crowns",
    category: "Cosmetic Dentistry",
    description: "Highly durable, beautifully color-matched porcelain caps designed to fully encase and protect heavily decayed, weak, or cracked teeth.",
    icon: "Crown",
    duration: "1 - 2 Sessions",
    benefits: ["Restores full structural functionality", "Looks entirely natural & indistinguishable", "Protects against future fractures & decay"]
  },
  {
    name: "Dental Bridges",
    category: "Cosmetic Dentistry",
    description: "Custom-fabricated dental bridges supported by adjacent natural teeth or implants to anchor beautiful prosthetic teeth in place of gaps.",
    icon: "Workflow",
    duration: "1 - 2 Sessions",
    benefits: ["Prevents adjacent teeth from drifting", "Fully restores natural speech and bite", "Stays securely anchored permanently"]
  },
  {
    name: "Dental Implants",
    category: "Cosmetic Dentistry",
    description: "Medical-grade titanium posts placed permanently into the jawbone, acting as robust structural roots for single crowns or full-arch bridges.",
    icon: "Layers",
    duration: "3 - 6 Months",
    benefits: ["Lifetime durability and jaw support", "Prevents bone loss and facial sagging", "Behaves & feels exactly like a real tooth"]
  },

  // Comprehensive Care
  {
    name: "General Dentistry",
    category: "Comprehensive Care",
    description: "Full-scale oral diagnostic examinations, cavity prevention routines, and standard tooth restorations for patients of all ages in Kuwait.",
    icon: "Heart",
    duration: "30 - 60 Minutes",
    benefits: ["Maintains outstanding oral hygiene", "Early detection of latent dental issues", "Custom home-care guidance from Dr. Fiza"]
  },
  {
    name: "Dental Checkups",
    category: "Comprehensive Care",
    description: "In-depth clinical assessments combining 3D imaging, digital diagnostic scans, periodontal mapping, and precise tumor screenings.",
    icon: "ClipboardCheck",
    duration: "30 Minutes",
    benefits: ["Detailed custom visual analysis", "Prevents minor cavities from escalating", "Comprehensive mapping of jaw alignment"]
  },
  {
    name: "Teeth Cleaning",
    category: "Comprehensive Care",
    description: "Advanced ultrasonic scaling and precision polishing to thoroughly remove tartar, calcified plaque, and deep superficial bacterial biofilms.",
    icon: "Smile",
    duration: "45 Minutes",
    benefits: ["Eliminates persistent bad breath", "Prevents harmful gum inflammation", "Leaves teeth feeling refreshingly smooth"]
  },
  {
    name: "Fillings",
    category: "Comprehensive Care",
    description: "Aesthetic, 100% BPA-free composite resin restorations molded directly into cleaned cavities to protect and rebuild teeth seamlessly.",
    icon: "Shield",
    duration: "20 - 40 Minutes",
    benefits: ["Color-matched to hide restoration", "Strengthens the tooth from internal pressure", "Durable and entirely metal-free material"]
  },
  {
    name: "Root Canal Treatment",
    category: "Comprehensive Care",
    description: "Advanced micro-endodontic therapy designed to clear out infected pulp tissue, sanitize deep canals, and seal the tooth to eliminate pain.",
    icon: "Activity",
    duration: "1 - 2 Sessions",
    benefits: ["Saves your organic natural tooth", "Instant relief from throbbing dental pain", "Prevents infection from entering the jawbone"]
  },
  {
    name: "Tooth Extractions",
    category: "Comprehensive Care",
    description: "Completely pain-free, specialized surgical removal of severely damaged or crowded teeth under comfortable local anesthesia.",
    icon: "Scissors",
    duration: "30 - 45 Minutes",
    benefits: ["Stops progressive bone infection", "Resolves severe crowding issues", "Extremely gentle, swift technique"]
  },
  {
    name: "Wisdom Tooth Removal",
    category: "Comprehensive Care",
    description: "Expert surgical extraction of impacted, painful, or misaligned wisdom teeth to safeguard your overall tooth alignment and bite health.",
    icon: "Scissors",
    duration: "45 - 60 Minutes",
    benefits: ["Prevents damage to adjacent teeth", "Eliminates chronic back-jaw pain & swelling", "Protects against deep sinus congestion"]
  },
  {
    name: "Dentures",
    category: "Comprehensive Care",
    description: "Premium partial or complete custom prosthetics engineered with natural-looking materials to restore beautiful smiles and chewing power.",
    icon: "HeartHandshake",
    duration: "2 - 3 Sessions",
    benefits: ["Restores youthful lip & facial support", "Extremely comfortable, modern lightweight materials", "Removable & easy to maintain daily"]
  },
  {
    name: "Gum Disease Treatment",
    category: "Comprehensive Care",
    description: "Deep scaling, root planing, and targeted antimicrobial therapies designed to reverse gingivitis and control progressive periodontitis.",
    icon: "Droplet",
    duration: "45 - 60 Minutes",
    benefits: ["Prevents loose teeth and bone loss", "Stops progressive bleeding gums", "Protects systemic cardiovascular health"]
  },
  {
    name: "Pediatric Dentistry",
    category: "Comprehensive Care",
    description: "Tailored dental care, dental sealants, fluoride treatments, and gentle behavior management designed to foster happy dental habits for kids.",
    icon: "Baby",
    duration: "30 - 45 Minutes",
    benefits: ["Fun, entirely anxiety-free environment", "Guides healthy dental eruption & jaw growth", "Prevents early childhood tooth decay"]
  },

  // Emergency & Specialized
  {
    name: "Emergency Dental Care",
    category: "Emergency & Specialized",
    description: "Immediate relief and same-day prioritized care for severe toothaches, avulsed teeth, sports injuries, or broken restorations in Kuwait.",
    icon: "PhoneCall",
    duration: "Immediate Priority",
    benefits: ["Same-day emergency appointments", "Instant pain-reduction interventions", "Prevents permanent tooth loss"]
  },
  {
    name: "Oral Surgery",
    category: "Emergency & Specialized",
    description: "Complex dental surgical interventions including bone grafting, jaw realignment, sinus lifts, and aesthetic gum line re-contouring.",
    icon: "HeartPulse",
    duration: "Custom Timeline",
    benefits: ["Prepares bone structure for implants", "Reshapes gums for aesthetic harmony", "Conducted in absolute sterile conditions"]
  },
  {
    name: "TMJ Treatment",
    category: "Emergency & Specialized",
    description: "Therapeutic custom-fitted night splints, bite correction, and clinical muscle therapies to eliminate jaw clicking, stiffness, and chronic headaches.",
    icon: "Activity",
    duration: "1 - 2 Sessions",
    benefits: ["Relieves chronic muscle headaches", "Stops dental grinding & tooth wearing", "Restores fluid, pain-free jaw movement"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anfal Al-Mutairi",
    rating: 5,
    date: "2026-05-14",
    text: "Dr. Fiza is incredible! I was very hesitant about getting clear aligners, but her personalized digital care and luxurious clinic made all the difference. My smile looks flawless and symmetrical now. MedC Shaab is extremely clean and welcoming!",
    serviceReceived: "Clear Aligners",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Youssef Al-Enezi",
    rating: 5,
    date: "2026-05-28",
    text: "Truly a luxury dental experience in Kuwait. Dr. Fiza completed my full smile makeover with custom porcelain veneers. She is highly detailed, meticulously choosing the perfect shade. She makes sure every session is completely pain-free.",
    serviceReceived: "Smile Makeover",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Fatima Al-Sayegh",
    rating: 5,
    date: "2026-06-05",
    text: "My children actually enjoy going to the dentist now! Dr. Fiza has such a gentle, pediatric-friendly philosophy. She explained the entire early orthodontic expansion process clearly. Outstanding technology and wonderful care.",
    serviceReceived: "Pediatric Orthodontics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Khalid Al-Hajri",
    rating: 5,
    date: "2026-06-12",
    text: "Excellent service! I had an emergency broken crown and toothache. I messaged Dr. Fiza on WhatsApp, and she accommodated me immediately the same day. She did a root canal treatment and temporary crown with absolutely zero pain.",
    serviceReceived: "Emergency Dental Care",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Mona Al-Kandari",
    rating: 5,
    date: "2026-06-25",
    text: "Best dental clinic in Kuwait! Dr. Fiza straightened my teeth with aesthetic ceramic braces. Her team is highly professional, and the MedC Shaab Al Bahari location is superb with stunning sea views. Strongly recommend families and professionals alike.",
    serviceReceived: "Ceramic Braces",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How often should I visit Dr. Fiza for general dental care?",
    answer: "For preventive care, professional scaling, and dental checkups, we recommend visiting our MedC Shaab clinic every six months. For patients undergoing active orthodontics (braces or clear aligners), appointments are scheduled every 4 to 8 weeks depending on the tooth movement plan."
  },
  {
    question: "What types of orthodontic braces do you provide?",
    answer: "We offer multiple premium orthodontic solutions, including modern discreet ceramic braces, standard aesthetic metal braces, self-ligating brackets, and specialized pediatric interceptive appliances designed for jaw guidance in growing children."
  },
  {
    question: "Do you offer clear aligners like Invisalign in Kuwait?",
    answer: "Yes, clear aligners are one of our core specialties. Using comfortable, clear, medical-grade BPA-free plastic trays, we align your teeth progressively and discreetly. The trays are removable for meals and seamless brushing."
  },
  {
    question: "Is clinical teeth whitening safe for my enamel?",
    answer: "Absolutely. When administered under Dr. Fiza's medical supervision, professional laser teeth whitening is 100% safe. We utilize advanced, pH-balanced formulas that prevent tooth sensitivity while offering maximum stain removal."
  },
  {
    question: "At what age should children have their first orthodontic checkup?",
    answer: "The American Association of Orthodontists recommends children get evaluated by age 7. Dr. Fiza can screen for jaw development anomalies early, often guiding orthodontic growth to avoid complex permanent teeth extraction later."
  },
  {
    question: "Do you accept emergency dental cases in Kuwait?",
    answer: "Yes! We offer prioritized, same-day dental emergency services for patients suffering from severe toothaches, broken wire emergencies, dental sports injuries, or loose crowns. Contact us via WhatsApp or Phone directly."
  },
  {
    question: "How long does clear aligner treatment typically take?",
    answer: "Aligne treatments range from 6 to 18 months, depending on bite complexity. During your initial virtual or in-person consultation, Dr. Fiza will provide a precise 3D simulation showing exactly how your teeth will move and the expected timeline."
  }
];
