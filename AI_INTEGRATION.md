# AI Card Analysis Integration

This feature integrates Groq API to provide AI-powered analysis of cards in Planka. When a new card is created, its information is automatically sent to the Groq API to generate structured insights.

## Features

- **Automatic Analysis**: When a card is created, it's automatically analyzed by AI
- **Structured Response**: AI provides priority assessment, time estimates, suggested tags, risk factors, dependencies, and next steps
- **Non-blocking**: Card creation succeeds even if AI analysis fails
- **UI Integration**: AI insights are displayed both on card previews and in detailed card modals

## Configuration

Add the following environment variable to your `.env` file:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

To obtain a Groq API key:
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Create a new API key
4. Copy the key to your environment configuration

## Technical Implementation

### Server Side
- **Model**: Extended `Card` model with `llmResponse` JSON field
- **Helper**: `api/helpers/cards/send-to-llm.js` handles Groq API integration
- **Integration**: Card creation flow asynchronously calls LLM helper
- **Error Handling**: Graceful degradation when API is unavailable

### Client Side
- **Model**: Extended client Card model with `llmResponse` field
- **UI**: AI analysis displayed with brain icon on cards
- **Modal**: Detailed view shows structured AI insights
- **Styling**: Consistent styling matching Planka's design system

## AI Analysis Structure

The AI provides the following structured analysis:

```json
{
  "priority": "high|medium|low",
  "estimatedHours": 8,
  "suggestedTags": ["frontend", "urgent"],
  "riskFactors": ["Complex integration", "External dependency"],
  "dependencies": ["API endpoint completion", "UI mockups"],
  "nextSteps": ["Set up development environment", "Create API tests"],
  "summary": "Brief summary of the analysis",
  "generatedAt": "2024-01-15T10:30:00Z",
  "model": "llama3-8b-8192"
}
```

## Usage

1. **Setup**: Configure `GROQ_API_KEY` environment variable
2. **Create Card**: Create a new card with name and description
3. **Wait**: AI analysis happens in background (usually 1-3 seconds)
4. **View**: See AI icon on card and click card to view detailed analysis

## Limitations

- Requires internet connection for AI analysis
- Analysis quality depends on card description completeness
- Currently supports English language input
- Rate limited by Groq API quotas

## Security Considerations

- API key should be kept secure and not committed to version control
- Card data is sent to Groq for analysis - ensure compliance with data policies
- Consider data sensitivity before enabling for production environments