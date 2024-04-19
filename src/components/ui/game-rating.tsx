import { RATING_CSS } from "@/src/lib/game.config";
import { cn } from "@/src/lib/utils";
import { Rating } from "@prisma/client";
import { cva, VariantProps } from "class-variance-authority";

type Props = {
  rating: Rating;
};

const gameRatingVariants = cva("text-pretty font-extrabold", {
  variants: {
    size: {
      default: "text-3xl",
      2: "text-2xl ",
      3: "text-3xl",
      4: "text-4xl",
      5: "text-5xl",
      6: "text-6xl",
      7: "text-7xl",
      8: "text-8xl",
      9: "text-9xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const GameRating: React.FC<
  React.HTMLProps<HTMLParagraphElement> &
    VariantProps<typeof gameRatingVariants> &
    Props
> = ({ rating, className, size, ...props }) => {
  return (
    <>
      {rating.includes("S") ? (
        <p className="relative flex">
          <span
            className={cn(
              "absolute inline-flex font-extrabold text-yellow-200",
              gameRatingVariants({ size, className })
            )}
            {...props}
          >
            {rating}
          </span>
          <span
            className={cn(
              "relative inline-flex animate-pulse font-extrabold text-amber-500",
              gameRatingVariants({ size, className })
            )}
            {...props}
          >
            {rating}
          </span>
        </p>
      ) : (
        <p
          className={cn(
            RATING_CSS[rating],
            gameRatingVariants({ size, className })
          )}
          {...props}
        >
          {rating}
        </p>
      )}
    </>
  );
};

export default GameRating;
