# Machine Learning-Based Student Academic Performance Prediction
### A Case Study of the University of Ibadan

## By
```
1.	Ayantunmbi Raphael Ayantayo	260263	rayantunmbi260263@stu.ui.edu.ng
2.	Achebo Tule Adewale	261243	tachebo261243@stu.ui.edu.ng
3.	Komolafe Temiloluwa	259785	tkomolafe259785@stu.ui.edu.ng
4.	Fakorede Damilola Idris	206432	dfakorede206432@stu.ui.edu.ng
```


This repository contains the code used to produce the AI course project term paper.

## Structure

```
simulation/         Python code for the simulated ML experiment (Chapter Four)
  simulate.py         Generates the synthetic student dataset and trains/evaluates
                       6 classifiers (Logistic Regression, Decision Tree, KNN,
                       Naive Bayes, SVM, Random Forest)
  architecture.py      Generates the system architecture diagram (Chapter Three)
  synthetic_student_data.csv     Raw synthetic dataset (1,500 records)
  model_results.csv              Model comparison metrics (Table 4.2)
  feature_importance_clean.csv   Random Forest feature importances (Figure 4.2)
  fig_*.png                      Generated charts/diagrams embedded in the report

docx_generator/     Node.js (docx library) code that assembles the final .docx report
  build.js            Shared formatting helpers (headings, tables, figures, etc.)
  main.js             Title page, abstract, table of contents
  ch1.js ... ch5.js    Chapter One to Chapter Five content
  assemble.js         Entry point: builds and writes the final .docx file

outputs/            Final compiled deliverable
  ML_Student_Performance_Prediction_UI_Term_Paper.docx
```

## Important note on the data

No real University of Ibadan (or any real institution's) student data was used
anywhere in this project. `synthetic_student_data.csv` is a computer-generated
dataset built to reflect plausible statistical relationships reported in the
reviewed literature, purely to demonstrate that the proposed methodology in
Chapter Three is implementable end-to-end. All results derived from it are
labelled "Simulated Data" throughout the report.

## Reproducing the results

```bash
# 1. Simulation (requires Python 3, scikit-learn, imbalanced-learn, pandas, matplotlib)
cd simulation
pip install scikit-learn imbalanced-learn pandas matplotlib numpy
python3 simulate.py        # regenerates dataset, model_results.csv, and charts
python3 architecture.py    # regenerates the system architecture diagram

# 2. Report generation (requires Node.js and the `docx` npm package)
cd ../docx_generator
npm install docx
node assemble.js           # writes the final .docx to /mnt/user-data/outputs (adjust path as needed)
```

## Report structure

Chapter One: Introduction
Chapter Two: Literature Review
Chapter Three: System Analysis and Design
Chapter Four: Implementation and Results (simulated)
Chapter Five: Conclusion and Recommendations
References (APA 7th edition)
