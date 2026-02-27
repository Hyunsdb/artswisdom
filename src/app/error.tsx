'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#FAF7F2] text-center px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">예기치 못한 오류가 발생했습니다.</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        페이지를 불러오는 중 문제가 발생했습니다. 일시적인 현상일 수 있으니 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={() => reset()}
        className="rounded bg-[#374151] px-6 py-2.5 text-white font-medium hover:bg-[#2c3441] transition-colors"
      >
        다시 시도하기
      </button>
    </div>
  );
}
