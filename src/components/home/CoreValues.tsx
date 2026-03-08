"use client";

import Image from "next/image";
import { Section } from "@/components/common";
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
          {coreValues.map((item) => (
            <div
              key={item.title}
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
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed md:whitespace-nowrap">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
