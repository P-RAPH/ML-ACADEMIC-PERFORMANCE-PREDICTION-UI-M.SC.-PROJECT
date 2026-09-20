"""
SIMULATED EXPERIMENT for illustrative purposes only.
No real University of Ibadan student data was used or accessed.
This script generates a synthetic dataset with plausible statistical
relationships (based on patterns reported in the reviewed literature,
e.g., attendance, study habits, UTME/O'level scores, and CGPA outcomes)
and applies standard ML pipeline steps purely to demonstrate the
proposed methodology end-to-end. All numeric results below are
computed from this synthetic data, not fabricated, but they are NOT
real findings about University of Ibadan students.
"""

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                              f1_score, confusion_matrix, roc_auc_score)
from imblearn.over_sampling import SMOTE

rng = np.random.default_rng(42)
N = 1500

# ---- Feature generation (synthetic, plausible ranges for Nigerian UME/O'level context) ----
utme_score = np.clip(rng.normal(230, 35, N), 120, 340).round(0)          # JAMB/UTME (out of 400)
olevel_credits = np.clip(rng.normal(7.2, 1.4, N), 3, 9).round(0)        # No. of O'level credits (incl. core)
attendance_rate = np.clip(rng.normal(78, 15, N), 20, 100).round(1)      # % lecture attendance
study_hours = np.clip(rng.normal(3.2, 1.6, N), 0, 10).round(1)          # avg daily self-study hours
prev_gpa = np.clip(rng.normal(3.1, 0.6, N), 1.0, 5.0).round(2)          # GPA in immediately preceding semester
family_income_level = rng.choice([0, 1, 2], size=N, p=[0.35, 0.45, 0.20])  # 0=low,1=mid,2=high
hostel_residence = rng.choice([0, 1], size=N, p=[0.55, 0.45])           # 1 = lives in hostel
extracurricular_hours = np.clip(rng.normal(4.0, 2.5, N), 0, 15).round(1)
internet_access = rng.choice([0, 1], size=N, p=[0.30, 0.70])
gender = rng.choice([0, 1], size=N, p=[0.5, 0.5])                       # 0=female,1=male
department_load = np.clip(rng.normal(24, 4, N), 15, 36).round(0)        # registered credit units

# ---- Latent "true" academic propensity used to generate the target label ----
z = (
    0.015 * (utme_score - 230) +
    0.18 * (olevel_credits - 7) +
    0.028 * (attendance_rate - 78) +
    0.22 * (study_hours - 3.2) +
    0.9  * (prev_gpa - 3.1) +
    0.10 * family_income_level +
    0.05 * internet_access +
    -0.02 * (department_load - 24) +
    0.03 * hostel_residence +
    rng.normal(0, 0.55, N)  # noise
)

# Convert propensity into a 3-class outcome for next-semester CGPA band
# Class 0 = At-Risk (CGPA < 2.40), Class 1 = Average (2.40-3.49), Class 2 = High-Performing (>=3.50)
q1, q2 = np.quantile(z, [0.28, 0.72])
labels = np.where(z < q1, 0, np.where(z < q2, 1, 2))

df = pd.DataFrame({
    "utme_score": utme_score,
    "olevel_credits": olevel_credits,
    "attendance_rate": attendance_rate,
    "study_hours": study_hours,
    "prev_gpa": prev_gpa,
    "family_income_level": family_income_level,
    "hostel_residence": hostel_residence,
    "extracurricular_hours": extracurricular_hours,
    "internet_access": internet_access,
    "gender": gender,
    "department_load": department_load,
    "performance_class": labels
})

df.to_csv("synthetic_student_data.csv", index=False)
print("Class distribution:\n", df["performance_class"].value_counts())

