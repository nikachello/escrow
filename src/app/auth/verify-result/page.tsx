"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const s = searchParams.get("status");
    if (s === "invalid_token") {
      setStatus(s);
    } else {
      router.replace("/?email-verified=success");
    }
  }, [searchParams, router]);

  if (status === "invalid_token") {
    return (
      <div className="text-red-600 text-center mt-10">
        ❌ ბმული არასწორია ან ვადაგასულია. სცადეთ თავიდან რეგისტრაცია.
      </div>
    );
  }

  return null; // While redirecting
}

export default function VerifyResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyResult />
    </Suspense>
  );
}
