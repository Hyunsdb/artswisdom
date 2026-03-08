"use client";

import { Section } from "@/components/common";
import { images } from "@/constants/images";
import { motion } from "framer-motion";
import Image from "next/image";


export function Greeting() {
  return (
    <Section id="greeting" className="bg-[var(--background)] py-20 lg:py-28 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left: CEO Portrait (Original Order) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start" // Align left
        >
          <div className="relative w-full aspect-[969/961] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.15)] lg:transform lg:translate-x-[20px] lg:-translate-y-[28px] lg:scale-[0.8]">
             <Image
              src={images.ceo.main}
              alt="대표이사 문수정"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </motion.div>

        {/* Right: Greeting Text (Original Order) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center lg:pt-14"
        >
          <h2 className="text-[38px] lg:text-[42px] font-serif font-bold text-[#805656] mb-8 leading-[1.2] tracking-tight">
            Welcome to<br />&nbsp;the Artswisdom
          </h2>

          <div className="space-y-6 text-[#555555] text-[15px] leading-[1.8] font-light">
            <p>
              인간의 최대 가치를 행복이라고 말합니다.<br />
              행복의 요건을 충족하려면 관계맺기를 잘 해야 하는데 가장 먼저 나와의 건강한 관계를<br className="hidden lg:block"/>
              형성하지 못하면, 처음에는 그럴듯하게 보이던 타인과의 관계도 어느덧 원만하지 못하여<br className="hidden lg:block"/>
              고통을 받게 됩니다.
            </p>
            <p>
              그 타인은 사랑하는 연인관계이며, 직장상사나 동료관계 이고, 공동체일 수도 있으며,<br className="hidden lg:block"/>
              이웃일 수도 있습니다.
            </p>
            <p>
              인간은 사회적 동물이기에 함께 있을 때 비로소 행복감을 느끼는데 함께 있는 것이<br className="hidden lg:block"/>
              고통이라면 문제가 아닐까요. 사랑하며, 사랑받고 싶어하는 인간의 기본 욕구가 온전히<br className="hidden lg:block"/>
              채워지지 않아서 다양한 사회문제가 야기됩니다.
            </p>
            <p>
              누구에게나 잠재되어 있는 무한한 가능성을 회복하여 삶의 터전을 지혜롭게 가꾼다면<br className="hidden lg:block"/>
              이 사회는 아름다운 사회, 살기 좋은 사회가 된다는 분명한 믿음으로 “지금 계신 그 곳이<br className="hidden lg:block" />
              지혜의 자리가 될 수 있도록…”<br className="hidden lg:block"/>
              힘을 보태는 지혜의밭이 될 것을 약속합니다.
            </p>
            <p>
              감사합니다.
            </p>
          </div>
        </motion.div>
      </div>

    </Section>
  );
}
