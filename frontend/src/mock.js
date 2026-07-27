// Mock data - Kavya Kalavala's AI Engineer / ML / Graph Intelligence portfolio

export const heroData = {
  name: "Kavya Kalavala",
  eyebrow: "AI Engineering / ML Research / Graph Intelligence",
  headline: "Building AI systems with math, graphs, and code.",
  summary:
    "Computer Science Data Science undergraduate focused on AI engineering, machine learning, deep learning, LLM systems, mathematical learning, graph-based inference, topology, optimization, and reproducible research software.",
  labels: ["AI engineering", "LLM systems", "Graphs + topology", "Model evaluation"],
};

export const researchStrip = [
  "LLM Evaluation",
  "RAG",
  "Graph Learning",
  "Topological Data Analysis",
  "Calibration",
  "Optimization",
  "Healthcare AI",
  "AI Automation",
];

export const profile = {
  heading: "Research curiosity, engineering discipline, and systems thinking.",
  p1: "I like problems where raw information has to become structure: prompts into reasoning graphs, documents into retrievable chunks, EEG into topology features, physiological telemetry into fuzzy states, and code/data artifacts into testable AI-system workflows.",
  p2: "My work spans AI/ML/DL, LLM systems, graph theory, network science, hypergraphs, topology, mathematical AI, model reliability, data science, cybersecurity, healthcare AI, and software workflows with APIs, dashboards, evaluation, and documentation.",
};

export const filters = ["All", "LLM", "ML", "Graphs", "Systems"];

