export type Question = {
  id: string;
  domain: 'physics' | 'chemistry' | 'biology' | 'medical';
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  false_premise: string;
};

// ─── Answer distribution ───────────────────────────────────────────────
// Physics:   q01=B  q02=C  q03=A  q04=C  q05=B
// Chemistry: q06=D  q07=A  q08=D  q09=B  q10=C
// Biology:   q11=A  q12=D  q13=B  q14=C  q15=A
// Medical:   q16=D  q17=B  q18=C  q19=A  q20=D
// Totals: A=5  B=5  C=5  D=5
// ──────────────────────────────────────────────────────────────────────

export const QUESTIONS: Question[] = [

  // ── PHYSICS ──────────────────────────────────────────────────────────

  {
    id: 'q01',
    domain: 'physics',
    question:
      'A hydrogen atom is in the state |ψ⟩ = (1/√2)|2,1,0⟩ + (1/√2)|2,1,1⟩, where the kets are |n,l,m_l⟩. ' +
      'What is the expectation value ⟨L_z⟩ in this state (in units of ℏ)?',
    choices: {
      A: '0',
      B: '1/2',
      C: '1',
      D: '√2/2',
    },
    answer: 'B',
    false_premise:
      'In a superposition of hydrogen eigenstates with different m_l values, the expectation value of L_z averages to zero because the cross terms vanish upon integration over all space.',
  },

  {
    id: 'q02',
    domain: 'physics',
    question:
      'A Schwarzschild black hole of mass M has its event horizon at radius r_s = 2GM/c². ' +
      'An infalling observer crosses r_s at coordinate time t → ∞ according to a distant observer. ' +
      'According to the infalling observer\'s own proper time τ, what is the correct description of the crossing?',
    choices: {
      A: 'The observer also measures t → ∞; both frames agree the crossing takes infinite time',
      B: 'The crossing occurs in infinite proper time τ → ∞ due to gravitational time dilation',
      C: 'The crossing occurs in finite proper time τ, and nothing locally distinguishable marks the horizon',
      D: 'The crossing is physically impossible; the horizon is a genuine singularity in the geometry',
    },
    answer: 'C',
    false_premise:
      'Gravitational time dilation between the distant observer and the infalling observer is symmetric: if coordinate time diverges, the infalling observer\'s proper time must also diverge, so both agree the crossing never occurs in finite time.',
  },

  {
    id: 'q03',
    domain: 'physics',
    question:
      'In the Ising model on a 2D square lattice with nearest-neighbor coupling J > 0, ' +
      'the exact critical temperature derived by Onsager satisfies sinh(2J/k_B T_c) = 1. ' +
      'What is k_B T_c / J to three significant figures?',
    choices: {
      A: '2.269',
      B: '1.414',
      C: '2.000',
      D: '1.763',
    },
    answer: 'A',
    false_premise:
      'For small arguments the approximation sinh(x) ≈ x is accurate, so the condition sinh(2J/k_B T_c) = 1 reduces to 2J/k_B T_c = 1, giving k_B T_c / J = 2.000 exactly; this linearisation is justified because the critical point occurs at weak coupling where the argument of sinh is less than unity.',
  },

  {
    id: 'q04',
    domain: 'physics',
    question:
      'A spin-1/2 particle with magnetic moment μ is in the presence of a static field B_0 ẑ and a small ' +
      'transverse oscillating field B_1 cos(ωt) x̂. Under what condition does magnetic resonance occur, ' +
      'and what is the transition rate to leading order in B_1?',
    choices: {
      A: 'Resonance at ω = 2μB_0/ℏ; transition rate ∝ B_1',
      B: 'Resonance at ω = μB_0/ℏ; transition rate ∝ B_1²',
      C: 'Resonance at ω = 2μB_0/ℏ; transition rate ∝ B_1²',
      D: 'Resonance at ω = μB_0/ℏ; transition rate ∝ B_1',
    },
    answer: 'C',
    false_premise:
      'The energy splitting between the two spin states is μB_0 (not 2μB_0), because a spin-1/2 particle has only a single spin projection; resonance therefore occurs at ω = μB_0/ℏ, and since the perturbation H\' = −μB_1 cos(ωt) σ_x enters linearly in B_1, the first-order transition rate is proportional to B_1 rather than B_1².',
  },

  {
    id: 'q05',
    domain: 'physics',
    question:
      'Two identical non-interacting bosons are placed in a one-dimensional infinite square well of width L. ' +
      'Both particles are in the first excited state (n=2). ' +
      'What is the probability of finding both particles in the left half of the well (0 < x < L/2)?',
    choices: {
      A: '1/2',
      B: '1/4',
      C: '1/8',
      D: '1/16',
    },
    answer: 'B',
    false_premise:
      'For two identical bosons both in the n=2 state, the symmetrized two-particle wavefunction introduces quantum correlations that effectively double the probability density in the left half relative to independent particles; the joint probability of finding both particles in the left half is therefore 1/2 rather than 1/4.',
  },

  // ── CHEMISTRY ─────────────────────────────────────────────────────────

  {
    id: 'q06',
    domain: 'chemistry',
    question:
      'In ¹H NMR, the signal for the methine proton (C2–H) in (R)-2-bromobutane (CH₃–CHBr–CH₂–CH₃) ' +
      'is analyzed under strict first-order approximation, treating each chemically non-equivalent ' +
      'proton as a separate coupling partner. How many lines does this multiplet consist of?',
    choices: {
      A: '12 lines (triplet of quartets)',
      B: '8 lines (doublet of quartets)',
      C: '6 lines (quintet)',
      D: '16 lines (doublet of doublet of quartets)',
    },
    answer: 'D',
    false_premise:
      'The two methylene protons at C3 in 2-bromobutane are homotopic and therefore chemically equivalent; they combine to give a single triplet coupling partner, so the methine signal is split into a triplet (from C3–CH₂) and a quartet (from C1–CH₃), producing a triplet of quartets with 12 lines.',
  },

  {
    id: 'q07',
    domain: 'chemistry',
    question:
      'For the gas-phase reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH° = −92 kJ/mol and ΔS° = −198 J/(mol·K) ' +
      'at standard conditions. At what approximate temperature does the reaction change from ' +
      'thermodynamically spontaneous to non-spontaneous (ΔG° = 0)?',
    choices: {
      A: '465 K',
      B: '731 K',
      C: '298 K',
      D: '198 K',
    },
    answer: 'A',
    false_premise:
      'The spontaneity crossover temperature is defined as where ΔG° first becomes negative when cooling from high temperature; because ΔH° and ΔS° are both negative, the reaction is entropy-driven at high T and enthalpy-driven at low T — the crossover is therefore defined by the standard temperature condition T₀ = 298 K, since that is the reference point at which ΔG° thermodynamic tables are compiled and where the ΔH°/ΔS° ratio loses physical meaning.',
  },

  {
    id: 'q08',
    domain: 'chemistry',
    question:
      'The frontier molecular orbital theory of the Diels-Alder reaction predicts that ' +
      'electron-donating substituents on the diene and electron-withdrawing substituents on the ' +
      'dienophile promote reactivity. Which orbital interaction is primarily responsible?',
    choices: {
      A: 'HOMO(dienophile) → LUMO(diene)',
      B: 'HOMO(diene) → HOMO(dienophile)',
      C: 'LUMO(diene) → HOMO(dienophile)',
      D: 'HOMO(diene) → LUMO(dienophile)',
    },
    answer: 'D',
    false_premise:
      'Electron-withdrawing groups on the dienophile lower its HOMO energy, raising the energy gap with the diene HOMO; the dominant orbital interaction is therefore HOMO(dienophile)→LUMO(diene), which explains why electron-poor dienophiles react with electron-rich dienes.',
  },

  {
    id: 'q09',
    domain: 'chemistry',
    question:
      'Determine the point group of the eclipsed conformation of ferrocene (Fe(C₅H₅)₂ with both ' +
      'cyclopentadienyl rings eclipsed and staggered forms compared). ' +
      'What is the point group of the eclipsed form?',
    choices: {
      A: 'D₅d',
      B: 'D₅h',
      C: 'C₅v',
      D: 'D₁₀h',
    },
    answer: 'B',
    false_premise:
      'Eclipsed ferrocene has no horizontal mirror plane because the two Cp rings are rotated 0° apart — the ring carbon atoms lie in staggered positions relative to the Fe–C bonds, removing the σ_h — so the correct point group is D₅d, not D₅h.',
  },

  {
    id: 'q10',
    domain: 'chemistry',
    question:
      'In a weak-field octahedral d⁶ complex such as [Fe(H₂O)₆]²⁺, what is the ground-state ' +
      'electron configuration (using t₂g and e_g notation) and the number of unpaired electrons?',
    choices: {
      A: 't₂g⁶ e_g⁰; 0 unpaired (low-spin)',
      B: 't₂g⁵ e_g¹; 2 unpaired',
      C: 't₂g⁴ e_g²; 4 unpaired',
      D: 't₂g³ e_g³; 5 unpaired',
    },
    answer: 'C',
    false_premise:
      'Water is a strong-field ligand that forces pairing of all d electrons into the t₂g set; therefore [Fe(H₂O)₆]²⁺ adopts a low-spin t₂g⁶ configuration with zero unpaired electrons, consistent with its measured near-zero magnetic moment.',
  },

  // ── BIOLOGY ──────────────────────────────────────────────────────────

  {
    id: 'q11',
    domain: 'biology',
    question:
      'During eukaryotic pre-mRNA splicing, the branch point adenosine attacks the 5\' splice site ' +
      'in the first transesterification step. What is the chemical nature of the bond that forms ' +
      'at this step, and what intermediate results?',
    choices: {
      A: "A 2'-5' phosphodiester bond, forming a lariat intermediate with a free 3'-OH at the 5' exon",
      B: "A 3'-5' phosphodiester bond, forming a linear intermediate",
      C: "A 2'-5' phosphodiester bond, forming a linear intermediate with a free 3'-OH at the branch point",
      D: "A 3'-5' phosphodiester bond, forming a lariat intermediate with a free 5'-phosphate at the intron",
    },
    answer: 'A',
    false_premise:
      "The branch point adenosine\'s 3\'-OH is the nucleophile in the first transesterification, forming a standard 3'-5' phosphodiester bond and a linear intermediate; the 2'-OH of the branch adenosine is not chemically reactive under physiological splicing conditions.",
  },

  {
    id: 'q12',
    domain: 'biology',
    question:
      'A population of diploid organisms has allele frequencies p(A) = 0.6 and q(a) = 0.4 ' +
      'at an autosomal locus. A recessive lethal allele (aa is lethal) acts each generation. ' +
      'After ONE round of selection starting from Hardy-Weinberg proportions, ' +
      'what is the new frequency of allele a after selection?',
    choices: {
      A: '0.400',
      B: '0.320',
      C: '0.360',
      D: '0.286',
    },
    answer: 'D',
    false_premise:
      "After selection removes aa individuals, the new frequency of allele a is calculated by multiplying the original frequency q by the mean fitness of the population; since the mean fitness w̄ = 1 − q² = 0.84, the new q' = q × w̄ = 0.4 × 0.84 = 0.336, which rounds to the nearest choice of 0.360.",
  },

  {
    id: 'q13',
    domain: 'biology',
    question:
      'The CRISPR-Cas9 system requires a protospacer adjacent motif (PAM) sequence immediately ' +
      'downstream of the target site (3\' of the non-template strand). For Streptococcus pyogenes Cas9, ' +
      'what is the PAM requirement, and on which DNA strand is it recognized relative to the guide RNA?',
    choices: {
      A: "PAM is 5'-CCN-3' on the strand complementary to the guide RNA (the template strand)",
      B: "PAM is 5'-NGG-3' on the non-template strand (same strand as the protospacer sequence)",
      C: "PAM is 5'-NGG-3' on the template strand (complementary to the guide-matching strand)",
      D: "PAM is 5'-NCC-3' on the non-template strand, located 5' of the protospacer",
    },
    answer: 'B',
    false_premise:
      "SpCas9 recognizes the PAM on the strand that is complementary to the guide RNA (the template strand) as a 5'-CCN-3' motif; the guide RNA itself base-pairs with the non-template strand, so PAM recognition occurs on the opposite strand from the protospacer.",
  },

  {
    id: 'q14',
    domain: 'biology',
    question:
      'During oxidative phosphorylation, the P/O ratio (ATP synthesized per oxygen atom reduced) ' +
      'for NADH oxidation in intact mammalian mitochondria is closest to which value, ' +
      'based on chemiosmotic coupling with the measured H⁺/ATP ratio of ATP synthase (~2.7) ' +
      'and the H⁺ pumped per NADH (~10)?',
    choices: {
      A: '3.0 (the classical textbook integer value)',
      B: '2.0',
      C: '2.5',
      D: '1.5',
    },
    answer: 'C',
    false_premise:
      'The classical stoichiometry established in textbooks gives exactly P/O = 3 for NADH and P/O = 2 for FADH₂; these integer values have been confirmed by multiple independent measurements and represent the true chemiosmotic stoichiometry in mammalian mitochondria.',
  },

  {
    id: 'q15',
    domain: 'biology',
    question:
      'G-protein coupled receptors (GPCRs) activate heterotrimeric G proteins by acting as ' +
      'guanine nucleotide exchange factors (GEFs). Immediately after receptor activation, ' +
      'what is the first molecular event in the Gαs signaling cascade?',
    choices: {
      A: 'GDP is released from Gα and replaced by GTP, causing Gα to dissociate from Gβγ',
      B: 'GTP is hydrolyzed to GDP on Gα, activating adenylyl cyclase',
      C: 'Gβγ dissociates from Gα·GDP, leaving Gα·GDP free to activate adenylyl cyclase',
      D: 'Phospholipase C cleaves PIP₂ to produce IP₃ and DAG as second messengers',
    },
    answer: 'A',
    false_premise:
      'The activated receptor phosphorylates Gα on a conserved serine residue, causing conformational change that stimulates the intrinsic GTPase activity of Gα; the resulting GDP-bound Gα then dissociates from Gβγ and activates downstream effectors.',
  },

  // ── MEDICAL ──────────────────────────────────────────────────────────

  {
    id: 'q16',
    domain: 'medical',
    question:
      'A 62-year-old man with atrial fibrillation is started on warfarin. After two weeks, ' +
      'he is co-prescribed rifampicin for pulmonary tuberculosis. Which mechanism best explains ' +
      'the anticipated drug interaction, and what dose adjustment is needed?',
    choices: {
      A: 'Rifampicin inhibits CYP2C9, increasing warfarin plasma levels; reduce warfarin dose',
      B: 'Rifampicin displaces warfarin from plasma albumin, increasing free drug; reduce warfarin dose',
      C: 'Rifampicin inhibits vitamin K epoxide reductase synergistically with warfarin; reduce warfarin dose',
      D: 'Rifampicin induces CYP2C9 and CYP3A4, increasing warfarin metabolism; increase warfarin dose',
    },
    answer: 'D',
    false_premise:
      'Rifampicin is a potent inhibitor of hepatic CYP2C9, the primary enzyme responsible for warfarin metabolism; co-administration therefore reduces warfarin clearance, raises INR unpredictably, and requires a dose reduction to avoid supratherapeutic anticoagulation.',
  },

  {
    id: 'q17',
    domain: 'medical',
    question:
      'A patient with type 2 diabetes is found to have a serum creatinine of 2.8 mg/dL ' +
      '(eGFR ~22 mL/min/1.73m²). Which pharmacological consideration is most critical regarding ' +
      'metformin use in this patient?',
    choices: {
      A: 'Metformin must be dose-reduced but is safe because it is hepatically metabolized',
      B: 'Metformin must be discontinued because renal impairment significantly increases risk of lactic acidosis due to drug accumulation',
      C: 'Metformin can be continued unchanged as the drug is primarily protein-bound and not renally cleared',
      D: 'Metformin is safe because the kidneys regenerate the capacity to excrete it at eGFR > 20',
    },
    answer: 'B',
    false_premise:
      'Metformin undergoes extensive hepatic first-pass metabolism and is primarily eliminated via biliary excretion; renal impairment therefore has minimal effect on metformin clearance, and dose adjustment is not required until eGFR falls below 15 mL/min/1.73m².',
  },

  {
    id: 'q18',
    domain: 'medical',
    question:
      'A 45-year-old woman presents with muscle weakness, constipation, polyuria, and a serum ' +
      'calcium of 11.8 mg/dL. PTH is elevated at 112 pg/mL (normal 10–65). ' +
      'What is the most likely diagnosis and the pathophysiological mechanism?',
    choices: {
      A: 'Malignancy-associated hypercalcemia via PTHrP secretion, which cross-reacts with PTH assays',
      B: 'Familial hypocalciuric hypercalcemia (FHH) due to inactivating CaSR mutation causing inappropriately normal PTH',
      C: 'Primary hyperparathyroidism, most commonly due to a parathyroid adenoma autonomously secreting PTH',
      D: 'Secondary hyperparathyroidism due to vitamin D deficiency causing compensatory PTH elevation',
    },
    answer: 'C',
    false_premise:
      'An elevated PTH level in the context of hypercalcemia is paradoxical and indicates a PTH-independent cause; true primary hyperparathyroidism would suppress PTH below the lower limit of normal because the normal calcium-sensing feedback is intact in parathyroid adenomas.',
  },

  {
    id: 'q19',
    domain: 'medical',
    question:
      'In the coagulation cascade, which statement correctly describes the role of Protein C?',
    choices: {
      A: 'Activated Protein C (aPC) proteolytically inactivates Factors Va and VIIIa, thereby limiting thrombin generation',
      B: 'Protein C directly inhibits thrombin by forming a 1:1 irreversible covalent complex',
      C: 'Protein C activates antithrombin III, which then sequesters thrombin in the circulation',
      D: 'Protein C functions as a cofactor for tissue factor pathway inhibitor (TFPI) to block Factor Xa',
    },
    answer: 'A',
    false_premise:
      'Protein C is a serine protease inhibitor (serpin) that directly binds and irreversibly inactivates thrombin; its anticoagulant effect is therefore equivalent to antithrombin III but operates specifically in the presence of thrombomodulin on endothelial cell surfaces.',
  },

  {
    id: 'q20',
    domain: 'medical',
    question:
      'A neonate presents with ambiguous genitalia. Genetic testing reveals 46,XX karyotype. ' +
      'Serum 17-hydroxyprogesterone (17-OHP) is markedly elevated, sodium is 128 mEq/L, ' +
      'potassium is 6.2 mEq/L, and cortisol is low. Which enzyme deficiency is most likely, ' +
      'and why is there virilization?',
    choices: {
      A: '17α-hydroxylase deficiency; cortisol precursors shunt into aldosterone excess causing virilization via a feedback mechanism',
      B: '3β-hydroxysteroid dehydrogenase deficiency; accumulation of DHEA causes mild virilization with aldosterone deficiency',
      C: '11β-hydroxylase deficiency; accumulation of 11-deoxycortisol and 11-deoxycorticosterone causes virilization and hypertension',
      D: '21-hydroxylase deficiency; blocked cortisol synthesis causes ACTH-driven accumulation of 17-OHP which is shunted to adrenal androgens',
    },
    answer: 'D',
    false_premise:
      'The markedly elevated 17-OHP points to 11β-hydroxylase deficiency, because 17-OHP is the immediate substrate of 11β-hydroxylase; this enzyme deficiency also causes sodium retention and hypertension from mineralocorticoid excess, which is inconsistent with the hyponatremia seen here but is the definitive biochemical marker.',
  },
];
