import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and feature columns
model = joblib.load('models/virality_model.pkl')
feature_columns = joblib.load('models/feature_columns.pkl')

# Platform mapping
platform_map = {
    'Instagram': [1, 0, 0, 0, 0],
    'TikTok': [0, 1, 0, 0, 0],
    'YouTube': [0, 0, 1, 0, 0],
    'LinkedIn': [0, 0, 0, 1, 0],
    'Twitter': [0, 0, 0, 0, 1]
}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        title = data.get('title', '')
        hashtags = data.get('hashtags', [])
        platform = data.get('platform', 'Instagram')
        has_emoji = data.get('hasEmoji', False)
        has_question = data.get('hasQuestion', False)
        has_cta = data.get('hasCallToAction', False)
        
        # Calculate features
        title_len = len(title)
        has_number = 1 if any(c.isdigit() for c in title) else 0
        hashtag_count = len(hashtags)
        
        # Get platform encoding
        platform_encoding = platform_map.get(platform, [1, 0, 0, 0, 0])
        
        # Create feature array
        features = [
            title_len, has_number, 1 if has_emoji else 0, 1 if has_question else 0, 1 if has_cta else 0, hashtag_count,
            *platform_encoding
        ]
        
        # Predict
        features_array = np.array(features).reshape(1, -1)
        virality_score = float(model.predict(features_array)[0])
        
        # Calculate predicted reach and engagement
        predicted_reach = int(10000 * (virality_score / 50))
        predicted_engagement = {
            'likes': int(predicted_reach * 0.06 * (virality_score / 100)),
            'comments': int(predicted_reach * 0.015 * (virality_score / 100)),
            'shares': int(predicted_reach * 0.025 * (virality_score / 100))
        }
        
        return jsonify({
            'success': True,
            'data': {
                'viralityScore': round(virality_score),
                'predictedReach': predicted_reach,
                'predictedEngagement': predicted_engagement,
                'suggestions': [
                    'Add numbers to your title for higher CTR' if not has_number else None,
                    'Include emojis to increase engagement' if not has_emoji else None,
                    'Ask a question to boost comments' if not has_question else None,
                    'Add a call-to-action (like/share/save)' if not has_cta else None,
                    'Use 3-5 hashtags for optimal reach' if hashtag_count < 3 or hashtag_count > 5 else None
                ],
                'confidence': 'high' if virality_score > 70 else 'medium' if virality_score > 40 else 'low'
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)