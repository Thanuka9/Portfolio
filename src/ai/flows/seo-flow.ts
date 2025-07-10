
'use server';
/**
 * @fileOverview An AI flow for generating SEO meta tags.
 *
 * - generateSeoMetaTags - A function that creates a title and description based on keywords.
 * - GenerateSeoMetaTagsInput - The input type for the generateSeoMetaTags function.
 * - GenerateSeoMetaTagsOutput - The return type for the generateSeoMetaTags function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateSeoMetaTagsInputSchema = z.object({
  keywords: z.string().describe('A comma-separated list of keywords to target.'),
});
export type GenerateSeoMetaTagsInput = z.infer<typeof GenerateSeoMetaTagsInputSchema>;

const GenerateSeoMetaTagsOutputSchema = z.object({
  title: z.string().describe('An SEO-optimized title, around 50-60 characters.'),
  description: z.string().describe('An SEO-optimized meta description, around 150-160 characters.'),
});
export type GenerateSeoMetaTagsOutput = z.infer<typeof GenerateSeoMetaTagsOutputSchema>;

export async function generateSeoMetaTags(input: GenerateSeoMetaTagsInput): Promise<GenerateSeoMetaTagsOutput> {
  return generateSeoMetaTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoMetaTagsPrompt',
  input: { schema: GenerateSeoMetaTagsInputSchema },
  output: { schema: GenerateSeoMetaTagsOutputSchema },
  prompt: `You are an SEO expert. Given the following keywords, generate a compelling and SEO-optimized title and meta description.

The title should be concise and around 50-60 characters.
The meta description should be engaging and around 150-160 characters.

Keywords: {{{keywords}}}`,
});

const generateSeoMetaTagsFlow = ai.defineFlow(
  {
    name: 'generateSeoMetaTagsFlow',
    inputSchema: GenerateSeoMetaTagsInputSchema,
    outputSchema: GenerateSeoMetaTagsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
