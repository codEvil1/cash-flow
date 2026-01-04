import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  value: number;
}

export function RatingStars({ value }: RatingStarsProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;

  return (
    <>
      {[...Array(5)].map((_, index) => {
        if (index < fullStars)
          return <Star key={index} size={14} fill="currentColor" />;

        if (index === fullStars && hasHalfStar)
          return <StarHalf key={index} size={14} fill="currentColor" />;

        return <Star key={index} size={14} opacity={0.3} />;
      })}
    </>
  );
}
