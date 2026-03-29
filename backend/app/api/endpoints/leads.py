from fastapi import APIRouter, HTTPException, Depends
from typing import List, Any, Optional
from pydantic import BaseModel, EmailStr
from app.services.ai_service import ai_service
from app.services.messaging_service import messaging_service
import logging
import datetime

router = APIRouter()
logger = logging.getLogger("AetherReach.LEADS")

# --- Schemas ---

class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = "Web Form"

class LeadOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    score: float
    status: str
    intent_summary: str

# --- Endpoints ---

@router.post("/", response_model=LeadOut)
async def create_lead(lead_in: LeadCreate):
    """
    Creates a new lead and triggers autonomous AI qualification.
    Integrated with multi-model routing (Aether-4o).
    """
    logger.info(f"Incoming lead from {lead_in.source}: {lead_in.email}")
    
    # 1. Start AI Lead Intelligence
    qualification = await ai_service.qualify_lead(lead_in.model_dump())
    
    # 2. Mocking DB save (Since we are building the foundation)
    # In realDB, we would use a repository to save this.
    
    mock_id = 4501 # Example
    
    lead_out = {
        "id": mock_id,
        "first_name": lead_in.first_name,
        "last_name": lead_in.last_name,
        "email": lead_in.email,
        "score": qualification.get('score', 0.85),
        "status": "Qualified" if qualification.get('score', 0) > 0.7 else "Review Required",
        "intent_summary": qualification.get('intent', "Lead analyzed by AetherReach AI.")
    }
    
    return lead_out

@router.get("/{lead_id}")
async def get_lead_detail(lead_id: int):
    """Returns full interaction history for a specific lead"""
    return {
        "id": lead_id,
        "first_name": "Ismail",
        "last_name": "Sajid",
        "email": "ismail@test.com",
        "score": 0.98,
        "status": "Qualified",
        "intent_summary": "High-intent lead looking for enterprise automation.",
        "follow_up_count": 2,
        "messages": [
            {"role": "user", "text": "I'm interested in your AI engine.", "timestamp": "2026-03-29T08:00:00Z"},
            {"role": "ai", "text": "Hello Ismail! Great to hear that. I can help scale your sales flow. What's your current volume?", "timestamp": "2026-03-29T08:01:00Z"},
            {"role": "user", "text": "We handle about 1,000 leads a day.", "timestamp": "2026-03-29T08:15:00Z"},
            {"role": "ai", "text": "That's perfect. AetherReach can automate that in under 60 seconds per lead.", "timestamp": "2026-03-29T08:16:00Z"}
        ]
    }

@router.post("/{lead_id}/follow-up")
async def trigger_follow_up(lead_id: int, channel: Optional[str] = "email"):
    """Manually triggers an autonomous AI follow-up for a lead"""
    # 1. Fetch lead (mocked)
    lead_name = "Ismail Sajid"
    
    # 2. AI generates personalized follow-up
    # logic...
    content = f"Hey {lead_name}, just checking in to see if you have any questions about the AetherReach AI engine."
    
    # 3. Send via channel
    success = await messaging_service.execute_follow_up(
        {"email": "ismail@test.com", "phone": "1234567890", "company": "AetherBridge"},
        content,
        channel=channel
    )
    
    if success:
         return {"status": "sent", "channel": channel, "content": content}
    else:
         raise HTTPException(status_code=500, detail="Failed to send message")
