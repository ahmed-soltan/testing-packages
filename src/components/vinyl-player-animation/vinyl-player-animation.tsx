"use client";

import Image, { StaticImageData } from "next/image";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import DiskImage from "@/assets/music-disk.jpg";

import MotionPathPlugin from "gsap/MotionPathPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

interface VinylPlayerAnimationProps {
  textsPrimary: string[];
  textSecondary: string;
}

const VinylPlayerAnimation = ({
  textsPrimary,
  textSecondary,
}: VinylPlayerAnimationProps) => {
  const container = useRef(null);

  useEffect(() => {
    document
      .getElementById("def-1")
      ?.setAttribute(
        "d",
        document?.getElementById("path-1")?.getAttribute("d")!
      );
    document
      .getElementById("def-2")
      ?.setAttribute(
        "d",
        document?.getElementById("path-2")?.getAttribute("d")!
      );
  }, []);

  useGSAP(
    () => {
      const animateText = (selector: string, delay: number) => {
        gsap.to(selector, {
          attr: { startOffset: "100%" },
          ease: "linear",
          duration: 6,
          repeat: -1,
          delay,
        });
      };

      animateText("#Text1", 0);
      animateText("#Text2", 2);
      animateText("#Text3", 4);

      gsap.to(".disk", {
        rotate: 360,
        ease: "linear",
        duration: 2,
        repeat: -1,
      });
    },
    { scope: container }
  );
  return (
    <div className="container" ref={container}>
      <svg
        xmlns="https://www.w3.org/2000/sv"
        viewBox="0 0  350 350"
        width={"800px"}
        height={"600px"}
        id="text-primary"
      >
        <defs>
          <path className="def-1" />
        </defs>
        <path
          id="path-1"
          d="M -393 405 C -53 405 -73 5 177 5 c 427 5 407 405 747 405"
        />
        <text>
          {textsPrimary.map((text, index) => (
            <textPath
              key={index}
              id={`Text${index + 1}`}
              xlinkHref="#def-1"
              startOffset={"-25%"}
            >
              {text}
            </textPath>
          ))}
        </text>
      </svg>

      <svg
        xmlns="https://www.w3.org/2000/sv"
        viewBox="0 0  350 350"
        width={"800px"}
        height={"600px"}
        id="text-secondary"
      >
        <defs>
          <path className="def-2" />
        </defs>
        <path
          id="path-2"
          d="M -393 60 C -53 60 -70 365 180 365 c 421 352 407 60 725 56"
        />
        <text x={"50%"} y={"50%"} dominantBaseline={"end"} textAnchor="middle">
          <textPath id={`Text5`} xlinkHref="#def-2" startOffset={"-37%"}>
            {textSecondary}
          </textPath>
        </text>
      </svg>

      <div className="disk">
        <Image
          src={DiskImage}
          alt="Vinyl Disk"
          width={400}
          height={400}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default VinylPlayerAnimation;
