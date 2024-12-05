export interface FormData {
  skills: string[];
  experience: string;
  education: string;
  industry: string;
  jobType: string;
  location: string;
  salaryExpectation: string;
  careerGoals: string;
  preferredCompanyCulture: string;
  additionalPreferences: string;
}

export interface JobRecommendation {
  jobTitle: string;
  companyName: string;
  matchPercentage: number;
  reasons: string[];
  alignment: string;
  salaryRange: string;
  growthOpportunities: string;
}