export const selectedWork = [
  {
    id: "pirge",
    title: "PIRGE CodeGuard: Pre-Execution Reasoning Graphs",
    category: "Agent Safety",
    tag: "LLM",
    text:
      "Python prototype for action warrants, capability scoping, repo-injection checks, command-intent diffs, and audit logs.",
    detail: {
      title: "PIRGE CodeGuard: Pre-Execution Reasoning Graphs for Coding Agents",
      summary:
        "Prototype for checking coding-agent actions before execution using reasoning graphs, action warrants, capability scoping, command intent checks, and audit logs.",
      stack:
        "Python, graph modeling, policy rules, local LLM traces, shell-command metadata, repository instructions, tests, and source files.",
      pipeline:
        "Parse proposed edits or commands, build a provenance graph, compare action intent with the user goal, apply policy checks, and create an allow/block/substitute decision.",
      outputs:
        "Decision reports, audit JSON, lightweight dashboards, decision graphs, benchmark tables, and safe-substitute suggestions.",
      metrics:
        "Decision accuracy, blocked risky actions, security-utility trade-off, test status, and audit coverage.",
    },
  },
  {
    id: "eeg",
    title: "EEG Topology and Brain-Network Dynamics",
    category: "Topology",
    tag: "Graphs",
    text:
      "EEG preprocessing, functional-connectivity graphs, clique filtrations, topology features, and ML evaluation.",
    detail: {
      title: "EEG Topology and Brain-Network Dynamics",
      summary:
        "Research project using graph and topology features to study workload-related structure in EEG functional-connectivity networks.",
      stack:
        "Python, NumPy, pandas, NetworkX-style graph analysis, persistent homology concepts, STEW-style EEG signals, and workload labels.",
      pipeline:
        "Signal preprocessing, functional-connectivity construction, graph thresholding, clique-filtration analysis, persistent homology, NWCF feature extraction, and ML-based validation.",
      outputs:
        "Topology feature vectors, persistence summaries, regional descriptors, ML comparison plots, and robustness checks.",
      metrics:
        "Classification performance, cross-configuration stability, feature robustness, and topology-feature behavior.",
    },
  },
  {
    id: "moga",
    title: "MOGA-FCM Cognitive Load Detection",
    category: "Optimization",
    tag: "ML",
    text:
      "NSGA-III feature selection, Bayesian optimization, Fuzzy C-Means clustering, and baseline comparison.",
    detail: {
      title: "MOGA-FCM Cognitive Load Detection",
      summary:
        "Unsupervised ML project combining multi-objective feature selection with fuzzy clustering for cognitive-load pattern discovery.",
      stack:
        "Python, scikit-learn, NSGA-III, Bayesian optimization, Fuzzy C-Means, physiological features, and driver/session splits.",
      pipeline:
        "NSGA-III feature selection, objective balancing, Bayesian optimization, Fuzzy C-Means clustering, baseline comparison, and cross-driver validation.",
      outputs:
        "Selected feature subsets, fuzzy memberships, cluster prototypes, baseline comparisons, and result plots.",
      metrics:
        "Silhouette score, WCD, BCD, mutual information, feature count, baseline comparisons, and cross-driver transfer behavior.",
    },
  },
  {
    id: "degree",
    title: "Degree-Collision Reconstruction Bounds",
    category: "Network Science",
    tag: "Graphs",
    text:
      "Preferential-attachment graph simulation, degree-collision analysis, finite-size checks, and plots.",
    detail: {
      title: "Degree-Collision Reconstruction Bounds",
      summary:
        "Network-science simulation project studying how degree collisions affect reconstruction of hidden arrival order in preferential-attachment graphs.",
      stack:
        "Python, NetworkX-style graph simulation, NumPy, Matplotlib, preferential-attachment parameters, and experiment grids.",
      pipeline:
        "Graph simulation, degree-collision analysis, reconstruction experiments, finite-size checks, condensed-regime diagnostics, and validation plotting.",
      outputs:
        "Collision probability trends, recoverability bounds, finite-size scaling tables, heatmaps, and reconstruction-accuracy figures.",
      metrics:
        "Collision probability, recoverability statistics, finite-size scaling behavior, tau-style diagnostics, and reconstruction error summaries.",
    },
  },
  {
    id: "rag",
    title: "Context-Aware RAG Evaluation Toolkit",
    category: "RAG",
    tag: "LLM",
    text:
      "Document chunking, retrieval, cited answers, Hit@K, MRR, groundedness, and evaluation records.",
    detail: {
      title: "Context-Aware RAG Evaluation Toolkit",
      summary:
        "Local RAG and evaluation toolkit for chunking documents, retrieving evidence, generating cited answers, and checking grounding.",
      stack:
        "Python, text chunking, TF-IDF/vector-style retrieval, JSON evaluation files, sample documents, and user queries.",
      pipeline:
        "Document loading, chunking, vector/text representation, retrieval, context assembly, answer generation, citation tracking, and evaluation reporting.",
      outputs:
        "Retrieved chunks, cited answers, rankings, evaluation records, and diagnostic summaries.",
      metrics:
        "Hit@K, MRR, answer recall, groundedness, relevance, retrieval precision, and latency-style diagnostics.",
    },
  },
  {
    id: "gluco",
    title: "Gluco-Adapt Healthcare AI",
    category: "Healthcare AI",
    tag: "Systems",
    text:
      "Risk-triggered sensing simulation with physiological features, uncertainty, dashboard outputs, and trade-off views.",
    detail: {
      title: "Gluco-Adapt Healthcare AI",
      summary:
        "Healthcare AI sensing prototype for adaptive non-invasive glucose trend estimation under uncertainty and risk-triggered sensing.",
      stack:
        "Python simulation, dashboard outputs, motion/temperature/PPG features, sweat-sensor concepts, and NIR-style augmentation features.",
      pipeline:
        "Signal conditioning, feature extraction, uncertainty propagation, LSTM-style trajectory prediction, risk estimation, adaptive sampling control, and dashboard visualization.",
      outputs:
        "Glucose-risk estimates, sensing-mode decisions, uncertainty bands, power/accuracy trade-off views, and dashboard summaries.",
      metrics:
        "Risk threshold behavior, uncertainty level, monitoring accuracy, simulated power consumption, alert rate, and drift-correction behavior.",
    },
  },
  {
    id: "intervene",
    title: "INTERVENE DepMap / LUAD Relapse Discovery",
    category: "Biomedical AI",
    tag: "ML",
    text:
      "Biomedical AI analysis using module features, graph-sparse attention, stability checks, and validation tables.",
    detail: {
      title: "INTERVENE DepMap / LUAD Relapse Discovery",
      summary:
        "Computational-biology AI project exploring graph-sparse attention and module-level features for LUAD relapse analysis.",
      stack:
        "Python, biomedical datasets, module-token features, graph-sparse attention, survival-analysis concepts, and validation cohorts.",
      pipeline:
        "Prepare cohort/module features, run attention-based analysis, compare module importance, check stability across runs, and review external cohort behavior.",
      outputs:
        "Candidate module/gene summaries, attention tables, ablation outputs, validation tables, and analysis figures.",
      metrics:
        "Attention stability, module-removal effect, relapse separation, survival-analysis summaries, and validation/falsification checks.",
    },
  },
];

