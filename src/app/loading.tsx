export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FAF7F2]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#374151]"></div>
        <p className="text-gray-600 font-medium tracking-wide">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}
