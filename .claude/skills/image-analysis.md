# Image Analysis Skill

## Purpose
Enable Claude Code to read, analyze, describe, and understand images provided by the user.

## When to Use
- User asks to "analyze this image", "describe this screenshot", "what does this show"
- User provides an image file path or URL
- User wants to extract text from an image (OCR)
- User wants to understand a diagram, chart, or visual content
- User asks to "read" or "look at" an image

## How to Use

### Step 1: Check if the image exists locally
Use `Read` tool with the file path to view the image directly. Claude Code has built-in multimodal capabilities to analyze images.

### Step 2: Analyze the image content
Based on what you see, provide:
- Description of what the image shows
- Text extracted from the image (if any)
- Key elements and their significance
- Any relevant conclusions or observations

### Step 3: If image is on the web
Use `Bash` with `curl` to download the image first, then use `Read` tool to analyze it.

```bash
# Download image to temp location
curl -s -o /tmp/image.png "IMAGE_URL"

# Then read it
Read(/tmp/image.png)
```

## Supported Image Formats
- PNG, JPG, JPEG, GIF, WebP, BMP, PDF
- Screenshots, photographs, diagrams
- Charts, graphs, tables
- Handwritten text (best effort)

## Capabilities

### 1. Visual Description
Describe what's in the image in detail:
- Objects, people, text
- Layout and composition
- Colors and visual style
- Context and setting

### 2. Text Extraction (OCR)
Extract readable text from:
- Screenshots of apps/websites
- Documents and forms
- Signs and labels
- Handwritten notes (basic)

### 3. Diagram/Chart Understanding
Interpret:
- Flowcharts and process diagrams
- Bar charts, pie charts, line graphs
- Architecture diagrams
- UML diagrams

### 4. UI/Application Analysis
When analyzing screenshots:
- Identify UI elements
- Describe layout and navigation
- Note any errors or issues visible
- Suggest improvements

## Example Prompts
- "What does this screenshot show?"
- "Extract all text from this image"
- "Describe this diagram in detail"
- "What error is shown in this screenshot?"
- "Analyze this UI design"