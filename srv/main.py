# ingredients-agent/srv/main.py
import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from analysis import analyze_image

app = FastAPI()

# CORS setup for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] if easier
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_endpoint(file: UploadFile = File(...)):
    """
    Receives an uploaded image, passes it to the AI, 
    and returns the analysis as JSON.
    """
    image_bytes = await file.read()

    # Call our analysis function
    try:
        analysis_result = analyze_image(image_bytes)
        return {"content": analysis_result}
    except Exception as e:
        print("Analyze error:", e)
        return JSONResponse({"error": str(e)}, status_code=500)
