from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, Text
from sqlalchemy.sql import func
from app.db.base_class import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    company = Column(String(255))
    source = Column(String(100)) # e.g., 'Facebook Ads', 'Inbound Form'
    
    # AI Intelligence Layer
    score = Column(Float, default=0.0)
    status = Column(String(50), default="New")
    intent_summary = Column(Text)
    sentiment = Column(String(50)) # 'Positive', 'Neutral', 'Negative'
    predicted_intent = Column(String(100)) # 'Purchase', 'Information', 'Demo', 'Support'
    follow_up_count = Column(Integer, default=0)
    
    # Interaction History (Messages/Notes)
    messages = Column(JSON, default=[]) # [{role: 'ai', text: 'hi', timestamp: '...'}]
    
    # Metadata for multi-model decision tracking
    ai_metadata = Column(JSON, default={})
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Lead(email={self.email}, score={self.score})>"
