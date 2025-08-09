'use server';
/**
 * @fileOverview An AI agent that proposes new causal links between nodes and summarizes the supporting evidence.
 *
 * - proposeLinkSummary - A function that handles the proposal of new causal links and evidence summarization.
 * - ProposeLinkSummaryInput - The input type for the proposeLinkSummary function.
 * - ProposeLinkSummaryOutput - The return type for the proposeLinkSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProposeLinkSummaryInputSchema = z.object({
  causeTitle: z.string().describe('Title of the cause node.'),
  effectTitle: z.string().describe('Title of the effect node.'),
  sources: z
    .array(z.object({url: z.string(), title: z.string()}))
    .describe('Array of source URLs and titles.'),
  claim: z.string().describe('User claim about the causal link.'),
});
export type ProposeLinkSummaryInput = z.infer<typeof ProposeLinkSummaryInputSchema>;

const ProposeLinkSummaryOutputSchema = z.object({
  stance: z.enum(['support', 'refute', 'inconclusive']).describe('Stance on the claim.'),
  confidence: z.number().min(1).max(10).describe('Confidence score (1-10) in the assessment.'),
  summary: z.string().describe('Summary of the evidence.'),
  reasons: z.array(z.string()).max(5).describe('Reasons for the assessment.'),
  key_quotes: z
    .array(z.object({text: z.string(), cite: z.string()}))
    .max(3)
    .describe('Key quotes from the sources.'),
});
export type ProposeLinkSummaryOutput = z.infer<typeof ProposeLinkSummaryOutputSchema>;

export async function proposeLinkSummary(input: ProposeLinkSummaryInput): Promise<ProposeLinkSummaryOutput> {
  return proposeLinkSummaryFlow(input);
}

const proposeLinkSummaryPrompt = ai.definePrompt({
  name: 'proposeLinkSummaryPrompt',
  input: {schema: ProposeLinkSummaryInputSchema},
  output: {schema: ProposeLinkSummaryOutputSchema},
  prompt: `You assist evidence appraisal for causal claims.

Claim: '{{causeTitle}} leads to {{effectTitle}}'. Assess if the following sources support, refute, or are inconclusive. Summarize in ≤150 words. Provide JSON with fields:
stance: support|refute|inconclusive;
confidence: 1-10;
summary: string;
reasons: string[] (≤5);
key_quotes: {text:string, cite:string}[] (≤3).

Sources:
{{#each sources}}
Title: {{this.title}}
URL: {{this.url}}
{{/each}}
`,
  tools: [],
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const proposeLinkSummaryFlow = ai.defineFlow(
  {
    name: 'proposeLinkSummaryFlow',
    inputSchema: ProposeLinkSummaryInputSchema,
    outputSchema: ProposeLinkSummaryOutputSchema,
  },
  async input => {
    const {output} = await proposeLinkSummaryPrompt(input);
    return output!;
  }
);
