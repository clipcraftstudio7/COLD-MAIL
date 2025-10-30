import OpenAI from 'openai';

export async function generateIntro(lead) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return 'I checked out your channel and loved it.';
  }
  const client = new OpenAI({ apiKey });
  const prompt = `Write a friendly 1-2 sentence intro for an email to ${lead?.name || 'a creator'} about their ${lead?.platform || 'platform'} channel "${lead?.channel_name || ''}".`;
  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 60,
    temperature: 0.7
  });
  return resp.choices?.[0]?.message?.content?.trim() || 'I checked out your channel and loved it.';
}

