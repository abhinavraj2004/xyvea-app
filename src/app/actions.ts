'use server';

import { proposeLinkSummary, ProposeLinkSummaryInput } from '@/ai/flows/propose-link-summary';
import { evaluateCausalLink, EvaluateCausalLinkInput } from '@/ai/flows/evaluate-causal-link';
import { z } from 'zod';

const ProposeLinkActionSchema = z.object({
  causeTitle: z.string(),
  effectTitle: z.string(),
  sources: z.array(z.object({ url: z.string().url(), title: z.string() })),
  claim: z.string(),
});

type ProposeLinkActionInput = z.infer<typeof ProposeLinkActionSchema>;

export async function proposeLink(input: ProposeLinkActionInput) {
  const validatedInput = ProposeLinkActionSchema.safeParse(input);

  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }
  
  // In a real app, you would add user authentication checks here.
  
  try {
    const aiInput: ProposeLinkSummaryInput = {
      causeTitle: validatedInput.data.causeTitle,
      effectTitle: validatedInput.data.effectTitle,
      sources: validatedInput.data.sources,
      claim: validatedInput.data.claim,
    };

    const result = await proposeLinkSummary(aiInput);
    
    // In a real app, you'd now save this result to your Firestore 'edges' collection
    // with a 'pending' status.
    console.log('AI proposal result:', result);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in proposeLink server action:', error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while processing the proposal.' };
  }
}

const EvaluateLinkActionSchema = z.object({
  claim: z.string(),
  sources: z.array(z.object({ 
    url: z.string().url(), 
    title: z.string().optional(),
    text: z.string(),
  })),
});

type EvaluateLinkActionInput = z.infer<typeof EvaluateLinkActionSchema>;

export async function evaluateLink(input: EvaluateLinkActionInput) {
  const validatedInput = EvaluateLinkActionSchema.safeParse(input);

  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input for evaluation.' };
  }

  try {
    const aiInput: EvaluateCausalLinkInput = {
      claim: validatedInput.data.claim,
      sources: validatedInput.data.sources,
    };

    const result = await evaluateCausalLink(aiInput);
    
    // In a real app, you'd use this result to update the status of an existing
    // edge in your Firestore database.
    console.log('AI evaluation result:', result);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in evaluateLink server action:', error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while processing the evaluation.' };
  }
}
