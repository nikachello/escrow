"use client";

import { redirect, useSearchParams } from "next/navigation";

export default function VerifyResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (status === "invalid_token") {
    return (
      <div className="text-red-600 text-center mt-10">
        ❌ ბმული არასწორია ან ვადაგასულია. სცადეთ თავიდან რეგისტრაცია.
      </div>
    );
  }

  redirect("/?email-verified=success");
}
