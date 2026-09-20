import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(8, 9.5))
ax.set_xlim(0, 10)
ax.set_ylim(-0.3, 15)
ax.axis("off")

def box(x, y, w, h, text, fs=9.5):
    b = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.08",
                        linewidth=1.2, edgecolor="black", facecolor="white")
    ax.add_patch(b)
    ax.text(x + w/2, y + h/2, text, ha="center", va="center", fontsize=fs, wrap=True)

def arrow(x1, y1, x2, y2):
    a = FancyArrowPatch((x1, y1), (x2, y2), arrowstyle="-|>", mutation_scale=14,
                         linewidth=1.1, color="black")
    ax.add_patch(a)

# Layer 1: Data sources
box(0.5, 13.2, 9, 1.3, "Data Sources\n(Student Records / Result System, Admission Records, Attendance Logs,\nLearning Management System Logs, Bio-data)", fs=9)
arrow(5, 13.2, 5, 12.3)

# Layer 2: Data acquisition & preprocessing
box(0.5, 10.9, 9, 1.4, "Data Acquisition & Preprocessing Module\n(Data cleaning, missing-value handling, encoding, normalisation,\nSMOTE class balancing)")
arrow(5, 10.9, 5, 10.0)

# Layer 3: Feature engineering
box(0.5, 8.6, 9, 1.4, "Feature Engineering & Selection Module\n(Correlation analysis, Information Gain / Chi-square ranking,\nRecursive Feature Elimination)")
arrow(5, 8.6, 5, 7.7)

# Layer 4: Model training
box(0.5, 6.3, 9, 1.4, "Model Training & Validation Module\n(Logistic Regression, Decision Tree, KNN, Naive Bayes, SVM, Random Forest;\nk-fold cross-validation, hyperparameter tuning)")
arrow(5, 6.3, 5, 5.4)

# Layer 5: Evaluation
box(0.5, 4.0, 9, 1.4, "Model Evaluation Module\n(Accuracy, Precision, Recall, F1-score, ROC-AUC,\nConfusion Matrix, SHAP-based interpretability)")
arrow(5, 4.0, 5, 3.1)

# Layer 6: Prediction & Decision support
box(0.5, 1.7, 9, 1.4, "Prediction & Decision-Support Layer\n(Best-performing model deployed for at-risk classification;\nresults presented via dashboard for academic advisers / student affairs)")
arrow(5, 1.7, 5, 0.9)

# Layer 7 stakeholders
box(0.5, 0.0, 9, 0.9, "End Users: Academic Advisers, Course Coordinators, Departmental Boards, Students", fs=9)

ax.set_title("Proposed System Architecture for the ML-Based Student\nAcademic Performance Prediction System", fontsize=12, pad=10)

plt.tight_layout()
plt.savefig("fig_architecture.png", dpi=200)
print("done")
