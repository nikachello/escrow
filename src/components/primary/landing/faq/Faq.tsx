import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LandingSection from "../LandingSection";

const faq = [
  {
    id: "1",
    question: "როგორ მუშაობს?",
    answer:
      "გამყიდველი ან მყიდველი საიტზე ქმნის გარიგებას შეთანხმებული პირობებით. თანხა გამყიდველის ანგარიშზე ხელშეუხებლად რჩება, სანამ მომხმარებელი სასურველ პროდუქციასა ან სერვისს არ მიიღებს",
  },
  {
    id: "2",
    question: "საკომისიო გაქვთ?",
    answer: "ჩვენი საკომისიო თითო ტრანზაქციის 2%-ია, მინიმუმ 50 თეთრი",
  },
  {
    id: "3",
    question: "რა ხდება თუ გარიგება არ შედგა?",
    answer:
      "გარიგებამდე ორივე მხარე ელექტრონულად აწერს ხელს თანხმობას იმაზე, რომ მოთხოვნები შესრულდება. წინააღმდეგ შემთხვევაში ჩვენი აგენტები განიხილავენ შემთხვევას და თანხას შესაბამისად განკარგავენ",
  },
];

const Faq = () => {
  return (
    <div className="pb-20 max-w-full">
      <LandingSection heading="ხშირად დასმული შეკითხვები">
        <Accordion className="max-w-full" type="single" collapsible>
          {faq.map((faq) => (
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
