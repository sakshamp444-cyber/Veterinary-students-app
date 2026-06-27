export interface Chapter {
  id: string;
  title: string;
  summary: string;
  content: string;
  keyRevisionPoints: string[];
}

export interface Subject {
  id: string;
  name: string;
  hindiName: string;
  code: string;
  chapters: Chapter[];
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  subjectId: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  hindiTitle: string;
  species: 'Bovine' | 'Caprine' | 'Ovine' | 'Poultry' | 'Canine';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  history: string;
  physicalExam: string;
  correctDiagnosis: string;
  optionsDiagnosis: string[];
  correctTest: string;
  optionsTest: string[];
  correctTreatment: string[];
  optionsTreatment: string[];
  clinicalPearl: string;
}

export const VETERINARY_CURRICULUM: Semester[] = [
  {
    id: 1,
    name: "Semester I (First Year)",
    subjects: [
      {
        id: "anatomy-1",
        name: "Basic Anatomy of Livestock and Poultry",
        hindiName: "पशु एवं कुक्कुट की प्रारंभिक शरीर रचना विज्ञान",
        code: "AHD-I",
        chapters: [
          {
            id: "ahd1-ch1",
            title: "Anatomy Overview & Musculo-skeletal System",
            summary: "Structure of veterinary bones (osteology), joints (arthrology), muscle types (myology), and splanchnic bones.",
            content: `### 1. Introduction to Veterinary Osteology (अस्थि विज्ञान)
Osteology is the study of the structure and function of bones forming the skeletal system. In livestock (bovines), the skeleton provides physical support, protects vital organs, acts as a calcium reservoir, and produces blood cells.

### 2. Divisions of the Skeleton
* **Axial Skeleton (अक्षीय कंकाल):** Comprises the Skull (कपाल), Vertebral Column (रीढ़ की हड्डी), Ribs (पसलियां), and Sternum (उरोस्थि).
* **Appendicular Skeleton (उपांगी कंकाल):** Includes the Forelimbs (Humerus, Radius-Ulna, Carpals, Metacarpals, Phalanges) and Hindlimbs (Femur, Tibia-Fibula, Tarsals, Metatarsals, Phalanges).
* **Splanchnic/Visceral Skeleton (आंतरांग कंकाल):** Bones that develop within visceral organs. Key examples:
  * **Os cordis:** Heart of ox/cattle (bovines).
  * **Os penis:** Penis of canine/dog.
  * **Os rostri:** Snout of pig.
  * **Os phrenic:** Diaphragm of camel.

### 3. Vertebral Formula (कशेरुका सूत्र)
A critical exam topic. Note the formulas for major species:
* **Cattle/Buffalo (Ruminant):** **C7 - T13 - L6 - S5 - Cy18-20**
* **Horse:** **C7 - T18 - L6 - S5 - Cy15-21**
* **Dog:** **C7 - T13 - L7 - S3 - Cy20-23**
* **Poultry (Fowl):** Highly modified fused structures (e.g. synsacrum).

### 4. High-Yield Comparative Osteology Differences
* **Scapula (कंधे की हड्डी):** Bovine scapula is triangular, with a lateral spine dividing it into supraspinous and infraspinous fossa in a **1:3 ratio**. The acromion process is distinct.
* **Humerus:** Has a characteristic musculo-spiral groove and double-headed bicipital groove in horses.
* **Femur (जांघ की हड्डी):** Bovine femur lacks the third trochanter (which is present in horses).`,
            keyRevisionPoints: [
              "Vertebral Formula of Bovine: C7 T13 L6 S5 Cy18-20.",
              "Os cordis is found in the bovine heart.",
              "The scapular fossa ratio in cattle is 1:3.",
              "The third trochanter of the femur is absent in cows/buffaloes, but present in horses."
            ]
          },
          {
            id: "ahd1-ch2",
            title: "Digestive and Respiratory Systems",
            summary: "Anatomy of the compound stomach, salivary glands, intestines, and pulmonary airways.",
            content: `### 1. The Ruminant Stomach (रोमन्थी आमाशय)
Ruminants possess a highly modified compound stomach composed of 4 compartments:
1. **Rumen (प्रथम आमाशय - Paunch):** Largest compartment (~80% capacity in adult cattle). Mucosa is lined with tongue-like papillae (velvety look). It is the primary site of microbial fermentation.
2. **Reticulum (द्वितीय आमाशय - Honeycomb):** Lined with hexagonal folds resembling a honeycomb. Heavy metallic foreign bodies settle here. It lies close to the diaphragm and heart (site of Traumatic Reticuloperitonitis).
3. **Omasum (तृतीय आमाशय - Manyplies):** Contains many muscular leaves/folds like book pages. Responsible for absorbing water and bicarbonate. **Absent in camels**.
4. **Abomasum (चतुर्थ आमाशय - True Stomach):** Glandular compartment secreting HCl, Pepsin, and Rennet. Performs standard enzymatic digestion.

### 2. Respiratory Airways
* Includes Nasal Cavity, Pharynx, Larynx, Trachea, and Lungs.
* **Larynx (कंठ):** Acts as the voice box and safety valve during swallowing.
* **Trachea:** Consists of C-shaped cartilaginous rings that prevent airway collapse.
* **Lungs (फेफड़े):** Right lung is larger and contains more lobes than the left lung.`,
            keyRevisionPoints: [
              "Abomasum is the only glandular (true) stomach compartment.",
              "Camels (pseudoruminants) lack the Omasum.",
              "Rumen represents 80% of adult capacity.",
              "Tracheal rings are cartilaginous and prevent collapse during breathing."
            ]
          },
          {
            id: "ahd1-ch3",
            title: "Circulatory, Nervous, Urinary & Reproductive Organs",
            summary: "Detailed overview of heart chambers, major arteries/veins, brain lobes, renal shapes, and reproductive tracts.",
            content: `### 1. Cardiovascular System
* **Heart (हृदय):** 4-chambered in mammals and birds. Lies in the thoracic cavity.
* **Os cordis:** Splanchnic bones supporting the aortic valves in bovines.
* **Primary Blood Vessels:** Aorta (supplies oxygenated blood), Vena Cava (returns deoxygenated blood), and Jugular Veins (runs along neck furrow, primary site for IV injections).

### 2. Nervous & Urinary Systems
* **Brain:** Comprises Cerebrum (higher thinking), Cerebellum (motor coordination), and Medulla Oblongata (vital cardiorespiratory controls).
* **Kidney Morphology:**
  * **Cattle:** Lobulated kidneys (multi-lobed, about 18-22 lobes). Looks like a cluster of grapes.
  * **Horse:** Left kidney is bean-shaped, right kidney is uniquely heart-shaped.
  * **Sheep/Goat/Dog:** Smooth, bean-shaped (no external lobulation).

### 3. Reproductive Tracts
* **Male:** Testes (produce sperm and testosterone), Epididymis, Vas Deferens, Penis, and accessory glands (seminal vesicles, prostate, bulbourethral).
* **Female:** Ovaries (produce ova, estrogen, progesterone), Fallopian Tubes (site of fertilization), Uterine Horns, Uterine Body, Cervix (barrier), Vagina, and Vulva.`,
            keyRevisionPoints: [
              "Bovine kidneys are externally lobulated (18-22 lobes).",
              "Right kidney of the horse is uniquely heart-shaped.",
              "Jugular vein is the major site of intravenous access in large ruminants.",
              "Fertilization occurs in the oviduct/Fallopian tubes."
            ]
          }
        ]
      },
      {
        id: "physiology-1",
        name: "Basic Physiology of Livestock and Poultry",
        hindiName: "पशु एवं कुक्कुट की प्रारंभिक शरीर क्रिया विज्ञान",
        code: "AHD-II",
        chapters: [
          {
            id: "ahd2-ch1",
            title: "General Physiology & Rumen Digestion",
            summary: "Cellular homeostatic systems, mechanics of rumination, and rumen volatile fatty acid production.",
            content: `### 1. Rumination (जुगाली करना)
Rumination is the adaptation of ruminants to grind coarse plant fibers so microbes can digest cellulose. It involves 4 steps:
1. **Regurgitation (वापस मुंह में लाना):** Reverse peristalsis brings food bolus back to mouth.
2. **Remastication (दोबारा चबाना):** Extended chewing breaks fiber walls.
3. **Reinsalivation (लार मिलाना):** High bicarbonate saliva buffers the acidic content.
4. **Reswallowing (दोबारा निगलना):** Re-entry to the rumen.

### 2. Rumen Ecosystem & Volatile Fatty Acids (VFAs)
The rumen is an anaerobic fermentation chamber (pH 5.5 - 6.8, Temp 39-40°C). Anaerobic bacteria and protozoa ferment carbohydrates into Volatile Fatty Acids (VFAs), which provide up to 70% of the animal's energy.
* **Acetate (एसिटेट - ~60-70%):** Essential precursor for milk-fat synthesis. High fiber diets (hay/straw) increase acetate.
* **Propionate (प्रोपियोनेट - ~15-20%):** Precursor for gluconeogenesis (glucose production in liver). Starch/grain diets increase propionate, boosting milk yield.
* **Butyrate (ब्यूटायरेट - ~10-15%):** Converted to ketones; used as energy source by rumen epithelium.`,
            keyRevisionPoints: [
              "Acetate is the key factor determining milk fat percentage.",
              "Propionate is converted to glucose in the liver via gluconeogenesis.",
              "Rumen pH below 5.5 triggers clinical Rumen Acidosis.",
              "Rumination helps neutralize pH through salivary bicarbonate secretion."
            ]
          },
          {
            id: "ahd2-ch2",
            title: "Respiratory, Circulatory, Nervous & Urinary Systems",
            summary: "Physiology of gas exchange, cardiac cycle, neural signaling, and urine filtration.",
            content: `### 1. Respiratory & Circulatory Physiology
* **Erythrocytes (RBCs):** Mammalian RBCs are non-nucleated and biconcave. Avian (poultry) RBCs are uniquely **nucleated and oval**.
* **Body Temperature of a healthy cow/buffalo:** $101.5^\circ\text{F} - 102.5^\circ\text{F}$ ($38.5^\circ\text{C} - 39^\circ\text{C}$).
* **Rumen Motility:** Normal count is **1-2 contractions per minute**, assessed by fist palpation at the left paralumbar fossa.

### 2. Nervous & Urinary Physiology
* **Synaptic Transmission:** Electrical impulses cross neural gaps using chemical neurotransmitters like acetylcholine.
* **Nephron Function:** The basic functional unit of the kidney. Performs ultrafiltration in the glomerulus, selective reabsorption in the tubules, and secretion to form urine.`,
            keyRevisionPoints: [
              "Avian red blood cells contain a nucleus, unlike mammalian RBCs.",
              "Rumen motility should be checked at the left paralumbar fossa.",
              "Glomerular Filtration Rate (GFR) measures kidney function.",
              "Mammalian body temperature is tightly regulated by the hypothalamus."
            ]
          },
          {
            id: "ahd2-ch3",
            title: "Reproductive System & Endocrine Glands",
            summary: "Physiological controls of estrus, sperm production, pregnancy, and key hormones.",
            content: `### 1. Endocrine Hormones (अंतःस्रावी हार्मोन)
* **Pituitary Gland (पीयूष ग्रंथि):**
  * **FSH (Follicle Stimulating Hormone):** Stimulates follicular growth on ovaries in females; sperm production in males.
  * **LH (Luteinizing Hormone):** Triggers ovulation and forms the Corpus Luteum (CL).
  * **Oxytocin (ऑक्सीटोसिन):** Secreted by posterior pituitary. Responsible for **milk let-down** (lasts 5-7 minutes) and uterine contractions during calving.
* **Ovarian Hormones:**
  * **Estrogen:** Secreted by developing follicles. Responsible for signs of heat (oestrus) behavior.
  * **Progesterone:** Secreted by the Corpus Luteum (CL). Essential for the **maintenance of pregnancy** (called the pregnancy hormone).`,
            keyRevisionPoints: [
              "Oxytocin is the primary hormone responsible for milk let-down.",
              "Progesterone is crucial for maintaining pregnancy; if the CL regresses, abortion occurs.",
              "Estrogen causes the behavioral symptoms of heat (estrus).",
              "Luteinizing Hormone (LH) surge triggers ovulation."
            ]
          }
        ]
      },
      {
        id: "housing-management",
        name: "Livestock Housing and Management",
        hindiName: "पशु आवास एवं प्रबंधन",
        code: "AHD-III",
        chapters: [
          {
            id: "ahd3-ch1",
            title: "Rearing Systems & Shed Construction",
            summary: "Extensive, semi-intensive, and intensive housing systems. Orientation and site requirements.",
            content: `### 1. Systems of Rearing
* **Extensive / Free Range (मुक्त चराई प्रणाली):** Animals graze freely. High land requirement, low capital.
* **Semi-Intensive:** Combined grazing with evening shed sheltering and stall feeding.
* **Intensive / Stall-fed (सघन प्रणाली):** Zero grazing. Animals are confined inside standard sheds.

### 2. Double-Row Intensive Shed Layouts
When housing more than 10-12 dairy animals, double-row housing is preferred:
* **Tail-to-Tail / Face-Out System (पूंछ-से-पूंछ प्रणाली):**
  * Animals stand facing outwards, with a central passage for milking and cleaning.
  * *Advantages:* Easier milking and dung cleaning, reduces the spread of respiratory diseases, cows get equal fresh air. Highly preferred in MP.
* **Head-to-Head / Face-in System (सिर-से-सिर प्रणाली):**
  * Animals stand facing each other, with a central feeding passage.
  * *Advantages:* Easier feeding, cows can see each other.
  * *Disadvantage:* High risk of respiratory cross-infection through coughing/sneezing.

### 3. Space Requirements for Dairy Cattle (NDVSU Standard)
* **Adult Cow (Covered Area):** $3.5\text{ m}^2$ (Open Area: $7.0\text{ m}^2$)
* **Pregnant Cow (Covered Area):** $12.0\text{ m}^2$ (Calving box)
* **Calf (Covered Area):** $1.0 - 2.0\text{ m}^2$ depending on age.`,
            keyRevisionPoints: [
              "Tail-to-tail system is clinically superior for reducing respiratory pathogen transmission.",
              "Orientation of livestock sheds should be North-South to avoid direct hot sun exposure in MP during summer.",
              "Pregnant animals must be shifted to individual calving boxes 2-3 weeks before calving.",
              "Ample ventilation reduces ammonia build-up inside poultry and cattle sheds."
            ]
          },
          {
            id: "ahd3-ch2",
            title: "Daily Management, Ageing & Milking",
            summary: "Practical routines: Restraining, dentition ageing, farm utensils, and clean milk production.",
            content: `### 1. Physical Restraint of Animals (पशुओं को काबू करना)
To perform clinical procedures safely, proper restraining is necessary:
* **Halter (मोहरा):** Used to control the head of cattle/buffaloes.
* **Nose Ring (नथ):** Used mostly in breeding bulls for maximum safety.
* **Travis (ट्रेविस):** A metallic/wooden enclosure for safe clinical treatment, AI, and vaccination.

### 2. Determination of Age by Dentition (दांतों द्वारा उम्र निर्धारण)
Age is calculated by looking at the **incisor teeth** on the lower jaw (ruminants have no incisors on the upper jaw, only a hard **dental pad**).
* **Deciduous (दूध के दांत):** Temporary, smaller, white.
* **Permanent (स्थायी दांत):** Larger, yellow/creamy.
* **Eruption of permanent incisors:**
  * **1st Pair (Central):** Erupts at ~1.5 to 2 years.
  * **2nd Pair (Intermediate):** Erupts at ~2.5 years.
  * **3rd Pair (Lateral):** Erupts at ~3.5 years.
  * **4th Pair (Corner):** Erupts at ~4.5 years ("Full Mouth" stage - 8 permanent incisors).

### 3. Clean Milk Production (स्वच्छ दुग्ध उत्पादन)
* **Full Hand Milking (पूर्ण हस्त दोहन):** Best method. The teat is grasped with the whole hand. It distributes pressure evenly.
* **Knuckling (अंगूठा दबाकर दोहन):** **Bad method**. Bending the thumb against the teat causes internal tissue injury, leading to **Mastitis (थनैला रोग)**.
* **Stripping:** Using index finger and thumb to pull down. Used for stripping last fat-rich drops.`,
            keyRevisionPoints: [
              "A 'Full Mouth' ruminant has 8 permanent incisors on the lower jaw, occurring at 4.5 to 5 years.",
              "Knuckling is a harmful milking method that should be strictly avoided.",
              "Always use the Full-Hand milking method to prevent mastitis and teat canal trauma.",
              "Grooming cows prior to milking significantly reduces bacterial counts in milk."
            ]
          },
          {
            id: "ahd3-ch3",
            title: "Farm Waste Disposal: FYM, Biogas & Vermicompost",
            summary: "Management of manure, compost preparation, biogas digesters, and vermiculture.",
            content: `### 1. Farm Waste Management
Adequate disposal of manure, urine, and farm runoff is crucial for biosecurity and reducing pathogen spread.

### 2. Farm Yard Manure (FYM - गोबर की खाद)
* Prepared by storing dung, urine, and agricultural litter in dung pits.
* Needs controlled anaerobic degradation to preserve nitrogen and phosphorus levels.

### 3. Biogas Production (बायोगैस)
* Uses anaerobic digestion of livestock manure.
* **Primary Gas:** Methane ($CH_4$ - ~55-65%) and Carbon Dioxide ($CO_2$ - ~35-45%).
* **Slurry:** The leftover byproduct is extremely rich in nutrients and serves as excellent organic fertilizer.

### 4. Vermicomposting (वर्मीकम्पोस्ट)
* Uses earthworms (such as *Eisenia fetida*) to decompose organic farm wastes into nutrient-rich humus.`,
            keyRevisionPoints: [
              "Primary component of biogas is methane (55-65%).",
              "Eisenia fetida is a popular earthworm species used in farm vermicomposting.",
              "Inadequate manure disposal facilitates the propagation of flies and internal parasites.",
              "Slurry from biogas units is richer in available nitrogen than raw dung."
            ]
          }
        ]
      },
      {
        id: "livestock-breeding",
        name: "Livestock Breeding",
        hindiName: "पशु प्रजनन विज्ञान",
        code: "AHD-IV",
        chapters: [
          {
            id: "ahd4-ch1",
            title: "Indigenous and Exotic Breeds",
            summary: "Characteristics of major breeds of cattle, buffalo, goats, sheep, and pigs.",
            content: `### 1. Indigenous Cattle Breeds of India (भारतीय गाय की नस्लें)
* **Milch Breeds (दुग्ध प्रयोजनीय):**
  * **Sahiwal:** Native to Punjab/Pakistan. Reddish-brown color. Highest milk-yielding indigenous breed, known for its loose skin (called 'Lola').
  * **Gir:** Originates from Gujarat. Dome-shaped forehead, long leaf-like looping ears. High fat content.
  * **Red Sindhi:** Deep red color. Similar to Sahiwal.
* **Dual Purpose & Draft Breeds:**
  * **Haryana:** White/grey coat. Excellent draft bullocks and moderate milk yields.
  * **Malvi & Nimari:** Highly popular local draft breeds of **Madhya Pradesh**.

### 2. Buffalo Breeds (भैंस की नस्लें)
* **Murrah:** King of buffaloes. Jet black body with tightly coiled horn spiral ("Jalebi horns"). Highest milk and fat yield.
* **Bhadawari:** Copper-colored body (तांबे जैसा रंग). Has the **highest milk fat percentage (up to 8-13%)**.
* **Surti:** Characterized by sickle-shaped horns and two white collars (chevrons).

### 3. Goat and Sheep Breeds
* **Jamunapari Goat:** Large size, Roman nose (toti mouth), long drooping ears. King of Indian goats.
* **Barbari Goat:** Small, erect ears, white coat with brown spots. Highly prolific. City goat.
* **Nali & Chokla Sheep:** Premium carpet-wool producing sheep of India.`,
            keyRevisionPoints: [
              "Sahiwal is the highest milk-producing indigenous cattle breed.",
              "Bhadawari buffalo is famous for the highest milk fat percentage (8-13%).",
              "Surti buffalo is identified by characteristic sickle-shaped horns.",
              "Jamunapari goat features a prominent 'Roman Nose'."
            ]
          },
          {
            id: "ahd4-ch2",
            title: "Principles of Animal Breeding & Conservation",
            summary: "Cross-breeding, inbreeding, selection indexes, culling, and MP state breeding policies.",
            content: `### 1. Systems of Breeding (प्रजनन प्रणालियां)
* **Inbreeding (अंतःप्रजनन):** Breeding of closely related animals (e.g. sire to daughter). Increases homozygosity, but can lead to **inbreeding depression** (reduced milk yield, vigor, fertility).
* **Outbreeding (बाह्यप्रजनन):** Breeding of unrelated animals.
  * **Cross-breeding (संकरण):** Crossing different breeds (e.g. Holstein Friesian x Sahiwal to produce **Karan Swiss** or **Sunandini**). Utilizes heterosis (hybrid vigor).
  * **Grading-up:** Mating of non-descript local females with purebred bulls of a defined breed for several generations to upgrade herd genetics.

### 2. Selection and Culling (चयन एवं निष्कासन)
* **Selection:** Choosing superior animals to be parents of the next generation.
* **Culling (कलिंग):** Removing unproductive, chronically diseased, or sterile animals from the farm herd to minimize feed waste.

### 3. Livestock Breeding Policy of Madhya Pradesh
* Focuses on grading-up local non-descript cattle with Sahiwal/Tharparkar and buffaloes with Murrah semen.
* Promotes cross-breeding with Holstein Friesian or Jersey semen only in defined urban milksheds.`,
            keyRevisionPoints: [
              "Cross-breeding leverages heterosis (hybrid vigor) to improve production traits.",
              "Inbreeding increases homozygosity but risks inbreeding depression.",
              "Grading-up achieves purebred status (above 99% purity) by the 6th generation.",
              "Culling is highly critical to keep dairy farms economically profitable."
            ]
          }
        ]
      },
      {
        id: "feeds-feeding",
        name: "Livestock Feeds and Feeding Practices",
        hindiName: "पशु पोषण एवं आहार व्यवस्था",
        code: "AHD-V",
        chapters: [
          {
            id: "ahd5-ch1",
            title: "Principles of Nutrition & Feed Classification",
            summary: "Nutrient classes, roughages vs concentrates, agro-industrial byproducts, and balanced rations.",
            content: `### 1. Basic Nutrients (मूल पोषक तत्व)
Animals require Water, Carbohydrates, Proteins, Lipids, Minerals, and Vitamins to sustain growth, milk synthesis, and reproduction.

### 2. Roughages vs Concentrates
* **Roughages (चारा):** Contain $>18\%$ Crude Fiber (CF) and $<60\%$ Total Digestible Nutrients (TDN).
  * *Succulent:* Green fodder (Berseem, Lucerne, Maize, Sorghum).
  * *Dry:* Straw (Kutti), Hay, Bhusa.
* **Concentrates (दाना):** Contain $<18\%$ Crude Fiber (CF) and $>60\%$ TDN.
  * *Energy rich:* Grains (Maize, Barley, Oats, Wheat bran).
  * *Protein rich:* Oil cakes (Mustard cake, Cottonseed cake, Soybean meal).

### 3. Balanced Ration (संतुलित आहार)
* A ration that supplies all necessary nutrients in correct proportions to sustain the animal's maintenance and production needs for 24 hours.
* **Maintenance Ration:** Feed required to keep body weight stable without production.
* **Production Ration:** Additional feed given per unit of milk produced (e.g. 1 kg concentrate for every 2.5 kg cow milk).`,
            keyRevisionPoints: [
              "Roughages have high fiber ($>18\\%$ CF) and low energy density.",
              "Concentrates are dense in energy/protein with low fiber content.",
              "Dairy cows require additional production concentrates based on milk yields.",
              "Wheat bran is an excellent source of phosphorus in concentrate mixtures."
            ]
          },
          {
            id: "ahd5-ch2",
            title: "Fodder Production & Preservation",
            summary: "Annual vs perennial fodder, silage and hay making processes.",
            content: `### 1. Classification of Fodders
* **Leguminous Fodders:** Rich in proteins and calcium. E.g., Berseem (winter), Lucerne, Cowpea.
* **Non-Leguminous Fodders:** Rich in energy. E.g., Maize, Sorghum, Oats, Hybrid Napier (perennial grass).

### 2. Silage Making (साइलेज निर्माण)
* Preservation of green fodder under **anaerobic (oxygen-free) conditions** by controlled fermentation.
* *Best crops:* Crops rich in soluble sugars like **Maize (मक्का)**, Sorghum (ज्वार).
* *Biochemical changes:* Lactic Acid Bacteria ferment sugars into Lactic Acid, dropping pH to **3.8 - 4.2**, preserving the feed.

### 3. Hay Making (हेय निर्माण)
* Drying green fodder to reduce moisture below **15%** while retaining green color and nutrients.
* *Best crops:* Legumes like **Berseem (बरसीम)** and Lucerne (रिजका).`,
            keyRevisionPoints: [
              "Ideal pH of high-quality silage is 3.8 to 4.2.",
              "Maize is the ideal crop for silage; Berseem is the ideal crop for hay making.",
              "Moisture content in dry hay must be below 15% to prevent mold growth.",
              "Anaerobic conditions in silos prevent the growth of putrefactive molds."
            ]
          },
          {
            id: "ahd5-ch3",
            title: "Feeding Stages, Deficiencies & Toxic Factors",
            summary: "Feeding management of calves/pregnant cows, nutrient deficiencies, and major plant toxins.",
            content: `### 1. Feeding Calves & Pregnant Animals
* **Colostrum (खीस):** First milk secreted after calving. Must be fed within 1-2 hours of birth (at 10% of body weight) to transfer maternal immunoglobulins.
* **Flushing:** Feeding extra concentrates to sheep/goats 2-3 weeks before breeding to boost ovulation rate.

### 2. High-Yield Feed Toxicities
* **HCN / Prussic Acid Poisoning:** Occurs in young, drought-stressed **Sorghum (Chari)** crops. Contains *Dhurrin* which is broken down into hydrocyanic acid, blocking oxygen transport in tissues.
  * *Antidote:* Sodium thiosulphate + Sodium nitrite IV.
* **Gossypol:** Toxic pigment in cottonseed cakes, harmful to calves.
* **Aflatoxicosis:** Moldy feed (Aspergillus flavus growth in damp conditions). Aflatoxin B1 is converted to M1 and secreted in milk.`,
            keyRevisionPoints: [
              "Colostrum contains immunoglobulins essential for calf immunity.",
              "Young drought-hit Sorghum contains Dhurrin, causing fatal HCN poisoning.",
              "Flushing enhances kidding/lambing percentage in goats and sheep.",
              "Aflatoxins grow on damp feed concentrates, creating severe human health risks."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Semester II (First Year)",
    subjects: [
      {
        id: "poultry-prod",
        name: "Introduction to Poultry Production",
        hindiName: "कुक्कुट उत्पादन प्रारंभिक परिचय",
        code: "AHD-VI",
        chapters: [
          {
            id: "ahd6-ch1",
            title: "Poultry Breeds & Rearing Systems",
            summary: "White Leghorn, Kadaknath, broiler/layer concepts, deep litter and cage systems.",
            content: `### 1. Important Poultry Breeds
* **Egg Type (Layers):** **Single Comb White Leghorn (WLH)**. World record holder for egg production (over 300 eggs/year). Small body size, high feed conversion.
* **Meat Type (Broilers):** Plymouth Rock, Cornish, New Hampshire. Fast growth (attain 2 kg in 35-42 days).
* **Indigenous Breed:** **Kadaknath (कड़कनाथ)** - Native to Jhabua/Dhar districts of **Madhya Pradesh**. Characterized by black plumage, black skin, black internal organs, and black meat (due to high melanin pigment). Highly valued for medicinal properties.

### 2. Rearing Systems
* **Deep Litter System (गहरी बिछावन प्रणाली):** Chicks are reared on floor covered with 2-6 inches of organic litter material (paddy husk, sawdust). Litter must be turned periodically to keep it dry and prevent ammonia accumulation.
* **Cage System:** Birds are housed in metallic wire cages. High stocking density, easier egg collection, but welfare concerns exist.`,
            keyRevisionPoints: [
              "Kadaknath is the GI-tagged indigenous poultry breed of MP Jhabua, famous for black meat.",
              "White Leghorn is the world's finest egg-producing breed.",
              "Litter moisture must be controlled to prevent coccidiosis outbreaks.",
              "Broiler diets focus on rapid muscle accretion, whereas layers require high calcium for shell formation."
            ]
          },
          {
            id: "ahd6-ch2",
            title: "Brooding, Hatchery Management & Egg Development",
            summary: "Brooder temperature controls, incubation humidity and turning, embryo development phases.",
            content: `### 1. Brooding Management (ब्रूडिंग)
* Brooding is the care and management of baby chicks from Day 1 to 4 weeks of age under artificial heat.
* **Brooder Temperature:** Start at $95^\circ\text{F}$ during the first week; reduce by $5^\circ\text{F}$ each week until room temperature is reached.
* Improper temperature leads to huddling (crowding together, causing suffocation and death).

### 2. Hatchery & Incubation parameters
* **Incubation Period of Chicken Eggs:** **21 days** (Goose/Turkey: 28 days).
* **Incubation Temperature:** $99.5^\circ\text{F} - 100^\circ\text{F}$ in forced-draft incubators.
* **Relative Humidity:** 60% during the first 18 days; increase to 70-75% during the last 3 days (hatching phase).
* **Egg Turning:** Eggs must be turned hourly (at a 45-degree angle) to prevent the developing embryo from sticking to the shell membrane.`,
            keyRevisionPoints: [
              "Chicken egg incubation period is 21 days.",
              "Brooder temperature starts at 95°F and drops weekly by 5°F.",
              "Egg turning is essential to prevent embryo adhesion to the shell membrane.",
              "Relative humidity must be increased during the hatching phase to facilitate shell pip."
            ]
          },
          {
            id: "ahd6-ch3",
            title: "Feeding, Cannibalism Control & Vaccination",
            summary: "Poultry nutrition, debeaking, caponisation, and Lasota/R2B Ranikhet disease vaccination schedules.",
            content: `### 1. Common Poultry Vices
* **Cannibalism (पंख नोचना):** Birds pecking at each other's vents, feathers, or toes. Triggered by overcrowding, dietary salt deficiency, or bright light.
  * *Prevention:* **Debeaking (चोंच काटना)** - cutting 1/3 of the upper beak and tip of the lower beak using a hot blade de-beaker at 10-14 days of age.
* **Moulting:** Shedding and renewal of feathers. Egg production stops during natural moult.

### 2. Important Poultry Diseases & Vaccination
* **Ranikhet Disease (Newcastle Disease):** Viral. Symptoms include gasping, nasal discharge, torticollis (paralyzed neck twisted backwards).
  * *Vaccine:* **F1 / Lasota strain** at 5-7 days (nasal/ocular drop). **R2B strain** at 8-10 weeks (Subcutaneous injection).
* **Marek's Disease:** Herpesvirus causing paralysis of wings/legs (sciatic nerve swelling).
  * *Vaccine:* Administered on Day 1 at hatchery (SC).`,
            keyRevisionPoints: [
              "Ranikhet disease is also known as Newcastle Disease; F1/Lasota is given on Day 5-7.",
              "Marek's Disease vaccine is administered on the very first day of chick life.",
              "Debeaking is the primary method to prevent cannibalism.",
              "Caponisation is the surgical castration of male chickens to improve meat quality."
            ]
          }
        ]
      },
      {
        id: "extension-transfer",
        name: "Livestock Extension and Technology Transfer",
        hindiName: "पशुपालन प्रसार शिक्षा एवं प्रौद्योगिकी हस्तांतरण",
        code: "AHD-VII",
        chapters: [
          {
            id: "ahd7-ch1",
            title: "Extension Principles, Methods & AV Aids",
            summary: "Extension education definition, teaching steps, individual/group/mass contact, and audio-visual displays.",
            content: `### 1. Extension Education (प्रसार शिक्षा)
Extension is an out-of-school system of education designed to help rural farmers improve their livestock practices, farming efficiency, and economic status.

### 2. Extension Teaching Methods
Classified based on the nature of contact:
* **Individual Contact (व्यक्तिगत संपर्क):**
  * Farm and home visits, personal letters, telephone calls.
  * *Advantage:* Highly effective; builds personal trust.
* **Group Contact (समूह संपर्क):**
  * Method demonstrations (e.g. showing how to make silage or use a CMT kit), result demonstrations, group discussions, workshops.
* **Mass Contact (विराट संपर्क):**
  * Radio, television, newspapers, posters, pamphlets, Kisan Melas.
  * *Advantage:* Reaches thousands of people quickly at low cost.

### 3. Audio-Visual Aids
* **Visual Aids:** Posters, charts, flashcards, slides.
* **Audio Aids:** Radio, tape recorders.
* **Audio-Visual:** Videos, television, documentaries.`,
            keyRevisionPoints: [
              "Method demonstration is a practical group-contact extension teaching technique.",
              "Mass contact is ideal for announcing outbreak alerts and vaccination camp dates.",
              "Result demonstration shows the value of a practice (e.g. comparing milk yield of upgraded cattle)."
            ]
          },
          {
            id: "ahd7-ch2",
            title: "MP Government Schemes & Census/Insurance",
            summary: "Vidyasagar Gau-Samvardhan Yojana, Pashupalan Protsahan schemes, livestock census cycles, and insurance policies.",
            content: `### 1. Key Animal Husbandry Schemes in Madhya Pradesh
* **Acharya Vidyasagar Gau-Samvardhan Yojana:** Provides subsidized bank loans to farmers for purchasing high-quality indigenous milch cows/buffaloes to promote milk production.
* **Pashupalan Protsahan Yojana:** Focuses on upgrading local low-yielding cows/buffaloes through high-quality artificial insemination (AI) and offering structural incentives to dairy cooperatives.

### 2. Livestock Census (पशु गणना)
* Conducted every **5 years** in India.
* Enumerates livestock species, breeds, age, sex, and utility classes across rural and urban households.

### 3. Livestock Insurance (पशु बीमा)
* Protects farmers against financial loss due to unexpected animal death from accidents, disease outbreaks, or natural calamities.
* Tagging (usually with polyurethane ear tags) is mandatory to claim insurance payouts.`,
            keyRevisionPoints: [
              "Livestock Census in India is conducted every 5 years.",
              "Acharya Vidyasagar Gau-Samvardhan Yojana is a major dairy development scheme of MP.",
              "Unique ear tagging is mandatory to process livestock insurance claims."
            ]
          }
        ]
      },
      {
        id: "public-health",
        name: "Basic of Veterinary Public Health",
        hindiName: "पशु चिकित्सा जन स्वास्थ्य के मूल सिद्धांत",
        code: "AHD-VIII",
        chapters: [
          {
            id: "ahd8-ch1",
            title: "Major Zoonotic Diseases",
            summary: "Anthrax, Brucellosis, Tuberculosis, and Rabies. Transmission pathways and clinical zoonoses.",
            content: `### 1. Zoonotic Diseases (पशुजन्य रोग)
Diseases and infections which are naturally transmitted between vertebrate animals and humans.

### 2. Bacterial Zoonoses
* **Anthrax (जहरबाद/प्लीहा ज्वर):** Caused by *Bacillus anthracis*. Humans get infected via handling contaminated wool/skin (Wool sorter's disease). Highly fatal, spore-forming.
* **Brucellosis (संक्रामक गर्भपात):** Causes abortion in cattle in the 3rd trimester. Causes undulant fever in humans, contracted via raw milk consumption.
* **Tuberculosis (क्षय रोग):** Contracted via unpasteurized milk of infected cows.

### 3. Viral Zoonoses
* **Rabies (जलभीति/हड़कवा):** Lyssavirus. Transmitted via bite of rabid dogs. Almost 100% fatal once clinical signs (hydrophobia, salivation) develop.

### 4. Prevention
* Regular vaccination of livestock (Brucella S19 vaccine for heifers) and dogs (anti-rabies vaccine).
* Avoid opening carcasses of animals suspected of dying from Anthrax to prevent spore formation and soil contamination.`,
            keyRevisionPoints: [
              "Brucellosis causes undulant fever in humans, usually contracted by drinking raw milk.",
              "Anthrax carcass must not be opened for post-mortem to prevent spore formation and soil contamination.",
              "Rabies is transmitted via saliva through dog bites, causing fatal encephalomyelitis.",
              "Anthrax is caused by a spore-forming bacterium, Bacillus anthracis."
            ]
          },
          {
            id: "ahd8-ch2",
            title: "Milk & Meat Hygiene and Waste Disposal",
            summary: "Milk pasteurization methods (LTLT, HTST), post-mortem abattoir carcass inspection, and medical waste disposal.",
            content: `### 1. Milk Hygiene & Pasteurization (पाश्चुरीकरण)
Pasteurization is heating milk to destroy pathogens like *Mycobacterium bovis* and *Coxiella burnetii* (the most heat-resistant non-spore former).
* **LTLT Method (Low Temp Long Time):** $63^\circ\text{C}$ for 30 minutes.
* **HTST Method (High Temp Short Time):** $72^\circ\text{C}$ for 15 seconds.

### 2. Meat Hygiene
* **Ante-mortem Inspection:** Examining live animals before slaughter to detect signs of systemic diseases (fever, septicemia).
* **Post-mortem Inspection:** Inspecting carcass meat, liver, lymph nodes, and lungs at the abattoir to identify infectious lesions (e.g. Tuberculosis nodules).

### 3. Clinical Waste Disposal
* **Biomedical Waste Management:** Segregating clinical wastes (needles, syringes, dressings) using color-coded bins to prevent public health hazards. Incineration or deep burial is used for carcass disposal.`,
            keyRevisionPoints: [
              "Coxiella burnetii is the index organism used to calibrate milk pasteurization safety.",
              "HTST pasteurization requires heating milk to 72°C for 15 seconds.",
              "Ante-mortem inspection prevents sick animals from being processed for human meat.",
              "Sharps must be disposed of in puncture-proof white/grey containers."
            ]
          }
        ]
      },
      {
        id: "livestock-products",
        name: "Basic of Livestock Products",
        hindiName: "पशुधन उत्पादों का प्रारंभिक प्रसंस्करण",
        code: "AHD-IX",
        chapters: [
          {
            id: "ahd9-ch1",
            title: "Milk Composition & Adulteration Tests",
            summary: "Bovine milk fat, SNF, specific gravity, COB test, and starch/urea detection tests.",
            content: `### 1. Composition of Milk (दूध का संघटन)
Milk is a complex emulsion (fat), colloidal suspension (casein), and true solution (lactose, minerals).
* **Major Milk Protein:** **Casein** (represents ~80% of total milk protein).
* **Milk Sugar:** **Lactose** (disaccharide of glucose and galactose), responsible for the sweet taste.
* **Fat Percentage:** High in buffalo milk (7-8%) compared to cow milk (4-5%).

### 2. Platform Tests (डेयरी रिसेप्शन जांच)
Tests performed immediately on receiving milk cans to assess quality:
* **Clot on Boiling (COB) Test:** Heating a small sample of milk. If it clots, acidity is high ($>0.2\%$ lactic acid), indicating the milk is sour and unfit for pasteurization.
* **Lactometer Reading:** Determines specific gravity of milk to check for water adulteration. Normal bovine specific gravity: **1.028 to 1.032**.

### 3. Detection of Milk Adulterants
* **Starch Adulteration:** Add Iodine solution. Formation of **blue color** indicates presence of starch.
* **Urea Adulteration:** Para-dimethylaminobenzaldehyde (DMAB) reagent yields a yellow color if synthetic urea is added to fake the protein content.`,
            keyRevisionPoints: [
              "Casein is the chief milk protein.",
              "Lactometer measures specific gravity; water addition drops specific gravity below 1.026.",
              "A positive Clot on Boiling (COB) test indicates high milk acidity.",
              "Starch is added to milk to artificially boost lactometer readings."
            ]
          },
          {
            id: "ahd9-ch2",
            title: "Abattoir Management & Meat/Egg Value",
            summary: "Slaughter methods, dressing percentage calculations, abattoir byproducts, and egg structure.",
            content: `### 1. Abattoir Management & Slaughtering
* **Humane Slaughter:** Stunning animals before slaughter to render them unconscious and pain-free.
* **Dressing Percentage (ड्रेसिंग प्रतिशत):**
  $$\\text{Dressing Percentage} = \\frac{\\text{Cold Carcass Weight}}{\\text{Live Animal Weight}} \\times 100$$
  * *Cattle:* ~50-55%.
  * *Pigs:* ~70-75% (highest dressing percentage).

### 2. Abattoir Byproducts
* Bones, hooves, horns, and blood are processed into **bone meal**, **blood meal**, and gelatin.
* Glands are used in pharmaceutical extractions (e.g. heparin from lungs).

### 3. Nutritive Value of Eggs (अंडे की पोषकता)
* **Albumen (सफेद भाग):** Contains high-quality water-soluble proteins (ovalbumin).
* **Yolk (पीला भाग):** Rich in lipids, fat-soluble vitamins (A, D, E), and lecithin.`,
            keyRevisionPoints: [
              "Pigs have the highest dressing percentage among livestock (70-75%).",
              "Dressing percentage excludes head, hide, viscera, and hooves in cattle.",
              "Egg yolk is rich in lecithin and fat-soluble vitamins.",
              "Blood meal is used as a high-protein animal feed supplement."
            ]
          }
        ]
      },
      {
        id: "animal-welfare",
        name: "Farm Animal Welfare",
        hindiName: "कृषि पशु कल्याण",
        code: "AHD-X",
        chapters: [
          {
            id: "ahd10-ch1",
            title: "Principles of Animal Welfare & Laws",
            summary: "The Five Freedoms of animal welfare, Prevention of Cruelty Acts (1960), and AWBI and CPCSEA frameworks.",
            content: `### 1. The Five Freedoms of Animal Welfare
Animal welfare refers to the physical and mental state of an animal. All livestock housing and handling must respect the **Five Freedoms**:
1. **Freedom from Hunger and Thirst:** Access to fresh water and balanced feed.
2. **Freedom from Discomfort:** Providing clean shelter and comfortable resting areas.
3. **Freedom from Pain, Injury, or Disease:** Rapid diagnosis and treatment.
4. **Freedom to Express Normal Behavior:** Providing sufficient space and company of other animals.
5. **Freedom from Fear and Distress:** Avoiding mental suffering through gentle handling.

### 2. Key Animal Protection Legislations in India
* **Prevention of Cruelty to Animals (PCA) Act, 1960:** Formulated to prevent unnecessary pain or suffering to animals. Established the **Animal Welfare Board of India (AWBI)**.
* **CPCSEA:** Regulates and audits the use of animals in research and educational clinics.`,
            keyRevisionPoints: [
              "The Prevention of Cruelty to Animals (PCA) Act was enacted in the year 1960.",
              "The Animal Welfare Board of India (AWBI) is headquartered in Ballabhgarh, Haryana.",
              "Welfare requires providing animals with clean, spacious, and safe housing.",
              "CPCSEA stands for Committee for the Purpose of Control and Supervision of Experiments on Animals."
            ]
          },
          {
            id: "ahd10-ch2",
            title: "Stray Animal Regulation & Disaster Management",
            summary: "Kanji houses, Goshala regulations, cow slaughter prevention acts, and natural disaster rescues.",
            content: `### 1. Kanji House & Goshala Management
* **Kanji Houses:** Local authority shelters established to impound stray or trespassing cattle and protect crops.
* **Goshalas:** Non-profit shelters dedicated to housing abandoned, unproductive, or aged cattle.

### 2. Prevention of Cow Slaughter Act
* State-level legislations in Madhya Pradesh that prohibit the slaughter of cows and their progeny to preserve valuable indigenous livestock resources.

### 3. Disaster Management for Livestock
* During floods, earthquakes, or droughts, para-veterinarians play a crucial role in evacuating livestock, establishing temporary feeding centers, and conducting mass vaccinations to prevent post-disaster disease outbreaks.`,
            keyRevisionPoints: [
              "Kanji houses are managed by local municipal bodies.",
              "Post-disaster vaccinations prevent outbreak propagation (e.g. Hemorrhagic Septicemia).",
              "Goshalas help preserve and rehabilitate unproductive cattle."
            ]
          }
        ]
      },
      {
        id: "computer-apps",
        name: "Application of Computers in Animal Husbandry",
        hindiName: "पशुपालन में कंप्यूटर के अनुप्रयोग",
        code: "AHD-XI",
        chapters: [
          {
            id: "ahd11-ch1",
            title: "Computer Hardware, OS & Office Tools",
            summary: "Basic hardware (CPU, ROM), operating system structures, and using Word, Excel and PowerPoint.",
            content: `### 1. Computer Hardware (हार्डवेयर)
* **CPU (Central Processing Unit):** The brain of the computer.
* **RAM (Random Access Memory):** Volatile primary memory used for active processing.
* **ROM (Read Only Memory):** Non-volatile memory storing startup instructions (BIOS).
* **Storage Devices:** Hard drives, solid-state drives, USB flash drives.

### 2. Operating Systems (OS)
* Software that manages hardware resources and provides a user interface. E.g., Windows, macOS, Linux, Android.

### 3. Office Productivity Tools
* **MS Excel:** Highly useful for dairy managers to maintain feed formulations, calculate feed costs, track milk production, and graph herd growth.
* **MS Word:** Used for writing clinical reports, diagnostic certificates, and official letters.
* **MS PowerPoint:** Used for creating slides for farmers training workshops.`,
            keyRevisionPoints: [
              "RAM is volatile memory; ROM is non-volatile memory.",
              "MS Excel is the primary tool used for quick numeric calculations on livestock farms.",
              "Operating systems are system software that bridge hardware and application software."
            ]
          },
          {
            id: "ahd11-ch2",
            title: "Digital Farm Databases & INAPH system",
            summary: "Farm record-keeping software, national livestock databases, and the 12-digit ear tagging scheme.",
            content: `### 1. Database Management on Farms (डेटाबेस प्रबंधन)
Maintaining digital records of pedigree, breeding, milk yields, and health histories eliminates paper loss and allows rapid searching.

### 2. The INAPH System (NDDB)
* **INAPH:** Information Network for Animal Productivity and Health.
* Developed by the **National Dairy Development Board (NDDB)**.
* Uses uniquely coded **12-digit polyurethane ear tags** applied to cattle and buffaloes.
* Field technicians log details of artificial insemination (AI), pregnancy diagnosis (PD), calving, vaccination, and milk testing directly into the INAPH network via tablets or smartphones.`,
            keyRevisionPoints: [
              "INAPH is managed by the National Dairy Development Board (NDDB).",
              "Each dairy cow registered under INAPH receives a unique 12-digit ear tag.",
              "Digital databases allow breeders to calculate milk production indexes instantly."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Semester III (Second Year)",
    subjects: [
      {
        id: "reproduction-ai",
        name: "Basic Animal Reproduction and Artificial Insemination",
        hindiName: "प्रारंभिक पशु प्रजनन एवं कृत्रिम गर्भाधान",
        code: "AHD-XII",
        chapters: [
          {
            id: "ahd12-ch1",
            title: "Reproductive Physiology & Estrous Cycles",
            summary: "Structure of ovaries and testes, puberty, gestation periods, and estrous cycle indicators.",
            content: `### 1. Estrous Cycle in Ruminants (मदचक्र)
The estrous cycle is the repeating pattern of reproductive changes in females. In cows/buffaloes, it lasts **21 days** (range 18-24 days).
* **Estrous Cycle Phases:**
  1. **Proestrus (3-4 days):** Follicular development under FSH. Estrogen rises.
  2. **Estrus / Heat (12-24 hours):** Peak estrogen. Animal exhibits behavioral signs of heat. **Ovulation occurs 10-14 hours after the end of estrus**.
  3. **Metestrus (3-4 days):** Luteinizing hormone surge forms the Corpus Luteum (CL). Progesterone rises.
  4. **Diestrus (10-14 days):** Active CL. High Progesterone prepares uterus for pregnancy. If no pregnancy occurs, uterine prostaglandin ($PGF_{2\\alpha}$) regresses the CL.

### 2. Gestation Periods (गर्भावस्था अवधि)
The duration of pregnancy in major domestic species:
* **Cow:** ~280 days (9 months 9 days).
* **Buffalo:** ~310 days (10 months 10 days).
* **Sheep/Goat:** ~150 days (5 months).
* **Mare (Horse):** ~340 days.
* **Sow (Pig):** ~114 days (3 months 3 weeks 3 days).`,
            keyRevisionPoints: [
              "Estrous cycle in cows/buffaloes is 21 days.",
              "Ovulation in cattle is metestrous (occurs 10-14 hours after heat ends).",
              "Gestation period of buffalo is 310 days.",
              "Progesterone is the primary hormone maintaining pregnancy."
            ]
          },
          {
            id: "ahd12-ch2",
            title: "Semen Collection & Cryopreservation",
            summary: "Semen evaluation, liquid nitrogen tanks, and thawing warm-water protocols.",
            content: `### 1. Semen Collection (वीर्य एकत्रीकरण)
* **Artificial Vagina (AV) Method:** Best method for cattle/buffaloes. Utilizes optimal temperature ($41^\circ\text{C} - 45^\circ\text{C}$) and pressure to trigger ejaculation in bulls.

### 2. Semen Evaluation
* Checked for volume, color, mass activity (0-5 scale), and individual sperm motility under a microscope.

### 3. Cryopreservation
Semen is extended (with egg yolk/glycerol buffers) and frozen into **French mini (0.25 ml)** or French medium (0.5 ml) straws.
* **Liquid Nitrogen (LN2):** Straws are preserved at **$-196^\circ\text{C}$** in LN2 containers.
* **Thawing Protocol (थॉइंग):** Before insemination, straws must be immersed in a warm water bath at **$35^\circ\text{C} - 37^\circ\text{C}$ for exactly 30 seconds**.`,
            keyRevisionPoints: [
              "Liquid Nitrogen (LN2) temperature is -196°C.",
              "Bovine artificial vagina temperature must be maintained at 41-45°C during collection.",
              "Thawing frozen semen straws requires warm water (35-37°C) for 30 seconds."
            ]
          },
          {
            id: "ahd12-ch3",
            title: "Artificial Insemination (AI) Protocols",
            summary: "Step-by-step Recto-Vaginal technique, gun loading, and pregnancy diagnosis methods.",
            content: `### 1. Step-by-Step AI Technique (Recto-Vaginal Method)
The Recto-Vaginal method is the gold standard in bovines:
1. **Restraint:** Secure the animal in a Travis.
2. **Rectal Entry:** Wear a well-lubricated long glove. Insert hand in rectally, remove dung, and locate the Cervix.
3. **Cleaning:** Clean the vulvar lips thoroughly with dry tissue.
4. **Gun Loading:** Load the thawed straw into the AI Gun, cut the sealed end at 90° with a clean cutter, and apply a sterile sheath.
5. **Gun Insertion:** Insert the AI Gun at a **45-degree upward angle** into the vulva (to bypass the suburethral diverticulum), then make it horizontal.
6. **Passing Cervix:** Guide the cervix over the gun rectally.
7. **Semen Deposition:** Deposit semen in the **Body of the Uterus** (just anterior to internal os of the cervix). Deposition should take 5 seconds.
8. **Withdrawal:** Gently withdraw gun and inspect for injuries.`,
            keyRevisionPoints: [
              "The correct site of semen deposition in bovines is the Body of the Uterus.",
              "AI Gun is inserted upwards at 45° to avoid the suburethral diverticulum, which lies on the vaginal floor.",
              "Passing the cervical rings is achieved by gentle rectal manipulation.",
              "Pregnancy can be manually diagnosed via rectal palpation at 60 days post-AI."
            ]
          }
        ]
      },
      {
        id: "drug-compounding",
        name: "Veterinary Drug Compounding and Dispensing",
        hindiName: "पशु चिकित्सा औषधि सम्मिश्रण एवं वितरण",
        code: "AHD-XIII",
        chapters: [
          {
            id: "ahd13-ch1",
            title: "Prescription Structure & Abbreviations",
            summary: "Superscription, Inscription, Subscription, and Signatura. Common Latin prescription shortcuts.",
            content: `### 1. Structure of a Veterinary Prescription (नुस्खा लेखन)
A prescription is a formal written order from a veterinarian to a compounder:
* **Superscription:** The Rx symbol (derived from 'Recipe' / 'take thou').
* **Inscription:** The core list of drugs, strengths, and active ingredients.
* **Subscription:** Instructions to the compounder regarding compounding or dispensing (e.g., "Dispense 10 boluses").
* **Signatura / Signature (Sig):** Instructions to the animal owner detailing dosage and route (e.g. "Give 1 bolus orally b.i.d. for 5 days").

### 2. Common Latin Abbreviations in Vet Practice
* **Rx (Recipe):** Take thou.
* **o.d. (Omni die):** Once daily.
* **b.i.d. (Bis in die):** Twice daily.
* **t.i.d. (Ter in die):** Three times daily.
* **q.i.d. (Quater in die):** Four times daily.
* **p.o. (Per os):** Orally (By mouth).
* **q.s. (Quantum sufficit):** Quantity sufficient.`,
            keyRevisionPoints: [
              "Rx represents the Superscription meaning 'take thou'.",
              "Signatura contains instructions intended for the animal owner.",
              "b.i.d. stands for twice daily; t.i.d. stands for three times daily.",
              "q.s. is used in pharmaceutical compounding to indicate filling to volume."
            ]
          },
          {
            id: "ahd13-ch2",
            title: "Drug Dosage Forms & Administration",
            summary: "Bolus, drench, electuary, routes of injection (IM, IV, SC, Intramammary), and aspiration warning.",
            content: `### 1. Dosage Forms
* **Bolus:** Large compressed tablet designed for oral administration in ruminants.
* **Drench (नाल):** Liquid medicine administered orally using a drenching bottle or bamboo horn.
  * **Critical Warning:** During drenching, **never pull the animal's tongue out or raise its nose above its eyes**. Doing so blocks the epiglottis, allowing the drench to enter the trachea and lungs, causing fatal **Aspiration Pneumonia**.
* **Electuary:** Paste or syrup containing medicine rubbed directly onto the animal's teeth or gums.

### 2. Routes of Drug Administration
* **Intramuscular (IM - मांसपेशी में):** Angle $90^\circ$. Fast absorption. Preferred in the neck muscles of cattle to avoid valuable carcass cuts.
* **Intravenous (IV - नस में):** Angle $15^\circ - 30^\circ$. Immediate $100\%$ bioavailability. Preferred in the **Jugular vein** in cattle, and **ear vein** in pigs.
* **Subcutaneous (SC - त्वचा के नीचे):** Angle $45^\circ$. Loose skin behind the shoulder or neck. Slow absorption, preferred for vaccines.`,
            keyRevisionPoints: [
              "Aspiration pneumonia is a fatal consequence of incorrect drenching technique.",
              "Jugular vein in the neck sulcus is the primary site for large volume IV infusions.",
              "Intramuscular injections should be given at a 90° angle.",
              "Vaccines are routinely administered subcutaneously to avoid meat blemishes."
            ]
          }
        ]
      },
      {
        id: "herd-health-1",
        name: "Herd Health Management - I",
        hindiName: "पशुधन स्वास्थ्य प्रबंधन - प्रथम",
        code: "AHD-XIV",
        chapters: [
          {
            id: "ahd14-ch1",
            title: "Basics of Infectious Diseases",
            summary: "Definitions of etiology, pathogenesis, infection transmission, and classification of diseases.",
            content: `### 1. Etiology & Pathogenesis
* **Etiology (हेतुकी):** The study of the cause of a disease (e.g. bacteria, virus, parasite, nutrition).
* **Pathogenesis:** The step-by-step physiological development of a disease inside the animal body.

### 2. Disease Classifications
* **Infectious Disease:** Caused by pathogens (viruses, bacteria) that can invade host tissues.
* **Contagious Disease:** An infectious disease transmitted rapidly through direct contact (e.g. FMD).
* **Acute Disease:** Sudden onset, severe symptoms, short course (e.g. Anthrax, HS).
* **Chronic Disease:** Slow onset, mild symptoms, prolonged course (e.g. Tuberculosis, Johne's Disease).`,
            keyRevisionPoints: [
              "Infectious diseases require a viable pathogen to propagate.",
              "FMD is highly contagious and spreads rapidly via aerosol or fomites.",
              "Acute diseases progress rapidly; chronic diseases persist for months or years."
            ]
          },
          {
            id: "ahd14-ch2",
            title: "Critical Infectious Outbreaks",
            summary: "FMD (Foot and Mouth), HS (Hemorrhagic Septicemia), BQ (Black Quarter), and Anthrax.",
            content: `### 1. Foot and Mouth Disease (FMD / खुरपका-मुंहपका)
* **Etiology:** Picornavirus. Type O is most common in India.
* **Symptoms:** Vesicles/blisters on mouth, tongue, and interdigital space. Profuse ropy salivation and 'smacking' sound. **Tiger Heart disease** (myocardial necrosis) in calves.
* **Treatment:** Wash lesions with 1% $KMnO_4$ (mouth) and 2-4% $CuSO_4$ (feet).

### 2. Hemorrhagic Septicemia (HS / गलघोंटू)
* **Etiology:** *Pasteurella multocida*. Occurs in monsoon.
* **Symptoms:** High fever, hot painful swelling in throat, respiratory grunting sound, rapid death.
* **Treatment:** Sulfadimidine 33.3% IV.

### 3. Black Quarter (BQ / जहरबाद)
* **Etiology:** *Clostridium chauvoei*.
* **Symptoms:** Crepitating (crackling) swelling in hindquarter muscles. Muscle is dark-red with a **rancid butter odor** on incision.

### 4. Anthrax (प्लीहा ज्वर)
* **Etiology:** *Bacillus anthracis* (Gram+, spore-forming).
* **Symptoms:** Sudden death with tarry, non-clotting blood discharging from natural orifices (mouth, nose, anus). Absence of rigor mortis. Splenomegaly (huge spleen).
* **Precaution:** **Do NOT open the carcass** of a suspected Anthrax case to prevent bacterial spore formation.`,
            keyRevisionPoints: [
              "Tiger Heart disease is a pathognomonic lesion of calf FMD.",
              "Sulfadimidine is the specific drug of choice for Hemorrhagic Septicemia.",
              "Crepitus sound in gluteal muscles indicates Black Quarter.",
              "Non-clotting dark blood from natural orifices suggests Anthrax; PM must be avoided."
            ]
          },
          {
            id: "ahd14-ch3",
            title: "Vaccination, Deworming & Quarantine Protocols",
            summary: "Cold chain maintenance, deworming calendars, quarantine periods, and carcass disposal.",
            content: `### 1. Vaccine Storage & Transportation (Cold Chain)
* Vaccines are temperature-sensitive biologicals. They must be stored in refrigerators at **$2^\circ\text{C} - 8^\circ\text{C}$**.
* During transport, use insulated ice boxes containing frozen gel packs to prevent thermal inactivation.

### 2. Deworming Calendar (कृमिनाशन कार्यक्रम)
* Calves should receive their first deworming at 10-14 days of age using **Piperazine** or **Fenbendazole** to target roundworms (*Toxocara vitulorum*).
* Repeat deworming monthly for the first 6 months, then quarterly.

### 3. Quarantine (संगरोध)
* Isolating newly purchased or sick animals in a separate pen far from the healthy herd for **at least 21 to 30 days** to check for incubating infectious diseases.

### 4. Carcass Disposal
* Animals dying from infectious diseases must be buried in a deep pit (6 feet deep) covered with lime (quicklime) or cremated to prevent environmental contamination.`,
            keyRevisionPoints: [
              "Vaccines must be maintained at 2-8°C (never frozen unless specified).",
              "First deworming in calves is scheduled at 10-14 days of age to target Toxocara vitulorum.",
              "Minimum quarantine duration for newly introduced animals is 21-30 days."
            ]
          }
        ]
      },
      {
        id: "surgical-procedures",
        name: "Basic Surgical Procedures and Care",
        hindiName: "प्रारंभिक शल्य चिकित्सा एवं देखभाल",
        code: "AHD-XV",
        chapters: [
          {
            id: "ahd15-ch1",
            title: "Surgical Sterilization, Wounds & Restraint",
            summary: "Autoclave moisture controls, wound cleaning, antiseptic solutions, and casting casting restraints.",
            content: `### 1. Surgical Sepsis and Asepsis
* **Asepsis:** Complete absence of viable microorganisms from the surgical zone.
* **Sterilization Methods:**
  * **Autoclaving (भाप द्वारा):** Moist heat under pressure. Standard: **$121^\circ\text{C}$ temperature at $15\text{ psi}$ pressure for 15-20 minutes**. Destroys all vegetative bacteria and highly resistant spores.
  * **Hot Air Oven:** Dry heat. $160^\circ\text{C}$ for 2 hours. Best for glass syringes.

### 2. Surgical Restraints (Casting)
* Casting refers to bringing large animals down onto the ground using ropes:
  * **Reuff's Method:** Uses a single rope looped around the neck, thorax, and flank.
  * **Alternate Method:** Bowline knot casting.
  * Always cast animals onto soft bedding to prevent radial nerve paralysis or fractures.`,
            keyRevisionPoints: [
              "Autoclave standard parameters: 121°C, 15 psi, 15-20 minutes.",
              "Moist heat destroys microbial proteins via coagulation.",
              "Reuff's method is the standard rope arrangement used to cast adult cattle.",
              "Radial nerve paralysis is a complication of prolonged lateral recumbency on hard floors."
            ]
          },
          {
            id: "ahd15-ch2",
            title: "Superficial Surgical Ailments & Fractures",
            summary: "Ailments: Abscesses, hematomas, tumors, first-aid in fractures, and splint applications.",
            content: `### 1. Superficial Surgical Ailments
* **Abscess (फोड़ा):** Localized collection of pus under the skin.
  * *Treatment:* Apply hot fomentation/poultice to mature. Once soft, make a **cruciate incision** at the lowest point, drain pus, flush with 1:1000 $KMnO_4$, and pack with antiseptic gauze.
* **Hematoma:** Localized collection of clotted blood, usually fluctuating and warm, caused by blunt vascular trauma.
* **Hernia:** Protrusion of visceral organs (intestines) through an abnormal opening in the abdominal wall.

### 2. Fracture First-Aid
* **Fracture:** Complete or incomplete break in the continuity of a bone.
* **First-aid:** Immobilize the affected limb immediately using wooden or plastic **splints** and bandages to prevent compound fracture progression during transport.`,
            keyRevisionPoints: [
              "Cruciate incision is preferred for draining fully matured abscesses.",
              "Hematoma contains blood; abscess contains pus.",
              "Splints provide critical support to prevent a simple fracture from breaking the skin."
            ]
          },
          {
            id: "ahd15-ch3",
            title: "Anesthesia & Post-operative Dressing",
            summary: "Lignocaine 2% administration, infiltration, L-block flank block, and wound dressing.",
            content: `### 1. Veterinary Local Anesthesia
* **Lignocaine Hydrochloride (2%):** The most common local anesthetic agent.
* **Infiltration Anesthesia:** Injecting lignocaine subcutaneously along the planned incision line.
* **L-Block:** Used for flank laparotomies (e.g., Rumenotomy or Caesarean). Lignocaine is injected in an inverted 'L' pattern in the left paralumbar fossa to block nerves supplying the flank wall.

### 2. Wound Care and Dressings (पट्टी बाँधना)
* **Wound cleaning:** Irrigate with sterile saline or mild antiseptics.
* **Dressings:** Apply **Povidone Iodine (Betadine)** or Silver sulfadiazine ointment to promote healing and apply sterile gauze to prevent fly strike (myiasis).`,
            keyRevisionPoints: [
              "Lignocaine (2%) acts by blocking sodium channels in nerve fibers.",
              "L-block provides anesthesia to the left flank for rumenotomy operations.",
              "Povidone Iodine is a highly effective broad-spectrum surgical antiseptic.",
              "Fly strike (Myiasis) is prevented by applying fly-repellent creams like Loraxane or Himax."
            ]
          }
        ]
      },
      {
        id: "farm-practices",
        name: "Acquaintance with Farm Practices",
        hindiName: "डेयरी फार्म अभ्यास परिचय (अ-क्रेडिट)",
        code: "AHD-XVI",
        chapters: [
          {
            id: "ahd16-ch1",
            title: "Practical Dairy Farm Operations",
            summary: "Grooming schedules, hoof-trimming, weight estimation, and dairy farm record tracking.",
            content: `### 1. Daily Farm Routine
1. **Early Morning (4:00 AM):** Clean cow beds, wash udders, full-hand milking.
2. **Morning (7:00 AM):** Stall feed concentrates, supply fresh water, document yield logs.
3. **Mid-day:** Grooming and heat detection.
4. **Afternoon (3:00 PM):** Second cleaning, second milking.

### 2. Farm Operations
* **Grooming (खराहरा):** Brushing the coat of animals with a curry comb. Removes loose dirt and skin parasites, and stimulates subcutaneous blood circulation.
* **Hoof Trimming (खुर तराशना):** Trimming overgrown hooves in stall-fed animals. Prevent lameness, joint strain, and sole ulcers.
* **Weight Estimation (Shaeffer's Formula):**
  $$\\text{Weight (lbs)} = \\frac{\\text{Heart Girth}^2 \\times \\text{Length}}{300}$$
  * *Heart Girth:* Circumference around the chest behind the shoulder (inches).
  * *Length:* From point of shoulder to point of pin bone (inches).`,
            keyRevisionPoints: [
              "Grooming stimulates blood circulation and improves overall animal hygiene.",
              "Overgrown hooves lead to severe lameness and reduce feed intake.",
              "Shaeffer's Formula is used to calculate livestock body weight without a weighing scale."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Semester IV (Second Year)",
    subjects: [
      {
        id: "clinical-practices",
        name: "Basics of Clinical Practices",
        hindiName: "प्रारंभिक नैदानिक एवं चिकित्सा अभ्यास",
        code: "AHD-XVII",
        chapters: [
          {
            id: "ahd17-ch1",
            title: "Veterinary Diagnostic Imaging",
            summary: "Diagnostic tools: X-Ray radiation safety, lead aprons, and early pregnancy ultrasound scanning.",
            content: `### 1. Veterinary Radiography (X-Ray)
* **X-Rays:** High-energy electromagnetic radiation capable of penetrating tissues to expose photographic film.
* **Primary Uses:** Diagnosing limb fractures, joint dislocations, and hardware disease (piercing metal bodies).
* **Radiation Safety:** Handlers must wear **lead aprons (0.5 mm lead equivalent)** and thyroid shields, and avoid direct exposure to the primary beam.

### 2. Ultrasonography (USG / अल्ट्रासाउंड)
* Uses high-frequency sound waves ($>2\text{ MHz}$) to visualize internal soft tissues.
* **Primary Uses:**
  * **Early Pregnancy Diagnosis (PD):** Can detect viable pregnancy in cows/buffaloes as early as **28-30 days post-AI** (via transrectal ultrasound probe), compared to 60 days via manual rectal palpation.
  * Detecting ovarian abnormalities (follicular cysts, luteal cysts).`,
            keyRevisionPoints: [
              "Lead aprons are essential to block scattered X-ray radiation.",
              "USG uses high-frequency sound waves and is safe from ionizing radiation.",
              "Transrectal ultrasonography allows bovine pregnancy diagnosis as early as 28-30 days post-AI."
            ]
          },
          {
            id: "ahd17-ch2",
            title: "Laboratory Setup & Equipments",
            summary: "Layout of diagnostic labs, clinical microscope, centrifuge, hot air oven, and glassware sterilizations.",
            content: `### 1. Layout of Diagnostic Labs
* Requires distinct work benches for Hematology, Parasitology/Fecal exam, Urinalysis, and Microbiology.
* Handwashing stations and emergency eyewash stations must be accessible.

### 2. Lab Equipment
* **Centrifuge (अपकेंद्रित्र):** Spins biological fluids (blood, urine) at high speeds to separate components based on density.
* **Microscope:** Used to examine blood smears (for protozoa like Babesia), fecal samples (for parasite eggs), and skin scrapings.
* **Autoclave & Hot Air Oven:** For sterilizing lab supplies and glassware.

### 3. Glassware Washing & Sterilization
* Wash glass tubes, slides, and pipettes with detergent, rinse thoroughly with distilled water, and sterilize in a **Hot Air Oven at $160^\circ\text{C}$ for 2 hours**.`,
            keyRevisionPoints: [
              "Centrifugation separates solids from liquid suspensions.",
              "Hot air oven at 160°C for 2 hours is the standard protocol for dry sterilization of lab glassware.",
              "Microscopes must be cleaned with lens paper and kept dust-free."
            ]
          }
        ]
      },
      {
        id: "herd-health-2",
        name: "Herd Health Management-II",
        hindiName: "पशुधन स्वास्थ्य प्रबंधन - द्वितीय",
        code: "AHD-XVIII",
        chapters: [
          {
            id: "ahd18-ch1",
            title: "Case Registration & History Recording",
            summary: "Clinical presentation logs, capturing signalment, history recording, and reporting cases.",
            content: `### 1. Case Registration (पंजीकरण)
* Every animal brought to a veterinary dispensary/hospital must be registered with a unique case ID.
* **Signalment (विवरण):** Recording the species, breed, age, sex, color, and identification marks (e.g., ear tag number) of the patient. Signalment is vital for forensic jurisprudence and insurance claims.

### 2. History Recording (इतिहास दर्ज करना)
* Asking the owner structured questions to map out symptoms:
  * Duration of illness (acute vs chronic).
  * Appetite and milk yield changes.
  * Fecal consistency (constipation vs diarrhea) and urine color.
  * Recent calving date and vaccination history.`,
            keyRevisionPoints: [
              "Signalment refers to the identification details of the animal patient.",
              "History recording is the first step in clinical diagnosis.",
              "A drop in milk yield is a common general indicator of system illness in dairy animals."
            ]
          },
          {
            id: "ahd18-ch2",
            title: "Outbreak Management & Necropsy Prep",
            summary: "Reporting outbreaks, sample preservation (fecal/skin scrapings), and necropsy (post-mortem) protocols.",
            content: `### 1. Disease Outbreak Management
* When a contagious disease (e.g., FMD, HS) is suspected, immediate actions are required:
  1. **Notification:** Report to senior veterinary authorities.
  2. **Isolate:** Move sick animals to an isolation shed.
  3. **Restrict Movement:** Halt animal transport and grazing in the affected village.
  4. **Ring Vaccination:** Vaccinate healthy animals in a 5-10 km radius.

### 2. Diagnostic Sample Collection & Dispatch
* **Fecal Samples:** Collect fresh feces directly from the rectum, place in clean containers, and add **10% Formalin** as a preservative if dispatching to a diagnostic lab.
* **Skin Scrapings:** Scrape the margins of lesions until capillary blood oozes to collect mites for diagnosing **Mange**. Preserve in **10% KOH** or dry containers.

### 3. Necropsy (Post-Mortem) Preparations
* Necropsy is performed to confirm the cause of death.
* Handlers must prepare: Post-mortem knives, bone cutters, saw, gloves, disinfectant, and jars with preservatives (10% formalin) for tissue biopsies.`,
            keyRevisionPoints: [
              "Ring vaccination is performed in a 5-10 km radius around an outbreak center.",
              "Mites causing mange reside in the deep layers of the skin; scraping must draw blood.",
              "Fecal samples are preserved in 10% formalin for parasitological exams.",
              "Never perform a PM on suspected Anthrax to prevent spore dispersal."
            ]
          },
          {
            id: "ahd18-ch3",
            title: "Veterinary Jurisprudence & Livestock Laws",
            summary: "Veterinary Council Act (1984), prevention of cruelty acts, and clinical forensic cases.",
            content: `### 1. Veterinary Jurisprudence (पशु चिकित्सा न्यायशास्त्र)
The application of veterinary medical knowledge to legal, civil, and criminal laws.

### 2. Major Livestock Acts in India
* **Veterinary Council Act, 1984:** Regulates veterinary practice and education standards across India.
* **Prevention of Cruelty to Animals Act, 1960:** Defines animal abuse, mandates humane transport conditions, and prohibits painful procedures without anesthesia.

### 3. Forensic Cases
* In cases of suspected poisoning, animal abuse, or theft, the para-veterinarian assists in collecting legal evidence, sealing viscera samples for chemical analysis, and filling out legal post-mortem logs.`,
            keyRevisionPoints: [
              "The Veterinary Council Act was enacted in 1984.",
              "Cruelty prevention laws prohibit branding or painful operations without local anesthesia.",
              "Viscera samples for toxicology are preserved in saturated sodium chloride or rectified spirit."
            ]
          }
        ]
      },
      {
        id: "lab-techniques",
        name: "Basic Veterinary Laboratory Techniques",
        hindiName: "प्रारंभिक पशु चिकित्सा प्रयोगशाला तकनीक",
        code: "AHD-XIX",
        chapters: [
          {
            id: "ahd19-ch1",
            title: "Hematology (Sahli's Hb, TLC & DLC)",
            summary: "Procedure for blood collection, anticoagulants (EDTA/Heparin), and calculating Hb, TLC, and DLC.",
            content: `### 1. Blood Collection & Anticoagulants
* **Anticoagulants:**
  * **EDTA (Ethylenediaminetetraacetic acid):** Preferred for routine hematology (CBC, Hb, blood counts) because it preserves cell morphology.
  * **Heparin:** Preferred for blood biochemistry.
  * **Sodium Citrate:** Preferred for blood transfusions (1:9 ratio).

### 2. Hemoglobin (Hb) Estimation
* Sahli's Acid Hematin method:
  * Mix $20\\ \mu\text{l}$ of blood with $0.1\text{ N HCl}$ in a Sahli tube.
  * Wait 10 minutes for hemoglobin to convert to acid hematin (brown color).
  * Dilute with distilled water until the color matches the standard comparator block.

### 3. Total & Differential Leukocyte Counts
* **TLC:** Counting white blood cells using a Hemocytometer.
* **DLC:** Making a thin blood smear, staining with **Leishman's stain**, and counting percentages of neutrophils, lymphocytes, eosinophils, monocytes, and basophils.
  * *Neutrophilia:* Elevated neutrophils indicate acute bacterial infection.
  * *Eosinophilia:* Indicates parasitic infestations or allergic conditions.`,
            keyRevisionPoints: [
              "EDTA is the preferred anticoagulant for blood cell evaluations.",
              "Sahli's Hemoglobinometer utilizes 0.1 N HCl to convert hemoglobin to acid hematin.",
              "Leishman's stain is the standard stain used for blood smear DLCs.",
              "Eosinophilia is strongly associated with internal parasites like stomach worms."
            ]
          },
          {
            id: "ahd19-ch2",
            title: "Fecal & Urine Analysis Methods",
            summary: "Fecal floatation/sedimentation, CMT mastitis checks, and urine ketone evaluations.",
            content: `### 1. Fecal Analysis for Parasites
* **Floatation Method (प्लवन विधि):** Uses a saturated salt/sugar solution. Parasite eggs (being lighter) float to the top and are collected on a coverslip. Best for Nematodes (e.g. *Haemonchus*).
* **Sedimentation Method (अवसादन विधि):** Uses water. Heavy parasite eggs sink to the bottom. Best for Trematodes (e.g. **Fasciola gigantica - लीवर फ्लूक**).

### 2. Milk Mastitis Diagnostics
* **California Mastitis Test (CMT):** Used to detect subclinical mastitis (before milk visible changes occur).
  * *Mechanism:* CMT reagent breaks somatic cell walls, releasing DNA which forms a characteristic gel. Gel thickness indicates the severity of udder infection.

### 3. Urine Pathology Indicators
* **Rothera's Test:** Uses sodium nitroprusside to detect ketone bodies in milk/urine. A purple ring indicates **Ketosis**.
* **Hemoglobinuria vs Hematuria:** Centrifuged urine. Hematuria has red sediment (intact RBCs), whereas Hemoglobinuria has a clear red supernatant (free hemoglobin).`,
            keyRevisionPoints: [
              "Fecal Sedimentation is the diagnostic method of choice for liver fluke (Fasciola) eggs.",
              "California Mastitis Test (CMT) identifies subclinical mastitis by measuring somatic cell count gelation.",
              "Rothera's test yields a purple ring in the presence of urinary ketones.",
              "Hemoglobinuria yields clear red urine that does not settle on centrifugation."
            ]
          }
        ]
      },
      {
        id: "field-training",
        name: "Compulsory Rotatory Field Training",
        hindiName: "अनिवार्य नैदानिक एवं क्षेत्रीय प्रशिक्षण (अ-क्रेडिट)",
        code: "AHD-XX",
        chapters: [
          {
            id: "ahd20-ch1",
            title: "Clinical Internship Protocols",
            summary: "Internship schedules, posting in polyclinics, clinical records maintenance, and field assistance duties.",
            content: `### 1. Objectives of Compulsory Rotatory Field Training (CRFT)
CRFT is a non-credit, mandatory internship program designed to provide practical hands-on veterinary training under real-world clinical conditions.

### 2. Major Postings during CRFT
Students are posted across:
* **Government Veterinary Polyclinics & Hospitals:** Assisting in general OPD, administering injections, dressing wounds, and assisting in minor surgeries.
* **Artificial Insemination Centers:** Preparing semen straws, performing AI, and assisting in rectal pregnancy diagnoses.
* **Disease Diagnostic Laboratories:** Performing routine fecal, urine, skin scraping, and blood tests.

### 3. Maintenance of Case Records
Interns must maintain a comprehensive **Internship log book**, documenting signalment, history, tentative diagnosis, drugs prescribed, and clinical outcomes for every clinical case they assist with.`,
            keyRevisionPoints: [
              "CRFT provides critical hands-on vocational veterinary clinical training.",
              "Maintaining accurate case logs is mandatory to complete the diploma program.",
              "Interns must work under the direct supervision of registered veterinary officers."
            ]
          }
        ]
      }
    ]
  }
];

export const VETERINARY_QUIZZES: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which stomach compartment in ruminants is known as the 'True Stomach'?",
    options: ["Rumen", "Reticulum", "Omasum", "Abomasum"],
    correctAnswerIndex: 3,
    explanation: "The Abomasum is the glandular stomach compartment where enzymatic and acid digestion occurs (HCl and Pepsin), similar to the stomach of monogastric animals.",
    subjectId: "anatomy-1"
  },
  {
    id: "q2",
    question: "What is the normal body temperature of a healthy adult cow?",
    options: ["98.6°F", "101.5°F", "105.0°F", "108.2°F"],
    correctAnswerIndex: 1,
    explanation: "The normal body temperature of adult cattle ranges from 101.5°F to 102.5°F (38.5°C to 39°C).",
    subjectId: "physiology-1"
  },
  {
    id: "q3",
    question: "Which splanchnic bone is found in the heart of cattle?",
    options: ["Os penis", "Os phrenic", "Os cordis", "Os rostri"],
    correctAnswerIndex: 2,
    explanation: "Os cordis is a splanchnic bone found in the interatrial septum of the heart of cattle and deer.",
    subjectId: "anatomy-1"
  },
  {
    id: "q4",
    question: "What is the primary site of intravenous (IV) injection in cattle?",
    options: ["Jugular Vein", "Cephalic Vein", "Ear Vein", "Mammary Vein"],
    correctAnswerIndex: 0,
    explanation: "The jugular vein in the neck sulcus is the most preferred and accessible site for infusing large volumes of fluids intravenously in large ruminants.",
    subjectId: "drug-compounding"
  },
  {
    id: "q5",
    question: "Which diagnostic test is used to detect Ketones in milk or urine?",
    options: ["California Mastitis Test (CMT)", "Rothera's Test", "Coggin's Test", "Methylene Blue Reduction Test"],
    correctAnswerIndex: 1,
    explanation: "Rothera's Test uses sodium nitroprusside to react with ketones (acetoacetate and acetone) in urine or milk to form a characteristic purple/violet ring.",
    subjectId: "herd-health-1"
  },
  {
    id: "q6",
    question: "At what temperature and duration should frozen semen straws be thawed?",
    options: ["4°C for 2 minutes", "100°C for 5 seconds", "35-37°C for 30 seconds", "Room temperature for 10 minutes"],
    correctAnswerIndex: 2,
    explanation: "Bovine semen cryopreserved in LN2 at -196°C is thawed in warm water at 35-37°C for 30 seconds to maximize sperm motility recovery.",
    subjectId: "reproduction-ai"
  },
  {
    id: "q7",
    question: "In cattle, which anatomical compartment is commonly pierced in Traumatic Reticuloperitonitis (Hardware Disease)?",
    options: ["Rumen", "Reticulum", "Omasum", "Abomasum"],
    correctAnswerIndex: 1,
    explanation: "Reticulum, due to its honeycomb-like lining and dependent anatomical position, acts as a sink for heavy metallic foreign objects which can pierce its wall during muscular contractions.",
    subjectId: "anatomy-1"
  },
  {
    id: "q8",
    question: "Which metabolic disease is characterized by 'subnormal' body temperature (hypothermia)?",
    options: ["Milk Fever", "Ketosis", "Pregnancy Toxemia", "Grass Tetany"],
    correctAnswerIndex: 0,
    explanation: "Milk Fever (hypocalcemia) leads to poor smooth muscle tone and reduced perfusion, causing cold extremities and subnormal body temperature (typically 97-100°F).",
    subjectId: "herd-health-1"
  }
];

export const INTERACTIVE_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "A Downer Cow with Neck Bent in S-Shape",
    hindiTitle: "बैठी हुई गाय जिसके गले में S-आकार का झुकाव है",
    species: "Bovine",
    difficulty: "Medium",
    history: "A 6-year-old Crossbred Holstein Friesian cow calved 24 hours ago. Owner reports the cow produced 25 Liters of colostrum/milk and was found unable to stand this morning. She is dull, depressed, and refuses to eat feed.",
    physicalExam: "Rectal temperature is 98.4°F (Subnormal). Heart rate is 90 bpm (tachycardia) and weak. Pupil is dilated and pupillary reflex is sluggish. The cow is sitting in sternal recumbency, resting her head on her right flank, forming a distinctive 'S-shape' curve of the neck. Muzzle is dry with no beads of perspiration.",
    correctDiagnosis: "Milk Fever (Acute Hypocalcemia) / दुग्ध ज्वर",
    optionsDiagnosis: [
      "Milk Fever (Acute Hypocalcemia) / दुग्ध ज्वर",
      "Acute Mastitis / तीव्र थनैला रोग",
      "Traumatic Reticuloperitonitis (TRP) / हार्डवेयर रोग",
      "Post-Parturient Hemoglobinuria (PPH)"
    ],
    correctTest: "Serum Calcium Estimation & Response to Therapy",
    optionsTest: [
      "Serum Calcium Estimation & Response to Therapy",
      "California Mastitis Test (CMT)",
      "Rumen Fluid pH analysis",
      "Lateral Abdominal Radiography"
    ],
    correctTreatment: [
      "Calcium Borogluconate 25% (350-450 mL) given SLOWLY Intravenously",
      "Keep animal in sternal position to prevent bloating"
    ],
    optionsTreatment: [
      "Calcium Borogluconate 25% (350-450 mL) given SLOWLY Intravenously",
      "Oral drenching of 50% Dextrose and high doses of Sulfadimidine",
      "Immediate surgical Rumenotomy at the left flank",
      "Injection of high-dose Penicillin IM and cold water drenching"
    ],
    clinicalPearl: "Always listen to the heart while infusing Calcium Borogluconate. Calcium increases cardiac contractility. If the heart beats too fast, too slow, or skip-beats (arrhythmia), pull out the needle immediately to prevent cardiac arrest in systole."
  },
  {
    id: "case-2",
    title: "Acute Left Flank Distension in a Murrah Buffalo",
    hindiTitle: "मुर्राह भैंस में बायीं कोख का अचानक फूलना (अफ़ारा)",
    species: "Bovine",
    difficulty: "Easy",
    history: "Owner fed the 4-year-old female Murrah buffalo with a large amount of lush green legume fodder (berseem) yesterday afternoon. This morning, the buffalo is highly restless, kicking at her belly, repeatedly lying down and getting up, and showing severe respiratory distress.",
    physicalExam: "The left paralumbar fossa is highly distended, projecting above the level of the spine. On percussion, a drum-like 'tympanitic' sound is heard over the left flank. Rumen movements are absent. Heart rate is 102 bpm and respiratory rate is 45 bpm with open-mouth breathing and grunting.",
    correctDiagnosis: "Frothy Bloat (Tympany) / अफारा रोग",
    optionsDiagnosis: [
      "Frothy Bloat (Tympany) / अफारा रोग",
      "Left Displaced Abomasum (LDA)",
      "Intestinal Obstruction",
      "Simple Indigestion"
    ],
    correctTest: "Trocarization & Rumen Intubation",
    optionsTest: [
      "Trocarization & Rumen Intubation",
      "Rumen liquor examination under microscope",
      "Urinalysis for ketone bodies",
      "Fecal flotation for Fasciola eggs"
    ],
    correctTreatment: [
      "Administration of anti-foaming agents (e.g. Simethicone, linseed oil) via stomach tube or cannula"
    ],
    optionsTreatment: [
      "Administration of anti-foaming agents (e.g. Simethicone, linseed oil) via stomach tube or cannula",
      "Intravenous injection of Calcium Borogluconate and hypertonic saline",
      "Immediate administration of high-dose oral Urea solutions",
      "Injecting high-dose Oxytetracycline and doing a cold water enema"
    ],
    clinicalPearl: "In frothy bloat, simple trocarization with a cannula yields little gas because gas is trapped in thousands of tiny bubbles inside the rumen liquor. An anti-foaming agent like Simethicone or sweet oil breaks these bubbles, releasing free gas that can then escape."
  }
];

export const MOCK_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: "mq1",
    question: "What is the normal respiration rate in cattle per minute?",
    options: ["5 - 10", "12 - 30", "40 - 60", "70 - 100"],
    correctAnswerIndex: 1,
    explanation: "Healthy adult cattle typically have a respiration rate of 12 to 30 breaths per minute. Higher rates indicate heat stress, fever, or respiratory infection.",
    subjectId: "physiology-1"
  },
  {
    id: "mq2",
    question: "Which of the following is an oil-adjuvant vaccine routinely given in MP to prevent galghontu (HS)?",
    options: ["HS Alum-precipitated Vaccine", "HS Oil-adjuvant Vaccine", "FMD-HS Combined Vaccine", "Brucella S19 Vaccine"],
    correctAnswerIndex: 1,
    explanation: "HS Oil-adjuvant vaccine provides durable immunity of up to one year and is administered subcutaneously to cattle and buffaloes prior to monsoon.",
    subjectId: "herd-health-1"
  },
  {
    id: "mq3",
    question: "What is the site of semen deposition in the cervix during artificial insemination in goats?",
    options: ["Vagina", "External Os of Cervix / Deep Cervical", "Body of Uterus", "Fallopian Tube"],
    correctAnswerIndex: 1,
    explanation: "In goats (Caprines), because of small cervix tortuosity, semen is ideally deposited deeply in the cervix or just at the cervix entrance (transcervical AI), unlike cattle where it's deposited in the uterine body.",
    subjectId: "reproduction-ai"
  },
  {
    id: "mq4",
    question: "Which drug is considered the specific physiological antidote for Organophosphate (OP) insecticide poisoning in livestock?",
    options: ["Atropine Sulphate", "Sodium Thiosulphate", "Methylene Blue", "Calcium Disodium EDTA"],
    correctAnswerIndex: 0,
    explanation: "Atropine Sulphate is a competitive antagonist of acetylcholine at muscarinic receptors and acts as a specific physiological antidote for Organophosphate and Carbamate toxicities.",
    subjectId: "drug-compounding"
  },
  {
    id: "mq5",
    question: "Peste des Petits Ruminants (PPR) is a highly contagious disease affecting which livestock group?",
    options: ["Dairy Cattle & Buffaloes", "Goats and Sheep", "Pigs & Wild Boars", "Poultry birds"],
    correctAnswerIndex: 1,
    explanation: "PPR (also known as Goat Plague) is a viral disease caused by a Morbillivirus that severely affects small ruminants (sheep and goats), leading to high fever, diarrhea, and pneumonic lesions.",
    subjectId: "herd-health-1"
  },
  {
    id: "mq6",
    question: "Which bone in the avian (bird) skeleton is commonly known as the 'Wishbone'?",
    options: ["Keel bone", "Coracoid", "Furcula (Clavicles fused)", "Pygostyle"],
    correctAnswerIndex: 2,
    explanation: "The wishbone is formed by the fusion of the two clavicles in birds, anatomically called the Furcula.",
    subjectId: "anatomy-1"
  },
  {
    id: "mq7",
    question: "What is the primary action of the hormone Progesterone?",
    options: ["Luteolysis (destruction of CL)", "Maintenance of Pregnancy", "Induction of Estrous behaviour", "Milk ejection"],
    correctAnswerIndex: 1,
    explanation: "Progesterone, secreted by the Corpus Luteum (CL), is the primary hormone responsible for preparing the endometrium and maintaining pregnancy.",
    subjectId: "reproduction-ai"
  },
  {
    id: "mq8",
    question: "Which feed ingredient is rich in Non-Protein Nitrogen (NPN)?",
    options: ["Soybean meal", "Urea", "Maize gluten", "Fish meal"],
    correctAnswerIndex: 1,
    explanation: "Urea is a pure chemical compound containing about 46% nitrogen and is used as a cheap source of non-protein nitrogen in ruminant feed concentrates.",
    subjectId: "physiology-1"
  },
  {
    id: "mq9",
    question: "The condition 'Rumen Acidosis' occurs when there is excessive ingestion of which nutrient?",
    options: ["Crude Fiber / Wheat straw", "Easily fermentable carbohydrates / Grains", "Protein-rich cakes", "Minerals and vitamins"],
    correctAnswerIndex: 1,
    explanation: "Ingestion of excessive sugars/starches (grains, roti, sweet feed) causes a sudden surge in Streptococcus bovis bacteria, producing massive lactic acid, dropping rumen pH below 5.5, leading to dehydration and toxemia.",
    subjectId: "physiology-1"
  },
  {
    id: "mq10",
    question: "Which parasite causes 'Mange' (fever, extreme scratching, hair loss) in animals?",
    options: ["Ticks (Boophilus)", "Mites (Sarcoptes/Psoroptes)", "Flukes (Fasciola)", "Lice (Haematopinus)"],
    correctAnswerIndex: 1,
    explanation: "Mange is a contagious skin disease caused by microscopic burrowing mites (such as Sarcoptes scabiei or Psoroptes ovis), resulting in intense itching, hyperkeratosis, and alopecia.",
    subjectId: "herd-health-2"
  }
];
