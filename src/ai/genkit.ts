import { genkit } from 'genkit';
import mistral from 'genkitx-mistral';

export const ai = genkit({
  plugins: [
    mistral({
      apiKey: process.env.MISTRAL_API_KEY || '',
    }),
  ],
  model: 'mistral/mistral-large-latest', // Or any other Mistral model
});