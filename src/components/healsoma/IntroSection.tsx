"use client";

import { motion } from "framer-motion";

export function IntroSection() {
  return (
    <section className="bg-[#B6C2AE] px-5 py-10 text-center md:px-0 md:py-[60px]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-[1200px]"
        >
          <h2 className="mb-4 text-[18px] font-semibold text-[#2B2B2B] md:mb-6 md:text-[35px]">
            일상의 쉼을 더하는 곳!
          </h2>
          
          <div className="mx-auto mb-0 text-[15px] text-[#5B5B5B] leading-[1.9] md:text-[20px] md:leading-[1.8]">
            <p>
              &quot;당신도 온전한 쉼이 필요하다&quot;
              <br />
              분주한 일상 너머, 깊은 쉼을 통해 평온함을 선사하는 공간.
              <br />
              몸에 깃든 감각을 깨우고, 마음의 결을 다독이는 나를 위한 작은 사치.
            </p>
          </div>

          <div className="mt-2 text-[15px] text-[#5B5B5B] leading-[1.9] md:mt-4 md:text-[20px] md:leading-[1.8]">
            <p>
              <strong>온전한 쉼&apos; 힐소마는</strong>
              <br />
              <strong>Heal</strong>(치유하다,회복하다) + <strong>Soma</strong>(지성,감성,영성이 깃든 몸)의 합성어로
              <br />
              &quot;온전한 쉼을 통해 몸과 마음을 회복하다&quot;라는 의미입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
