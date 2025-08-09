'use server';
/**
 * @fileOverview A flow for re-evaluating an existing causal link using Mistral AI.
 *
 * - evaluateCausalLink - A function that handles the re-evaluation of a causal link.
 * - EvaluateCausalLinkInput - The input type for the evaluateCausalLink function.
 * - EvaluateCausalLinkOutput - The return type for the evaluateCausalLink function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateCausalLinkInputSchema = z.object({
  claim: z.string().describe('The causal claim to evaluate, e.g., cause leads to effect.'),
  sources: z.array(
    z.object({
      url: z.string().url().describe('The URL of the source.'),
      title: z.string().optional().describe('The title of the source.'),
      text: z.string().describe('Extracted text content from the source.'),
    })
  ).describe('A list of evidence sources to consider.'),
});
export type EvaluateCausalLinkInput = z.infer<typeof EvaluateCausalLinkInputSchema>;

const EvaluateCausalLinkOutputSchema = z.object({
  stance: z.enum(['support', 'refute', 'inconclusive']).describe('The stance of the sources towards the claim.'),
  confidence: z.number().min(1).max(10).describe('A confidence score (1-10) for the stance.'),
  summary: z.string().describe('A summary of the evidence appraisal.'),
  reasons: z.array(z.string()).max(5).describe('Key reasons for the stance.'),
  key_quotes: z.array(
    z.object({
      text: z.string().describe('A relevant quote from the source.'),
      cite: z.string().describe('Citation for the quote (e.g., URL or title).'),
    })
  ).max(3).describe('Key quotes supporting the stance.'),
});
export type EvaluateCausalLinkOutput = z.infer<typeof EvaluateCausalLinkOutputSchema>;

export async function evaluateCausalLink(input: EvaluateCausalLinkInput): Promise<EvaluateCausalLinkOutput> {
  return evaluateCausalLinkFlow(input);
}

const evaluateCausalLinkPrompt = ai.definePrompt({
  name: 'evaluateCausalLinkPrompt',
  input: {schema: EvaluateCausalLinkInputSchema},
  output: {schema: EvaluateCausalLinkOutputSchema},
  prompt: `You assist evidence appraisal for causal claims.

Claim: {{{claim}}}. Assess if the following sources support, refute, or are inconclusive. Summarize in ≤150 words. Provide JSON with the following format:

{
  "stance": "support|refute|inconclusive",
  "confidence": 1-10,
  "summary": "string",
  "reasons": string[] (≤5),
  "key_quotes": {text:string, cite:string}[] (≤3)
}

Sources:
{{#each sources}}
Title: {{title}}
URL: {{url}}
Text: {{text}}
{{/each}}`,
});

const evaluateCausalLinkFlow = ai.defineFlow(
  {
    name: 'evaluateCausalLinkFlow',
    inputSchema: EvaluateCausalLinkInputSchema,
    outputSchema: EvaluateCausalLinkOutputSchema,
  },
  async input => {
    const {output} = await evaluateCausalLinkPrompt(input);
    return output!;
  }
);
