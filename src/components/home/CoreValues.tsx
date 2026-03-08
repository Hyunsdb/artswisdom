"use client";

import Image from "next/image";
import { Section } from "@/components/common";
import { motion } from "framer-motion";
import { images } from "@/constants/images";

interface CoreValueItem {
  imageSrc: string;
  title: string;
  description: string;
}

const coreValues: CoreValueItem[] = [
  {
    imageSrc: images.values.differentiation,
    title: "차별성",
    description: "디테일의 차이가 감동으로 이어진다.",
  },
  {
    imageSrc: images.values.inclusivity,
    title: "포용성",
    description: "지속 가능한 성장을 위하여 변화를 수용한다.",
  },
  {
    imageSrc: images.values.connectivity,
    title: "연결성",
    description: "모든 에너지는 서로 연결되어 있으므로 우리는 하나다.",
  },
];

export function CoreValues() {
  return (
    <Section id="core-values" className="py-16 md:py-20 bg-[#f3ece4]">
      <div className="container text-center">
        {/* Section Title */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8c5a5a] tracking-normal mb-2">
            Core Value
          </h2>
          <div className="w-24 h-[4px] bg-[#6f6f6f] mx-auto opacity-90"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 max-w-6xl mx-auto">
          {coreValues.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              {/* Icon Circle */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-6 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <div className="relative w-full h-full p-4">
                    <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    />
                </div>
              </div>

              {/* Text Content: keep text block centered on the same vertical axis as the image */}
              <div className="w-36 md:w-44 text-center">
                <h3 className="text-[42px] leading-none font-serif font-bold text-[#8c5a5a] mb-2">{item.title}</h3>
                <p className="text-[#555] text-[26px] break-keep leading-[1.35] font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
