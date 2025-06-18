export const cleanResponse = (response: string) => {
  return response
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .replace(/,\s*([}\]])/g, '$1');
};
