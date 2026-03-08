import Image from "next/image";
import { Section } from "@/components/common";
import { images } from "@/constants/images";
import { getTimeline } from "@/lib/queries";

function getTimelineImage(year: number): string {
  const key = year as keyof typeof images.timeline;
  const image = images.timeline[key];
  return typeof image === "string" ? image : images.hero.main;
}

export async function Timeline() {
  const timeline = await getTimeline();

  const timelineByYear = timeline.reduce<Record<number, typeof timeline>>((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  const years = Object.keys(timelineByYear)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 8);

  return (
    <Section id="history" background="gray" className="py-20 md:py-32">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8c5a5a] tracking-wide mb-2">
          Timeline of Artswisdom
        </h2>
        <div className="w-16 h-1 bg-[#8c5a5a] mx-auto mt-4 opacity-70"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-12 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {years.map((year) => {
            const items = timelineByYear[year]
              .slice()
              .sort((a, b) => {
                const monthDiff = (b.month ?? 0) - (a.month ?? 0);
                if (monthDiff !== 0) return monthDiff;
                return a.order - b.order;
              });

            return (
              <article key={year} className="flex flex-col">
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-white shadow-md border border-gray-100">
                  <Image
                    src={getTimelineImage(year)}
                    alt={`${year}년 연혁`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-[#8c5a5a] text-white px-5 py-2 font-bold text-xl shadow-md">
                    {year}
                  </div>
                </div>

                <ul className="space-y-2 px-1">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="text-gray-700 text-[15px] leading-relaxed break-keep flex items-start gap-2"
                    >
                      <span className="text-[#8c5a5a] font-semibold min-w-[2.2rem]">
                        {item.month ? `${item.month}월` : "-"}
                      </span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
