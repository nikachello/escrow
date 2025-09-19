"use client";

import { useState } from "react";

const languages = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export default function LanguageDropdown() {
  const [current, setCurrent] = useState(
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("locale="))
      ?.split("=")[1] || "ka"
  );

  const changeLanguage = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    setCurrent(newLocale);

    window.location.reload();
  };

  return (
    <select
      value={current}
      onChange={(e) => changeLanguage(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
