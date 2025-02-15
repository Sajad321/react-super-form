import React, { useState, useEffect, useRef } from "react";

interface MarqueeProps {
    text: string;
    speed?: number; // Speed in pixels per second
    direction?: "left" | "right"; // Direction of the marquee
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = 50, direction = "left" }) => {
    const [isHovered, setIsHovered] = useState(true);
    const [marqueeDirection, setMarqueeDirection] = useState(direction);
    const marqueeRef = useRef<HTMLDivElement>(null);

    // Handle hover to pause/resume the marquee
    const handleMouseEnter = () => setIsHovered(false);
    const handleMouseLeave = () => setIsHovered(true);

    // Function to change direction
    // const toggleDirection = () => {
    //     setMarqueeDirection((prev) => (prev === "left" ? "right" : "left"));
    // };

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        let animationFrame: number;
        let position = 0;

        const animate = () => {
            if (marqueeElement) {
                if (!isHovered) {
                    // Update position based on the direction
                    position += marqueeDirection === "left" ? -speed / 60 : speed / 60;
                    marqueeElement.style.transform = `translateX(${position}px)`;

                    // Reset position if marquee goes out of view
                    if (marqueeDirection === "left" && marqueeElement.offsetWidth + position <= 0) {
                        position = window.innerWidth;
                    }
                    if (marqueeDirection === "right" && position >= window.innerWidth) {
                        position = -marqueeElement.offsetWidth;
                    }
                }
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [isHovered, marqueeDirection, speed]);

    return (
        <div
            className="relative overflow-hidden whitespace-nowrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={marqueeRef} className="inline-block w-32">
                {text}
            </div>
        </div>
    );
};

export default Marquee;
