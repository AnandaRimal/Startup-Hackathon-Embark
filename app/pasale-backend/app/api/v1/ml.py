from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.ml.xgboost_model import XGBoostPredictor
from app.ml.knn_model import KNNPredictor

router = APIRouter()

# Initialize models
xgb_predictor = XGBoostPredictor()
knn_predictor = KNNPredictor()

class PriceImpactRequest(BaseModel):
    features: List[float] # [current_price, competitor_price, demand_score, season_factor]

class NewProductRequest(BaseModel):
    features: List[float] # [market_size, competition_level, initial_investment, expected_margin]

@router.post("/ml/train")
def train_models():
    """
    Trigger training for both models and save them.
    """
    try:
        xgb_status = xgb_predictor.train()
        knn_status = knn_predictor.train()
        return {
            "message": "Models trained successfully",
            "xgboost": xgb_status,
            "knn": knn_status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ml/predict/price-impact")
def predict_price_impact(request: PriceImpactRequest):
    """
    Predict price impact using XGBoost.
    """
    try:
        result = xgb_predictor.predict(request.features)
        return {"price_impact_score": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ml/predict/new-product")
def predict_new_product(request: NewProductRequest):
    """
    Predict new product success using KNN.
    """
    try:
        result = knn_predictor.predict(request.features)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
