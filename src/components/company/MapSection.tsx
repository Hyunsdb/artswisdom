"use client";

import { Section } from "@/components/common";
import { MapPin, Phone, Train, Bus } from "lucide-react";

export function MapSection() {
  return (
    <Section id="map" background="white" className="pt-4 pb-14 md:pt-0 md:pb-16">
      <div className="mx-auto max-w-[1140px]">
        <h2 className="mb-4 text-center text-[22px] font-semibold text-[#2b2b2b] md:mb-6 md:text-[30px]">
          오시는 길
        </h2>

        <div className="w-full overflow-hidden bg-[#f5f5f5]">
          <iframe
            src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EB%8C%80%EB%A6%BC%EB%A1%9C%20231&t=m&z=16&output=embed&iwloc=near"
            title="서울 영등포구 대림로 231"
            aria-label="서울 영등포구 대림로 231"
            className="h-[340px] w-full md:h-[420px]"
            loading="lazy"
          />
        </div>

        <div className="mt-3 space-y-2 text-[15px] text-[#2b2b2b] md:mt-4">
          <div className="grid grid-cols-[38px_1fr] items-start gap-2">
            <div className="flex justify-center pt-0.5 text-[#2b2b2b]">
              <MapPin className="h-[25px] w-[25px]" strokeWidth={1.8} />
            </div>
            <p className="leading-[1.9] md:leading-[2]">
              <strong>주소</strong>
              <br />
              서울시 영등포구 대림로 231 MG 빌딩 3층 (서울특별시 영등포구 대림동 782-1, 3층)
            </p>
          </div>

          <div className="grid grid-cols-[38px_1fr] items-start gap-2">
            <div className="flex justify-center pt-0.5 text-[#2b2b2b]">
              <Phone className="h-[25px] w-[25px]" strokeWidth={1.8} />
            </div>
            <p className="leading-[1.9] md:leading-[2]">
              <strong>전화</strong> 070-8264-6477 / <strong>팩스</strong> 0504-387-6477
            </p>
          </div>

          <div className="grid grid-cols-[38px_1fr] items-start gap-2">
            <div className="flex justify-center pt-0.5 text-[#2b2b2b]">
              <Train className="h-[25px] w-[25px]" strokeWidth={1.8} />
            </div>
            <p className="leading-[1.9] md:leading-[2]">
              <strong>지하철 이용 시</strong>
              <br />
              7호선 대림역 12번 출구/2호선 5번 출구 → 마을버스 04번 환승(하차 후 도보 3분)
              <br />
              1,2호선 신도림역 2번 출구 → 5611번 YDP 평생학습관 하차
            </p>
          </div>

          <div className="grid grid-cols-[38px_1fr] items-start gap-2">
            <div className="flex justify-center pt-0.5 text-[#2b2b2b]">
              <Bus className="h-[25px] w-[25px]" strokeWidth={1.8} />
            </div>
            <p className="leading-[1.9] md:leading-[2]">
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