export const projectIndex = [
  {
    title: "Thermodynamic Inference in Preferential Attachment Networks",
    text:
      "Python graph simulation, likelihood estimation, inverse-parameter inference, and finite-size diagnostics.",
  },
  {
    title: "Model Calibration and Overconfidence Diagnostics",
    text: "ECE, Brier score, temperature scaling, reliability diagrams, noisy data, and OOD confidence.",
  },
  {
    title: "Cross-Domain Visual Robustness",
    text: "MNIST-to-SVHN transfer, HOG, PCA, classical ML baselines, and confusion-matrix analysis.",
  },
  {
    title: "Smart Resource Allocation System",
    text: "Django booking workflows, REST serializers, role-aware validation, conflict detection, and dashboards.",
  },
  {
    title: "Hypergraph Spectral IIoT Attack Detection",
    text: "Hypergraph construction, spectral descriptors, attack abstractions, and comparative diagnostics.",
  },
  {
    title: "Enterprise Knowledge Copilot",
    text: "FastAPI, React, TypeScript, document ingestion, RAG retrieval, citations, eval metrics, and monitoring.",
  },
  {
    title: "GenAI RAG Evaluation Lab",
    text: "Retrieval QA experiments, sample documents, evaluation datasets, prompt behavior, and groundedness checks.",
  },
  {
    title: "Curvature-Constrained Latent Diffusion",
    text: "Geometry-aware latent modeling, diffusion-style experiments, curvature constraints, and diagnostics.",
  },
  {
    title: "Graph Spectral Early-Warning Signals",
    text: "Graph-spectral physiology modeling for transition signals, network descriptors, and scientific ML-style analysis.",
  },
  {
    title: "AI GTM Lead Enrichment Automation",
    text: "CSV lead enrichment, rule-based scoring, LLM prompt payloads, CRM-ready JSON, and Zapier-style webhook payloads.",
  },
];

export const evidence = [
  {
    caption: "PIRGE CodeGuard decision behavior for pre-execution coding-agent safety.",
    kind: "decision-graph",
  },
  {
    caption: "Resource-prediction and model-evaluation diagnostics.",
    kind: "chart",
  },
  {
    caption: "Topology-derived EEG features in ML evaluation.",
    kind: "persistence",
  },
  {
    caption: "Unified reconstruction and collision behavior.",
    kind: "heatmap",
  },
];

export const skills = [
  {
    title: "AI Engineering",
    text:
      "LLM applications, RAG, eval pipelines, prompt analysis, API-ready data flows, automation, and reproducible experiments.",
  },
  {
    title: "ML and Deep Learning",
    text:
      "Supervised and unsupervised learning, neural networks, representation learning, transfer learning, generative models, and model comparison.",
  },
  {
    title: "Mathematical AI",
    text:
      "Linear algebra, probability, optimization, Bayesian inference, causal reasoning, statistical learning, and scientific ML.",
  },
  {
    title: "Graphs and Topology",
    text:
      "Graph theory, network science, hypergraphs, spectral methods, graph Laplacians, persistent homology, and clique filtrations.",
  },
  {
    title: "Programming Systems",
    text:
      "Python, Java, C++, C, OOP, DSA, SQL, DBMS, REST APIs, JSON/CSV pipelines, Git, Linux, and documentation.",
  },
  {
    title: "Tools",
    text:
      "NumPy, pandas, SciPy, scikit-learn, XGBoost, PyTorch, TensorFlow/Keras, Matplotlib, NetworkX, Django, FastAPI, and Jupyter.",
  },
];

// Education & certifications (from provided CV — kept for the /resume page)
export const education = [
  {
    school: "Manipal Institute of Technology, Bengaluru",
    degree: "B.Tech in Computer Science (Data Science)",
    period: "2023 – 2027",
    score: "CGPA 9.08 / 10.00 (up to 6th semester)",
  },
  {
    school: "Deeksha Centre for Learning, Bengaluru",
    degree: "Pre-University, Science",
    period: "2021 – 2023",
    score: "Score 96%",
  },
  {
    school: "Appollo National Public School",
    degree: "Secondary Education",
    period: "2017 – 2021",
    score: "Score 96%",
  },
];

export const certifications = [
  "IBM Enterprise Grade AI and Cloud Solution",
  "Cisco Cybersecurity Essentials and Packet Tracer",
  "Infosys Springboard – Introduction to AI, Deep Learning, Computer Vision",
  "Coursera Deep Learning Specialization",
  "Coursera TensorFlow ANN",
  "Coursera IBM Machine Learning",
  "Coursera Python Developer",
  "Coursera GUI Programming in Python",
  "Coursera HTML / CSS / JavaScript",
  "Udemy Feature Engineering in Machine Learning",
];

export const contact = {
  heading: "Let's connect and build serious AI systems.",
  location: "Bengaluru, India",
  email: "kxvya1820@gmail.com",
  phone: "+91-9535832089",
  github: "https://github.com/Kxvya18",
  githubLabel: "github.com/Kxvya18",
  linkedin: "https://linkedin.com/in/kavya-kalavala-6008b5286",
  linkedinLabel: "linkedin.com/in/kavya-kalavala-6008b5286",
  // External hosted CV (Google Drive)
  cvUrl:
    "https://docs.google.com/document/d/1_zQFjbNXvTDSV7jBB8wRSFSsuCY3XPNg/export?format=docx",
  // PDF version (Google Drive direct download)
  cvPdfUrl:
    "https://drive.google.com/uc?export=download&id=1IXG3gqPNyBb6YgPwFO26ozi17cVcHxs-",
};
