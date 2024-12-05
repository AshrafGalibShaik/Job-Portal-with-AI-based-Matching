import { model } from '../config/ai-config';
import { FormData } from '../types/job-matcher';
import { buildJobMatchingPrompt } from '../utils/prompt-builder';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export class JobMatcherService {
  static async generateRecommendations(formData: FormData): Promise<string> {
    try {
      const promptText = buildJobMatchingPrompt(formData);
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptText }]}]
      });
      
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error("No recommendations were generated");
      }

      return md.render(text);
    } catch (error: any) {
      if (error?.message?.includes("PERMISSION_DENIED")) {
        throw new Error("Invalid API key. Please check your environment variables.");
      }
      
      if (error?.message?.includes("quota")) {
        throw new Error("API quota exceeded. Please try again later.");
      }

      throw new Error(error?.message || "Failed to generate recommendations. Please try again.");
    }
  }
}