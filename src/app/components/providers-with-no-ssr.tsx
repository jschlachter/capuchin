"use client";

import dynamic from "next/dynamic";

export default dynamic(() => import("./Providers"), {
  ssr: false,

  loading: () => (
    <div className="flex flex-col h-screen animate-pulse items-center justify-center bg-background">
      <div className="flex items-center gap-3">
        <div className="text-xl">Loading</div>{" "}
        <div
          className="h-4 w-4 rounded-full bg-muted animate-bounce"
          style={{
            animationDuration: "0.8s",
            animationTimingFunction: "cubic-bezier(.5,1.5,.5,1)",
            animationName: "bounce1",
          }}
        />
        <div
          className="h-4 w-4 rounded-full bg-muted animate-bounce"
          style={{
            animationDuration: "1.2s",
            animationTimingFunction: "cubic-bezier(.5,1.2,.5,1)",
            animationName: "bounce2",
          }}
        />
        <div
          className="h-4 w-4 rounded-full bg-muted animate-bounce"
          style={{
            animationDuration: "1s",
            animationTimingFunction: "cubic-bezier(.5,1.8,.5,1)",
            animationName: "bounce3",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes bounce1 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes bounce2 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce3 {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  ),
});

// Add a fixed delay so you can see the loading state
async function delayForDemo<T>(promise: Promise<T>): Promise<T> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });
  const mod = await promise;
  return mod;
}
