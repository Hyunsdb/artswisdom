"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/constants/images";

export function ArticleSection() {
  return (
    <section id="article" className="py-16 md:py-24 bg-[#fcf3eb]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="somatic-heading text-3xl md:text-[40px]">
                Somatics Article
              </h2>
              <h3 className="somatic-heading text-2xl">
                소매틱스 논문
              </h3>
              <div className="somatic-body space-y-4 leading-relaxed">
                <p>
                  ㈜지혜의밭은 세상에 따뜻함을 더하는 사회적기업으로
                  <br />
                  출발하여 소셜벤처 기업에 이어{" "}
                  <strong>소매틱연구전담부서</strong> 인증을 받았습니다.
                </p>
                <p>
                  소수 집단만이 가능했던 소매틱스를 널리 보급하기 위하여
                  <br />
                  국내외 논문 자료를 집대성한 최초의 페이지로
                  <br />
                  한국데이터산업진흥원의 지원으로 제작되었습니다.
                </p>
              </div>
              <Link
                href="/thesis"
                className="inline-block px-6 py-3 bg-[#85544D] text-white font-medium hover:bg-[#6f433c] transition-colors"
              >
                논문 보기
              </Link>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[787/478] w-full"
            >
              <Image
                src={images.somaticLab.somaticsResearch}
                alt="소매틱스 연구 논문"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.48)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
