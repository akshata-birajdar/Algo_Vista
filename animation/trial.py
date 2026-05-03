# STEP 1: Install SHAP (only first time)
# !pip install shap

# STEP 2: Import Libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import shap
import matplotlib.pyplot as plt

# STEP 3: Create Simple Dataset
data = {
    'Age': [40, 60, 35, 50, 70, 30, 45],
    'BMI': [22.0, 30.1, 25.3, 28.5, 35.0, 21.5, 26.8],
    'Glucose': [100, 180, 90, 140, 160, 85, 110],
    'Stroke': [0, 1, 0, 1, 1, 0, 0]
}
df = pd.DataFrame(data)

# STEP 4: Train the Model
X = df[['Age', 'BMI', 'Glucose']]
y = df['Stroke']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# STEP 5: Make Predictions
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# STEP 6: SHAP Explainability
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# STEP 7: Show SHAP Summary Plot
shap.summary_plot(shap_values[1], X_test)
shap.force_plot(explainer.expected_value[1], shap_values[1][0], X_test.iloc[0])
