"use client";

import { useCallback } from "react";
import { ANIMATION } from "@/lib/constants";

interface UseAnimationDelayOptions {
  /** Base delay in seconds (default from constants) */
  baseDelay?: number;
  /** Increment per item in seconds (default from constants) */
  increment?: number;
}

/**
 * Hook for calculating staggered animation delays.
 * Useful for animating lists with sequential entrance effects.
 *
 * @example
 * const { getDelay } = useAnimationDelay();
 *
 * {items.map((item, idx) => (
 *   <BlurFade key={item.id} delay={getDelay(idx)}>
 *     <ItemCard item={item} />
 *   </BlurFade>
 * ))}
 *
 * // With custom timing
 * const { getDelay } = useAnimationDelay({ baseDelay: 0.2, increment: 0.1 });
 */
export function useAnimationDelay(options: UseAnimationDelayOptions = {}) {
  const { baseDelay = ANIMATION.BASE_DELAY, increment = ANIMATION.INCREMENT } =
    options;

  const getDelay = useCallback(
    (index: number) => baseDelay + index * increment,
    [baseDelay, increment],
  );

  return { getDelay };
}
