# ingredients-agent/srv/analysis.py
import os
from io import BytesIO

import pytesseract
from PIL import Image

from phi.agent import Agent
from phi.model.google import Gemini
from phi.tools.tavily import TavilyTools

from constants import SYSTEM_PROMPT, INSTRUCTIONS

# Ensure the phi library sees your environment variables:
os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_KEY", "")
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_KEY", "")


def create_agent() -> Agent:
    """Create a Gemini-based Agent with TavilyTools."""
    return Agent(
        model=Gemini(id="gemini-2.0-flash-exp"),
        tools=[TavilyTools(api_key=os.getenv("TAVILY_API_KEY"))],
        markdown=True,
        system_prompt=SYSTEM_PROMPT,
        instructions=INSTRUCTIONS,
    )


def analyze_image(image_bytes: bytes) -> str:
    """
    1) Convert the raw image bytes into a PIL image.
    2) Extract text from the image (OCR via pytesseract).
    3) Build a text prompt with the extracted text.
    4) Send the prompt to the Gemini agent for analysis.
    5) Return the LLM's response content as a string.
    """
    # Step 1: Convert bytes to a PIL Image
    try:
        img = Image.open(BytesIO(image_bytes))
    except Exception as e:
        raise ValueError(f"Could not open image: {e}")

    # Step 2: Extract text using OCR
    extracted_text = pytesseract.image_to_string(img).strip()
    if not extracted_text:
        raise ValueError(
            "No text found in the uploaded image. Try another image or ensure text is readable.")

    # Step 3: Build the agent and the prompt
    agent = create_agent()
    prompt = (
        "Below is text from a product label:\n\n"
        f"{extracted_text}\n\n"
        "Please analyze these ingredients. Provide any dietary concerns, "
        "nutritional rating, and relevant health insights."
    )

    # Step 4: Run the text prompt (no images=... needed now, since this is OCR-based)
    response = agent.run(prompt)

    # Step 5: Return the LLM's generated text
    return response.content
