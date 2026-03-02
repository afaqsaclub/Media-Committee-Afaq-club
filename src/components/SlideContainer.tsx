import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SlideContainerProps {
    currentSlide: number;
    onNavigate: (index: number) => void;
    children: React.ReactNode[];
}

export const SlideContainer: React.FC<SlideContainerProps> = ({
    currentSlide,
    onNavigate,
    children
}) => {
    const [direction, setDirection] = useState(0);
    const totalSlides = React.Children.count(children);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigateTo = (newIndex: number) => {
        if (newIndex === currentSlide) return;
        setDirection(newIndex > currentSlide ? 1 : -1);
        onNavigate(newIndex);
    };

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) navigateTo(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) navigateTo(currentSlide - 1);
    };

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    // Swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // In RTL, left swipe means go to previous (right visually), right swipe means go to next (left visually)
        if (isRightSwipe) nextSlide();
        if (isLeftSwipe) prevSlide();
    };

    return (
        <div className="relative flex-1 w-full overflow-hidden flex flex-col items-center">
            {/* Navigation Arrows */}
            {currentSlide > 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-secondary text-white hover:text-primary p-3 rounded-full border-2 border-secondary/50 transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {currentSlide < totalSlides - 1 && (
                <button
                    onClick={nextSlide}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-secondary text-white hover:text-primary p-3 rounded-full border-2 border-secondary/50 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            <div
                className="w-full h-full relative"
                ref={containerRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full overflow-y-auto slide pb-24"
                    >
                        {React.Children.toArray(children)[currentSlide]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigateTo(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx
                                ? 'bg-primary scale-125 border-2 border-secondary'
                                : 'bg-primary/30 hover:bg-primary/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
