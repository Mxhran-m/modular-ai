import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { messages, agentConfig, apiKey } = await req.json();

    if (!apiKey) {
      throw new Error("No API key provided");
    }

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format: messages must be an array");
    }

    // Prepare the system message based on agent configuration
    const systemPrompt = agentConfig?.instructions || 
      "You are a helpful AI assistant that provides accurate and concise information.";

    // Format messages for Gemini - handle potential malformed messages by validating
    const formattedMessages = [
      { role: "user", parts: [{ text: `SYSTEM INSTRUCTION: ${systemPrompt}` }] }
    ];

    // Add user messages with validation
    messages.forEach((msg) => {
      if (msg && typeof msg.role === 'string' && typeof msg.content === 'string') {
        formattedMessages.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        });
      }
    });

    console.log("Sending request to Gemini with messages:", JSON.stringify(formattedMessages));

    // Make the API call to Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    // Extract the generated text
    let generatedText = "";
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      generatedText = data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      generatedText = `I'm unable to provide a response because the request was blocked for the following reason: ${data.promptFeedback.blockReason}`;
    } else {
      generatedText = "I apologize, but I couldn't generate a response at this time.";
    }

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