# ---- Preprocessing ----
X = df.drop(columns=["performance_class"])
y = df["performance_class"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

scaler = StandardScaler()
num_cols = ["utme_score", "olevel_credits", "attendance_rate", "study_hours",
            "prev_gpa", "extracurricular_hours", "department_load"]
X_train_scaled = X_train.copy()
X_test_scaled = X_test.copy()
X_train_scaled[num_cols] = scaler.fit_transform(X_train[num_cols])
X_test_scaled[num_cols] = scaler.transform(X_test[num_cols])

# ---- SMOTE on training data only ----
sm = SMOTE(random_state=42)
X_train_bal, y_train_bal = sm.fit_resample(X_train_scaled, y_train)
print("Balanced training class distribution:\n", pd.Series(y_train_bal).value_counts())

# ---- Models ----
models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(max_depth=8, random_state=42),
    "K-Nearest Neighbours": KNeighborsClassifier(n_neighbors=9),
    "Naive Bayes": GaussianNB(),
    "Support Vector Machine": SVC(kernel="rbf", probability=True, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=300, max_depth=10, random_state=42),
}

results = []
conf_matrices = {}
for name, model in models.items():
    model.fit(X_train_bal, y_train_bal)
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled) if hasattr(model, "predict_proba") else None

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, average="macro")
    rec = recall_score(y_test, y_pred, average="macro")
    f1 = f1_score(y_test, y_pred, average="macro")
    auc = roc_auc_score(y_test, y_proba, multi_class="ovr") if y_proba is not None else np.nan

    results.append({
        "Model": name, "Accuracy": acc, "Precision": prec,
        "Recall": rec, "F1-Score": f1, "AUC (OvR)": auc
    })
    conf_matrices[name] = confusion_matrix(y_test, y_pred)

results_df = pd.DataFrame(results).sort_values("Accuracy", ascending=False).reset_index(drop=True)
results_df.to_csv("model_results.csv", index=False)
print(results_df.round(3))

# ---- Feature importance (Random Forest) ----
rf = models["Random Forest"]
importances = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)
importances.to_csv("feature_importance.csv")
print(importances)

# ================= CHARTS =================
plt.rcParams.update({"font.size": 10, "font.family": "DejaVu Sans"})

# 1. Model comparison bar chart
fig, ax = plt.subplots(figsize=(7, 4))
metrics_to_plot = ["Accuracy", "Precision", "Recall", "F1-Score"]
x = np.arange(len(results_df))
width = 0.2
for i, m in enumerate(metrics_to_plot):
    ax.bar(x + i * width, results_df[m], width, label=m, color=["#333333", "#666666", "#999999", "#bbbbbb"][i])
ax.set_xticks(x + 1.5 * width)
ax.set_xticklabels(results_df["Model"], rotation=25, ha="right")
ax.set_ylabel("Score")
ax.set_ylim(0, 1)
ax.set_title("Comparative Performance of Classification Algorithms\n(Simulated Data)", fontsize=11)
ax.legend(loc="lower right", fontsize=8)
plt.tight_layout()
plt.savefig("fig_model_comparison.png", dpi=200)
plt.close()

# 2. Feature importance chart
fig, ax = plt.subplots(figsize=(7, 4))
importances.sort_values().plot(kind="barh", ax=ax, color="#444444")
ax.set_xlabel("Relative Importance (Gini-based)")
ax.set_title("Random Forest Feature Importance (Simulated Data)", fontsize=11)
plt.tight_layout()
plt.savefig("fig_feature_importance.png", dpi=200)
plt.close()

# 3. Confusion matrix for best model (Random Forest)
best_model_name = results_df.iloc[0]["Model"]
cm = conf_matrices[best_model_name]
fig, ax = plt.subplots(figsize=(4.5, 4))
im = ax.imshow(cm, cmap="Greys")
classes = ["At-Risk", "Average", "High-Performing"]
ax.set_xticks(range(3)); ax.set_xticklabels(classes, rotation=20)
ax.set_yticks(range(3)); ax.set_yticklabels(classes)
for i in range(3):
    for j in range(3):
        ax.text(j, i, str(cm[i, j]), ha="center", va="center",
                 color="white" if cm[i, j] > cm.max() / 2 else "black")
ax.set_xlabel("Predicted Class")
ax.set_ylabel("Actual Class")
ax.set_title(f"Confusion Matrix - {best_model_name}\n(Simulated Test Set, n={len(y_test)})", fontsize=10)
plt.tight_layout()
plt.savefig("fig_confusion_matrix.png", dpi=200)
plt.close()

print("\nBest model:", best_model_name)
print("Done.")
