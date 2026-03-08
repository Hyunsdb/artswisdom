"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";

export function SomaticLabHero() {
  return (
    <section className="relative w-full h-[55vh] md:h-[70vh] min-h-[400px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.somaticLab.hero}
          alt="Somatic Lab Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/45" />

      {/* Content */}
      <div className="container relative z-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-[120px] lg:text-[150px] text-white italic leading-[0.9] [text-shadow:0_0_12px_rgba(0,0,0,0.35)]"
          style={{ fontFamily: "var(--font-libre-baskerville), 'Times New Roman', serif" }}
        >
          Somatic Laboratory
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-xs md:text-base text-white/90 tracking-[0.4em] font-light"
          style={{ fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif" }}
        >
          몸과 마음의 연결
        </motion.p>
      </div>
    </section>
  );
}
