"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function BrochureGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full shadow-2xl rounded-sm overflow-hidden"
        >
          {/* Main brochure image is very tall, so we don't set a fixed aspect ratio.
              Using an unoptimized img tag or next/image with layout responsive/fill.
              Since next/image needs width/height for normal usage without fill,
              we can use intrinsic or responsive layout, but in Next 13+ we can use
              sizes="100vw" style={{ width: '100%', height: 'auto' }} */}
          <Image
            src="https://refxscvyacxtohfjxysh.supabase.co/storage/v1/object/public/images/brochure/main-brochure.png"
            alt="지혜의밭 메인 브로슈어"
            width={1152}
            height={5000} // rough estimate of height to allow proper layout
            style={{ width: "100%", height: "auto" }}
            priority
            className="w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
