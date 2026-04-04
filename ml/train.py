import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error
import random

# Generate synthetic training data (20,000 samples)
print("📊 Generating synthetic training data...")

data = []
for _ in range(20000):
    # Features
    title_len = random.randint(20, 100)
    has_number = random.choice([0, 1])
    has_emoji = random.choice([0, 1])
    has_question = random.choice([0, 1])
    has_cta = random.choice([0, 1])
    hashtag_count = random.randint(0, 10)
    platform = random.choice(['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter'])
    
    # Platform encoding
    platform_instagram = 1 if platform == 'Instagram' else 0
    platform_tiktok = 1 if platform == 'TikTok' else 0
    platform_youtube = 1 if platform == 'YouTube' else 0
    platform_linkedin = 1 if platform == 'LinkedIn' else 0
    platform_twitter = 1 if platform == 'Twitter' else 0
    
    # Calculate target virality score (based on rules + noise)
    score = 50
    if 30 <= title_len <= 70: score += 10
    if has_number: score += 8
    if has_emoji: score += 6
    if has_question: score += 10
    if has_cta: score += 12
    if 3 <= hashtag_count <= 5: score += 8
    if platform in ['Instagram', 'TikTok']: score += 10
    if platform == 'YouTube': score += 5
    if platform == 'LinkedIn': score -= 5
    
    # Add noise to make it realistic
    score += random.randint(-10, 10)
    score = max(0, min(100, score))
    
    data.append([
        title_len, has_number, has_emoji, has_question, has_cta, hashtag_count,
        platform_instagram, platform_tiktok, platform_youtube, platform_linkedin, platform_twitter,
        score
    ])

# Create DataFrame
columns = ['title_len', 'has_number', 'has_emoji', 'has_question', 'has_cta', 'hashtag_count',
           'platform_instagram', 'platform_tiktok', 'platform_youtube', 'platform_linkedin', 'platform_twitter',
           'virality_score']

df = pd.DataFrame(data, columns=columns)

# Split features and target
X = df.drop('virality_score', axis=1)
y = df['virality_score']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost model
print("🚀 Training XGBoost model...")
model = XGBRegressor(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    random_state=42
)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"✅ Model trained! Mean Absolute Error: {mae:.2f}")

# Save model
joblib.dump(model, 'models/virality_model.pkl')
print("💾 Model saved to: models/virality_model.pkl")

# Save feature columns for inference
feature_columns = X.columns.tolist()
joblib.dump(feature_columns, 'models/feature_columns.pkl')
print("💾 Feature columns saved")