import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an empathetic and supportive AI companion named "Tu Amigo Íntimo". 
          Your purpose is to provide emotional support and guidance. Always respond with compassion, 
          without judgment, and maintain a warm, friendly tone. Focus on active listening and 
          validation of feelings. If someone expresses serious mental health concerns, gently 
          suggest professional help while maintaining support.`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0]?.message?.content || "I'm here to support you. How can I help?";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm having trouble responding right now, but I'm here to listen. Could you try rephrasing that?";
  }
};