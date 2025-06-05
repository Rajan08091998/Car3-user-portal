"use client";

import { useScroll, useTransform } from "framer-motion";
import React, { ReactNode } from "react";
import { GoogleGeminiEffect } from "./google-gemini-effect";

export function GoogleGeminiEffectND({
  title,
  description,
  cta,
}: Readonly<{
  title?: string;
  description?: string;
  className?: string;
  cta?: ReactNode;
}>) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] pt-0 bg-white w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title={title}
        description={description}
        cta={cta}
        showLogo={true}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export function GoogleGeminiEffectLibrary({
  title,
  description,
  cta,
}: Readonly<{
  title?: string;
  description?: string;
  className?: string;
  cta?: ReactNode;
}>) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] pt-0 bg-white w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title={title}
        description={description}
        showLogo={false}
        cta={cta}
        className=""
        svgClassName="mt-[1rem]"
        titleClassNames=""
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
