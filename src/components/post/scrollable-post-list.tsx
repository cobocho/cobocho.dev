"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollablePostListProps {
  children: React.ReactNode;
}

const SCROLL_AMOUNT = 300;

export const ScrollablePostList = ({ children }: ScrollablePostListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const currentPost = el.querySelector<HTMLElement>(
      '[data-current-post="true"]',
    );

    if (currentPost) {
      const centerOffset =
        currentPost.offsetLeft -
        el.clientWidth / 2 +
        currentPost.offsetWidth / 2;
      el.scrollLeft = Math.max(0, centerOffset);
    }

    updateScrollState();
  }, [updateScrollState]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollLeftClick = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }, []);

  const scrollRightClick = useCallback(() => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }, []);

  return (
    <div className="group/scroll relative" role="presentation">
      {canScrollLeft && (
        <ScrollButton direction="left" onClick={scrollLeftClick} />
      )}
      {canScrollRight && (
        <ScrollButton direction="right" onClick={scrollRightClick} />
      )}
      <div
        ref={scrollRef}
        className="scrollbar-hide snap-children-start flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
};

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      className={`absolute top-1/2 z-10 hidden h-16 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/70 shadow-md backdrop-blur-sm transition-opacity duration-200 group-hover/scroll:flex dark:bg-neutral-800/70 ${
        isLeft ? "left-2" : "right-2"
      }`}
      onClick={onClick}
    >
      <Icon className="size-4 text-neutral-600 dark:text-neutral-300" />
    </button>
  );
}
