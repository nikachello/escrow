import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LandingSection from "../LandingSection";
import { useTranslations } from "next-intl";

const Faq = () => {
  const t = useTranslations("Landing");

  // Build faqs array dynamically with id, question, and answer
  const faqKeys = ["0", "1", "2"];
  const faqs = faqKeys.map((key) => ({
    id: key,
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }));

  return (
    <div className="pb-20 max-w-full">
      <LandingSection heading={t("faqHeading")}>
        <Accordion className="max-w-full" type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </LandingSection>
    </div>
  );
};

export default Faq;
