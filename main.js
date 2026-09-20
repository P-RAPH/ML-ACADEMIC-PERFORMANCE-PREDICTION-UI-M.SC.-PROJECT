const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  ImageRun, PageBreak, Header, Footer, PageNumber, NumberFormat,
  FONT, h1, h2, h3, p, pc, bulletItem, numberedItem, refEntry, figureImage, makeTable, fs
} = require("./build.js");

const sections_children = [];

// ================= TITLE PAGE =================
const titlePage = [
  new Paragraph({ spacing: { after: 800 }, children: [new TextRun({ text: "", size: 2 })] }),
  pc("MACHINE LEARNING-BASED STUDENT ACADEMIC PERFORMANCE PREDICTION:", { bold: true, size: 30, after: 100 }),
  pc("A CASE STUDY OF THE UNIVERSITY OF IBADAN", { bold: true, size: 30, after: 800 }),
  pc("BY", { size: 24, after: 200 }),
  pc("[STUDENT NAME(S) / MATRICULATION NUMBER(S) — TO BE COMPLETED BY GROUP]", { size: 24, after: 800, italics: true }),
  pc("A COURSE PROJECT SUBMITTED TO THE", { size: 24, after: 100 }),
  pc("DEPARTMENT OF COMPUTER SCIENCE", { size: 24, after: 100 }),
  pc("FACULTY OF COMPUTING AND INFORMATION SCIENCES", { size: 24, after: 100 }),
  pc("UNIVERSITY OF IBADAN, IBADAN, NIGERIA", { size: 24, after: 800 }),
  pc("IN PARTIAL FULFILMENT OF THE REQUIREMENTS FOR AN", { size: 24, after: 100 }),
  pc("ARTIFICIAL INTELLIGENCE COURSE PROJECT", { size: 24, after: 800 }),
  pc("SEPTEMBER 2026", { size: 24, after: 200 }),
];

// ================= ABSTRACT =================
const abstract = [
  h1("ABSTRACT"),
  p("Academic underperformance and attrition remain persistent challenges in Nigerian higher education, and conventional, retrospective methods of monitoring student progress typically identify struggling students only after irreversible harm has occurred, such as a failed semester or withdrawal. This project examines how machine learning (ML) techniques can be applied to predict undergraduate academic performance and to support early, targeted intervention, using the University of Ibadan as a case study. Motivated by the growing but still fragmented body of educational data mining (EDM) research in Nigerian universities, and by the near-total absence of published, institution-specific predictive modelling studies at the University of Ibadan, the project identifies a concrete research gap: the lack of a locally grounded, interpretable, and practically deployable ML framework tailored to the data realities of a large, resource-constrained Nigerian public university. The study reviews recent literature (2023-2026) on educational data mining, learning analytics, explainable artificial intelligence (XAI), and early-warning systems, critically comparing algorithmic choices, feature sets, and reported performance across contexts, including Nigerian and other African case studies. Guided by the Cross-Industry Standard Process for Data Mining (CRISP-DM), the project proposes a full ML pipeline covering problem definition, data acquisition, preprocessing, feature engineering, model training, and interpretable evaluation. Because access to confidential, individually identifiable student records was not available at the time of this project, the proposed methodology is demonstrated end-to-end using a carefully constructed synthetic dataset whose statistical relationships are informed by patterns reported in the reviewed literature; all quantitative results in Chapter Four are explicitly and consistently labelled as simulated and are presented strictly to illustrate the workability of the design, not as empirical findings about University of Ibadan students. Six classification algorithms — Logistic Regression, Decision Tree, k-Nearest Neighbours, Naïve Bayes, Support Vector Machine, and Random Forest — are trained and compared on the simulated data using accuracy, precision, recall, F1-score, and area under the receiver operating characteristic curve (AUC). The project's contribution is a validated architectural and methodological blueprint, an explicit account of the ethical and data-governance conditions under which such a system could responsibly be built with real institutional data, and a set of concrete recommendations for the University of Ibadan's academic planning and student support units.", { indent: true }),
  p([new TextRun({ text: "Keywords: ", bold: true, size: 24, font: FONT }), new TextRun({ text: "machine learning; student performance prediction; educational data mining; learning analytics; early-warning system; explainable AI; University of Ibadan; Nigeria", size: 24, font: FONT })]),
];

// ================= TABLE OF CONTENTS (manual, static) =================
const toc = [
  h1("TABLE OF CONTENTS"),
  p("Abstract"),
  p("CHAPTER ONE: INTRODUCTION"),
  p("1.1 Background to the Study     1.2 Statement of the Problem     1.3 Aim and Objectives of the Study     1.4 Research Questions     1.5 Significance of the Study     1.6 Scope and Limitations of the Study     1.7 Definition of Key Terms"),
  p("CHAPTER TWO: LITERATURE REVIEW"),
  p("2.1 Conceptual Review     2.2 Theoretical Framework     2.3 Review of Empirical Studies     2.4 Nigerian and University of Ibadan Context     2.5 Summary and Research Gap"),
  p("CHAPTER THREE: SYSTEM ANALYSIS AND DESIGN"),
  p("3.1 Research Methodology     3.2 Analysis of the Existing System     3.3 Requirements of the Proposed System     3.4 Dataset and Attributes     3.5 Data Preprocessing     3.6 Feature Engineering and Selection     3.7 Machine Learning Algorithms Employed     3.8 Model Training and Testing Strategy     3.9 Evaluation Metrics     3.10 System Architecture     3.11 Ethical Considerations"),
  p("CHAPTER FOUR: IMPLEMENTATION AND RESULTS"),
  p("4.1 Implementation Environment     4.2 Description of the Simulated Dataset     4.3 Preprocessing Implementation     4.4 Model Implementation     4.5 Results     4.6 Discussion of Findings     4.7 Comparison with Related Studies"),
  p("CHAPTER FIVE: CONCLUSION AND RECOMMENDATIONS"),
  p("5.1 Summary     5.2 Contributions and Novelty     5.3 Limitations     5.4 Recommendations     5.5 Suggestions for Future Work"),
  p("REFERENCES"),
];

module.exports = { titlePage, abstract, toc };
