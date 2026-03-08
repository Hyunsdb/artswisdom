"use client";

import { Section } from "@/components/common";
import { MapPin, Phone, Train, Bus } from "lucide-react";

export function MapSection() {
  return (
    <Section id="map" background="white" className="bg-[#FCF3EB] pt-0 pb-12 md:pb-14">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-5 text-center text-[22px] font-semibold leading-[2.2em] text-[#85544D] md:text-[35px]">
          오시는 길
        </h2>

        <div className="mx-auto w-full max-w-[900px] overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EB%8C%80%EB%A6%BC%EB%A1%9C%20231&t=m&z=16&output=embed&iwloc=near"
            title="서울 영등포구 대림로 231"
            aria-label="서울 영등포구 대림로 231"
            className="h-[340px] w-full md:h-[435px]"
            loading="lazy"
          />
        </div>

        <div className="mx-auto mt-2 max-w-[900px] text-left font-['Noto_Sans_KR',sans-serif] text-[15px] leading-[2em] text-[#333] md:text-[17px] md:leading-[2.2em]">
          <div className="grid grid-cols-[34px_1fr] items-start gap-2 pt-[10px] md:grid-cols-[44px_1fr] md:pt-[17px]">
            <div className="flex justify-center pt-0.5 text-[#85544D]">
              <MapPin className="h-[25px] w-[25px] md:h-[33px] md:w-[33px]" strokeWidth={1.8} />
            </div>
            <p className="text-center md:text-left">
              <strong>주소</strong>
              <br />
              서울시 영등포구 대림로 231 MG 빌딩 3층 <span className="text-[#444447]">(서울특별시 영등포구 대림동 782-1, 3층)</span>
            </p>
          </div>

          <div className="grid grid-cols-[34px_1fr] items-start gap-2 pt-[6px] md:grid-cols-[44px_1fr] md:pt-[8px]">
            <div className="flex justify-center pt-0.5 text-[#85544D]">
              <Phone className="h-[25px] w-[25px] md:h-[33px] md:w-[33px]" strokeWidth={1.8} />
            </div>
            <p className="text-left">
              <strong>전화</strong> 070-8264-6477 / <strong>팩스</strong> 0504-387-6477
            </p>
          </div>

          <div className="grid grid-cols-[34px_1fr] items-start gap-2 pt-[6px] md:grid-cols-[44px_1fr] md:pt-[8px]">
            <div className="flex justify-center pt-0.5 text-[#85544D]">
              <Train className="h-[25px] w-[25px] md:h-[33px] md:w-[33px]" strokeWidth={1.8} />
            </div>
            <p className="text-center md:text-left">
              <strong>지하철 이용 시</strong>
              <br />
              7호선 대림역 12번 출구/2호선 5번 출구 → 마을버스 04번 환승(하차 후 도보 3분)
              <br />
              1,2호선 신도림역 2번 출구 → 5611번 YDP 평생학습관 하차
            </p>
          </div>

          <div className="grid grid-cols-[34px_1fr] items-start gap-2 pt-[6px] md:grid-cols-[44px_1fr] md:pt-[8px]">
            <div className="flex justify-center pt-0.5 text-[#85544D]">
              <Bus className="h-[25px] w-[25px] md:h-[33px] md:w-[33px]" strokeWidth={1.8} />
            </div>
            <p className="text-left">
              <strong>버스 이용 시</strong>
              <br />
              신영초등학교 정류장(19275) / 명지춘혜병원 정류장(19327) 하차
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
