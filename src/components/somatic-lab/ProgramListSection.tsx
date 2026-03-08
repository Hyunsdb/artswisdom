"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
import { type Program } from "@/types/database";

interface ProgramListSectionProps {
  programs: Program[];
}

export function ProgramListSection({ programs }: ProgramListSectionProps) {
  // Optional: A helper to get the specific label string per slug if needed, or just use subtitle.
  const getLabel = (slug: string) => {
    switch (slug) {
      case 'hanna-somatics': return "한나 소매틱스";
      case 'laban-dance-therapy': return "라반 댄스 테라피";
      case 'soma-healing-yoga': return "소마 힐링 요가";
      case 'soma-ballet': return "소마 발레";
      case 'move-move-body-body': return "무브 무브 바디 바디";
      case 'contact-improvisation': return "접촉즉흥 & 써클댄스";
      default: return "";
    }
  };

  return (
    <section id="program">
      {/* Program Header - Dark photo background */}
      <div className="relative h-[42vh] md:h-[56vh] min-h-[300px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.somaticLab.programsHeader}
            alt="Somatics Program"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/56" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-3xl md:text-6xl lg:text-7xl text-white italic"
          style={{ fontFamily: "var(--font-libre-baskerville), 'Times New Roman', serif" }}
        >
          Somatics Program
        </motion.h2>
      </div>

      {/* Programs List - alternating layout */}
      {programs.map((program, index) => {
        const isReverse = index % 2 === 1;
        const bgColor = index % 2 === 0 ? "bg-[#fcf3eb]" : "bg-[#efede1]";

        return (
          <div key={program.id} className={`${bgColor}`}>
            <div className="container py-0">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[420px] lg:min-h-[680px]`}
              >
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: isReverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative min-h-[260px] md:min-h-[360px] lg:min-h-[680px] ${
                    isReverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={program.image_url || ""}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isReverse ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex flex-col justify-center px-8 md:px-12 lg:px-20 py-12 lg:py-16 ${
                    isReverse ? "lg:order-1" : ""
                  }`}
                >
                  <p className="text-sm text-[#85544d] mb-3" style={{ fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif" }}>{getLabel(program.slug)}</p>
                  <h3
                    className="text-2xl md:text-[40px] text-[#85544D] mb-6 whitespace-pre-line leading-tight"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontWeight: 600,
                    }}
                  >
                    {program.title}
                  </h3>
                  <div className="space-y-4 text-[#5b5b5b] leading-relaxed whitespace-pre-line text-sm md:text-[15px]" style={{ fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif" }}>
                    <p>{program.description}</p>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {(program.features || []).map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-[#5b5b5b] text-sm md:text-[15px]"
                        style={{ fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif" }}
                      >
                        <span className="text-[#85544d] mt-0.5">–</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
