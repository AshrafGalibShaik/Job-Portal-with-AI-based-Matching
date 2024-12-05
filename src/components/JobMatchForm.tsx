import React, { useState } from 'react';
import { FormField } from './FormField';
import { LoadingButton } from './LoadingButton';
import { FormData } from '../types/job-matcher';
import { JobMatcherService } from '../services/job-matcher';

const JOB_TYPES = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Remote', label: 'Remote' },
];

export function JobMatchForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.currentTarget;
    const formData: FormData = {
      skills: form.skills.value.split(",").map((skill: string) => skill.trim()),
      experience: form.experience.value,
      education: form.education.value,
      industry: form.industry.value,
      jobType: form.jobType.value,
      location: form.location.value,
      salaryExpectation: form.salaryExpectation.value,
      careerGoals: form.careerGoals.value,
      preferredCompanyCulture: form.companyCulture.value,
      additionalPreferences: form.additionalPreferences.value || "No additional preferences specified.",
    };

    try {
      const result = await JobMatcherService.generateRecommendations(formData);
      setRecommendations(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-4">
          <FormField
            id="skills"
            label="Skills (comma-separated)"
            placeholder="React, TypeScript, Node.js"
            required
          />

          <FormField
            id="experience"
            label="Years of Experience"
            placeholder="5 years"
            required
          />

          <FormField
            id="education"
            label="Education"
            placeholder="Bachelor's in Computer Science"
            required
          />

          <FormField
            id="industry"
            label="Preferred Industry"
            placeholder="Technology, Finance, Healthcare"
            required
          />

          <FormField
            id="jobType"
            label="Job Type"
            type="select"
            options={JOB_TYPES}
            required
          />

          <FormField
            id="location"
            label="Location Preference"
            placeholder="New York, Remote, Europe"
            required
          />

          <FormField
            id="salaryExpectation"
            label="Salary Expectation"
            placeholder="$100,000 - $150,000"
            required
          />

          <FormField
            id="careerGoals"
            label="Career Goals"
            type="textarea"
            placeholder="Describe your short and long-term career goals"
            required
          />

          <FormField
            id="companyCulture"
            label="Preferred Company Culture"
            type="textarea"
            placeholder="Describe your ideal work environment and company culture"
            required
          />

          <FormField
            id="additionalPreferences"
            label="Additional Preferences"
            type="textarea"
            placeholder="Any other preferences or requirements (optional)"
          />
          
          <LoadingButton
            loading={loading}
            text="Generate Recommendations"
            loadingText="Generating..."
          />
        </div>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {recommendations && (
        <div className="mt-6 bg-white shadow-sm rounded-lg">
          <div className="px-6 py-5">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recommendations }} />
          </div>
        </div>
      )}
    </div>
  );
}