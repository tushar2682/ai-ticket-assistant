import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-1.5-flash",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "AI-TICKET TRIAGE ASSISTANT",
        system: `You are an advanced AI assistant specializing in support ticket triage for a technical helpdesk.
Your job is to:
- Summarize the main issue described in the ticket.
- Estimate the priority (low, medium, high, urgent) based on the ticket's content.
- Provide helpful notes or suggestions for the support team or user.
- If possible, include a relevant source link to a knowledge base article or documentation that could help resolve the issue.
- Format must be a raw JSON object.
- Do not include markdown, code blocks, or any other extra formatting.

Format your response as:
{
  "Summary": "<short summary>",
  "Priority": "low|medium|high|urgent",
  "Helpful Notes": "<notes>",
  "Related Skills": ["ReactJS", "NodeJS"]
}

Always ensure your suggestions are actionable and tailored to the ticket's content. If information is missing, note what additional details are needed.`,
    });

    const prompt = `
Ticket information:
Title: ${ticket.title}
Description: ${ticket.description}
`;

    try {
        const response = await supportAgent.run(prompt);
        const raw = response.output[1].context;

        // Attempt to parse raw JSON from response
        const match = raw.match(/{[\s\S]*}/); // Match JSON object in string
        const jsonString = match ? match[1] : raw.trim();

        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON:", e.message);
        return null;
    }
};

export default analyzeTicket;
