import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.request_logging import RequestLoggingMiddleware

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("AetherReach")

from app.api.endpoints import leads

app = FastAPI(
    title="AetherReach AI",
    description="Enterprise-grade AI Sales Intelligence Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration
origins = ["*"] # Adjust in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(leads.router, prefix="/api/v1/leads", tags=["leads"])

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "AetherReach AI Engine",
        "version": "1.0.0",
        "message": "Welcome to AetherReach AI Backend"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "engine": "AetherReach"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
