export default {
  async fetch(request, env) {
    const allowedOrigins = (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    const origin = request.headers.get("Origin");
    const allowOrigin = allowedOrigins.length === 0
      ? origin || "*"
      : allowedOrigins.includes("*")
      ? "*"
      : allowedOrigins.includes(origin || "")
      ? origin
      : "";

    if (allowedOrigins.length > 0 && !allowOrigin) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowOrigin || "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Gemini API key is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageBase64, zip, description, mimeType } = payload || {};

    if (!imageBase64 || !zip || !description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: imageBase64, zip, description" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are an expert HVAC technician analyzing an AC problem for a college student in Tampa, Florida (ZIP: ${zip}).\n\n` +
      `Problem Description: ${description}\n\n` +
      "Based on the uploaded image and description, provide:\n" +
      "1. \ud83d\udd27 DIAGNOSIS: What's wrong with the AC unit?\n" +
      "2. \ud83d\udcb0 ESTIMATED COST: Provide a realistic price range (low-high) for Tampa area\n" +
      "   - Include DIY cost if applicable\n" +
      "   - Include professional service cost\n" +
      "   - Break down by potential issues\n" +
      "3. \u2705 RECOMMENDED STEPS: Numbered list of what to do\n" +
      "4. \ud83d\udc02 BULLS TIP: One helpful tip for college students in Florida's heat\n\n" +
      "Keep the tone friendly and use emojis. Make it conversational but professional. Focus on being helpful to a student who might not know much about HVAC systems.\n\n" +
      "Format your response clearly with the sections above.`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType || "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    };

    try {
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!geminiResponse.ok) {
        const errorDetails = await geminiResponse.json().catch(() => ({}));
        const message = errorDetails.error?.message || geminiResponse.statusText;
        return new Response(JSON.stringify({ error: `Gemini API error: ${message}` }), {
          status: geminiResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await geminiResponse.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        return new Response(JSON.stringify({ error: "No response from Gemini API" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ result: aiResponse }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Request failed", details: String(error) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
