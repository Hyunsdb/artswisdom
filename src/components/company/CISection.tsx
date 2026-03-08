"use client";

import Image from "next/image";
import { Section } from "@/components/common";
import { images } from "@/constants/images";
import { motion } from "framer-motion";

const ciItems = [
  {
    title: "< 심볼마크 >",
    image: images.logo.symbol,
    items: [
      "키워드 : 밭 전(田), 지혜의 밭(ㅈ, ㅎ, ㅇ, ㅂ)",
      "디자인 : 삶의 터전이자 긍정적인 결실을 맺는 수확의 공간을 의미하는 밭에서\n모티브를 얻어 '밭전(田)'자를 단순화 하였으며, 지혜의밭 자음(ㅈ, ㅎ, ㅇ, ㅂ)활용",
    ],
  },
  {
    title: "< 기본형 로고 >",
    image: images.logo.basic,
    items: [
      "'밭 전(田)'자를 단순화 하였고 지혜의밭 자음(ㅈ, ㅎ, ㅇ, ㅂ) 활용",
      "지혜의밭에서 추구하는 ‘소통, 공감, 공연, 치유’의 키워드를 담은 그래픽 모티브 사용",
    ],
  },
  {
    title: "< 그래픽 모티브 >",
    image: images.logo.expanded,
    items: ["소통의 ‘대화’", "공감의 ‘어깨동무’", "예술의 ‘춤과 공연’", "치유의 ‘꽃’"],
  },
  {
    title: "< 시그니춰 로고 >",
    image: images.logo.brochure, // Note: The elementor uses brochure logo for signature
    imageClassName: "object-contain object-center scale-[1.5]", // making it slightly bigger if needed
    items: ["가로형 로고 심볼과 ‘소통·공감·해소·통섭’ 레터마크 혼합형"],
  },
  {
    title: "< 한글 레터마크 >",
    image: images.logo.lettermark,
    items: [
      "심볼의 정사각형 조형을 바탕으로 한글 로고타입 디자인",
      "모던라이프의 Light 폰트를 바탕으로 지혜의밭만의 한글 로고타입",
    ],
  },
];

const colors = [
  {
    image: images.ci?.yellow || `${images.logo.main}`, // Fallback if missing
    desc: "긍정의 에너지\n(Bright Yellow)\nCMYK 0 20 100 0",
  },
  {
    image: images.ci?.orange || `${images.logo.main}`,
    desc: "따뜻한 온정\n(Warm Orange)\nCMYK 0 85 100 0",
  },
  {
    image: images.ci?.green || `${images.logo.main}`,
    desc: "마음의 안정\n(Calm Green)\nCMYK 45 10 100 0",
  },
  {
    image: images.ci?.blue || `${images.logo.main}`,
    desc: "내면의 치유\n(Deep Blue)\nCMYK 100 100 0 15",
  },
];

export function CISection() {
  return (
    <Section id="ci" className="py-20 md:py-[100px] bg-[#FCF3EB] relative">
      <div className="max-w-[900px] mx-auto px-4 md:px-0">
        <h2 className="text-center text-[36px] md:text-[40px] font-bold text-[#85544D] mb-[60px] tracking-tight font-['Times_New_Roman',_times,_serif]">
          C.I
        </h2>

        <div className="flex flex-col space-y-[60px] md:space-y-[80px]">
          {ciItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start justify-start gap-[30px] md:gap-[5%]"
            >
              {/* Image Column */}
              <div className="w-full md:w-[30%] flex justify-center md:justify-end">
                <div className="relative w-full max-w-[150px] md:max-w-[130px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-[65%] flex flex-col justify-start pt-0 md:pt-[10px]">
                <div className="text-left font-['Noto_Sans_KR',_sans-serif]">
                  <h3 className="text-[14px] font-bold text-[#2B2B2B] mb-2">{item.title}</h3>
                  <ul className="list-disc pl-5 space-y-[4px] text-left text-[#2B2B2B] text-[14px] md:text-[14px] font-normal leading-[1.6] tracking-tight marker:text-[#2B2B2B]">
                    {item.items.map((line, lineIdx) => (
                      <li key={lineIdx} className="pl-0 relative -left-1">
                        {line.split('\n').map((l, i) => (
                          <span key={i}>
                            {l}
                            {i < line.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Color System */}
        <div className="mt-20 md:mt-32 border-t-2 border-[#5B5B5B] pt-16">
          <h2 className="text-center text-[28px] md:text-[32px] font-bold text-[#2B2B2B] mb-[40px] tracking-tight font-['Noto_Sans_KR',_sans-serif]">
            컬러 시스템
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-[4%]">
            {colors.map((color, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] mb-6">
                  <Image
                    src={color.image}
                    alt="Color"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center text-[#2B2B2B] text-[14px] md:text-[15px] font-normal font-['Noto_Sans_KR',_sans-serif] leading-[1.6]">
                  {color.desc.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < color.desc.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
