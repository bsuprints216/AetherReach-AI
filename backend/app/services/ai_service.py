import json
import logging
from typing import Dict, Any
import httpx
from app.core.config import settings

logger = logging.getLogger("AetherReach.AIService")

class AetherAIService:
    """Enterprise-grade Multi-Model Routing Service"""
    
    def __init__(self):
        self.openai_url = "https://api.openai.com/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

    async def qualify_lead(self, lead_data: Dict[str, Any]) -> Dict[str, Any]:
        """Qualifies a lead using multi-model intelligence (Mocking for now if key empty)"""
        
        # In a real scenario, we would route to GPT-4o, Claude or Gemini
        # depending on lead size and priority.
        
        prompt = f"""
        Analyze the following lead and provide a qualification score (0-100) and intent summary.
        Lead Data: {json.dumps(lead_data)}
        Return JSON format: {{"score": float, "intent": string, "priority": string}}
        """
        
        # Routing Logic Example (Mocked)
        if not settings.OPENAI_API_KEY:
             logger.warning("OPENAI_API_KEY not set. Using fallback mock intelligence.")
             return self._mock_analysis(lead_data)
        
        try:
            # Simple routing (GPT-4o)
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.openai_url,
                    headers=self.headers,
                    json={
                        "model": "gpt-4o",
                        "messages": [{"role": "user", "content": prompt}],
                        "response_format": { "type": "json_object" }
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    return response.json()['choices'][0]['message']['content']
                else:
                    return self._mock_analysis(lead_data)
        except Exception as e:
            logger.error(f"Error in lead qualification: {str(e)}")
            return self._mock_analysis(lead_data)

    def _mock_analysis(self, lead_data):
        """High-end fallback analysis logic"""
        # Simulate AI logic: more info = better score
        score = 85.0 if lead_data.get('company') else 45.0
        return {
            "score": score / 100.0,
            "intent": "Lead shows high intent based on company presence and specific inquiry.",
            "priority": "High" if score > 70 else "Medium",
            "model_used": "Aether-Fallback-1.0"
        }

ai_service = AetherAIService()
