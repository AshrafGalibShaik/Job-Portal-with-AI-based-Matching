import { FormData } from '../types/job-matcher';

export const buildJobMatchingPrompt = (formData: FormData): string => {
  return `
    As an AI job matching assistant, analyze the following candidate profile and provide detailed job recommendations.
    
    Candidate Profile:
    - Skills: ${formData.skills.join(", ")}
    - Years of Experience: ${formData.experience}
    - Education: ${formData.education}

    Job Search Parameters:
    - Preferred Industry: ${formData.industry}
    - Desired Job Type: ${formData.jobType}
    - Location Preference: ${formData.location}
    - Salary Expectation: ${formData.salaryExpectation}

    Career Context:
    - Career Goals: ${formData.careerGoals}
    - Preferred Company Culture: ${formData.preferredCompanyCulture}
    - Additional Preferences: ${formData.additionalPreferences}

    Please provide 3-5 job recommendations in the following markdown format:

    ## Job Recommendation 1
    - **Job Title**: [Title]
    - **Company**: [Company Name]
    - **Match Score**: [85-100]%
    - **Location**: [Location]
    - **Salary Range**: [Range]
    
    **Why This Role Matches:**
    - [3-4 bullet points explaining alignment]
    
    **Growth Opportunities:**
    - [2-3 bullet points about career progression]

    [Repeat format for remaining recommendations]

    Important: Be specific and realistic with recommendations. Focus on roles that closely match the candidate's skills and preferences.
  `.trim();
};