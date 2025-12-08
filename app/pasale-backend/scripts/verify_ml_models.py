import sys
import os

# Ensure app is in path
sys.path.append(os.getcwd())

try:
    from app.ml.xgboost_model import XGBoostPredictor
    from app.ml.knn_model import KNNPredictor
except ImportError as e:
    print(f"Import Error: {e}")
    print("Please ensure xgboost and scikit-learn are installed: pip install xgboost scikit-learn")
    sys.exit(1)

def test_xgboost():
    print("--- Testing XGBoost ---")
    model = XGBoostPredictor()
    print("Training model...")
    res = model.train()
    print(f"Train result: {res}")
    
    features = [100.0, 95.0, 8.5, 1.1] # Sample features
    print(f"Predicting with features: {features}")
    pred = model.predict(features)
    print(f"Prediction result: {pred}")
    print("XGBoost Test Passed!")

def test_knn():
    print("\n--- Testing KNN ---")
    model = KNNPredictor()
    print("Training model...")
    res = model.train()
    print(f"Train result: {res}")
    
    features = [10000.0, 5.0, 50000.0, 0.25] # Sample features
    print(f"Predicting with features: {features}")
    pred = model.predict(features)
    print(f"Prediction result: {pred}")
    print("KNN Test Passed!")

if __name__ == "__main__":
    print("Starting ML Model Verification...")
    try:
        test_xgboost()
        test_knn()
        print("\nALL SYSTEMS GO: ML Models validated successfully.")
    except Exception as e:
        print(f"\nTEST FAILED: {e}")
        import traceback
        traceback.print_exc()
