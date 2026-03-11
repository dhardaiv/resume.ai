/**
 * Client for the FastAPI matching backend.
 */

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? '';

export type MatchRequest = {
  resume_text: string;
  job_description: string;
};

export type MatchResponse = {
  score: number;
  message?: string;
};

export async function getMatchScore(
  resumeText: string,
  jobDescription: string
): Promise<MatchResponse> {
  const res = await fetch(`${getBaseUrl()}/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      resume_text: resumeText,
      job_description: jobDescription,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
