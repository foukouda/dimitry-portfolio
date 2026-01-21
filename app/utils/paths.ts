// Helper function to get the correct path with basePath
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/dimitry-portfolio' : '';
  return `${basePath}${path}`;
}
