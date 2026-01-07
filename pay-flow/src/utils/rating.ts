export function calculateAverageRating(ratings: number[]): number {
  if (!ratings.length) return 0;

  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  return Number((total / ratings.length).toFixed(1));
}
