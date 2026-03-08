"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/contact/actions";

const homeContactSchema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  organization: z.string().optional(),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  phone: z.string().min(1, "전화번호를 입력해주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요"),
  privacyConsent: z.literal(true, {
    message: "개인정보 수집에 동의해주세요",
  }),
});

type HomeContactFormData = z.infer<typeof homeContactSchema>;

export function HomeContact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<HomeContactFormData>({
    resolver: zodResolver(homeContactSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: HomeContactFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="w-full font-['Noto_Sans_KR','Apple_SD_Gothic_Neo','Malgun_Gothic',sans-serif]">
      {submitStatus === "success" && (
        <div className="mb-3 border border-[#b7d7b9] bg-[#f4fff4] px-3 py-2 text-[14px] text-[#2f6b33]">
          문의가 성공적으로 접수되었습니다.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-3 border border-[#e6b8b8] bg-[#fff6f6] px-3 py-2 text-[14px] text-[#8f2b2b]">
          문의 접수 중 오류가 발생했습니다.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            id="home-name"
            type="text"
            placeholder="이름"
            className={`h-[44px] w-full border px-3 text-[15px] text-[#333] placeholder:text-[#8a8a8a] focus:outline-none ${
              errors.name ? "border-[#cc6666]" : "border-[#d6d6d6]"
            }`}
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "home-name-error" : undefined}
          />
          {errors.name && (
            <p id="home-name-error" className="mt-1 text-[13px] text-[#c64848]" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="home-organization"
            type="text"
            placeholder="소속(단체)"
            className="h-[44px] w-full border border-[#d6d6d6] px-3 text-[15px] text-[#333] placeholder:text-[#8a8a8a] focus:outline-none"
            {...register("organization")}
          />
        </div>

        <div>
          <input
            id="home-email"
            type="email"
            placeholder="이메일"
            className={`h-[44px] w-full border px-3 text-[15px] text-[#333] placeholder:text-[#8a8a8a] focus:outline-none ${
              errors.email ? "border-[#cc6666]" : "border-[#d6d6d6]"
            }`}
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "home-email-error" : undefined}
          />
          {errors.email && (
            <p id="home-email-error" className="mt-1 text-[13px] text-[#c64848]" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="home-phone"
            type="tel"
            placeholder="전화번호"
            className={`h-[44px] w-full border px-3 text-[15px] text-[#333] placeholder:text-[#8a8a8a] focus:outline-none ${
              errors.phone ? "border-[#cc6666]" : "border-[#d6d6d6]"
            }`}
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "home-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="home-phone-error" className="mt-1 text-[13px] text-[#c64848]" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="home-message"
            rows={6}
            placeholder="문의 내용"
            className={`w-full resize-none border px-3 py-2 text-[15px] text-[#333] placeholder:text-[#8a8a8a] focus:outline-none ${
              errors.message ? "border-[#cc6666]" : "border-[#d6d6d6]"
            }`}
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-[13px] text-[#c64848]" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="pt-1">
          <label className="flex cursor-pointer items-start gap-2 text-[14px] text-[#222]">
            <input
              type="checkbox"
              className="mt-[2px] h-4 w-4 border border-[#bfbfbf]"
              {...register("privacyConsent")}
              aria-invalid={errors.privacyConsent ? "true" : "false"}
              aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
            />
            <span>개인정보 활용 동의, 개인정보는 답변용으로만 활용됩니다.</span>
          </label>
          {errors.privacyConsent && (
            <p id="privacy-error" className="mt-1 text-[13px] text-[#c64848]" role="alert">
              {errors.privacyConsent.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-[42px] min-w-[120px] items-center justify-center border border-[#85544D] bg-[#85544D] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#734941] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "문의글을 제출 중입니다." : "보내기"}
        </button>
      </form>
    </div>
  );
}
