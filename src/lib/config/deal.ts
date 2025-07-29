import { DealStatus, DealStatusConfig, UserRole } from "../types/deal";

export const dealStatusConfig: Record<
  DealStatus,
  Record<UserRole, DealStatusConfig>
> = {
  pending: {
    buyer: {
      title: "ველოდებით მეორე მხარის თანხმობას",
      description:
        "მას შემდეგ რაც მეორე მხარე გადახედავს გარიგებას, მას შეუძლია დაეთანხმოს ან გააუქმოს ის. გადაწყვეტილებას ელ-ფოსტაზე მიიღებთ",
      badge: {
        text: "● სჭირდება დათანხმება",
        variant: "secondary",
      },
      timelineStatus: "agreement",
    },
    seller: {
      title: "განიხილეთ და დაეთანხმეთ გარიგებას",
      description: "გთხოვთ გადაავლოთ თვალი გარიგებას",
      badge: {
        text: "● სჭირდება დათანხმება",
        variant: "secondary",
      },
      actions: [
        { label: "დათანხმება", variant: "default", action: "agree" },
        {
          label: "გარიგების გაუქმება",
          variant: "destructive",
          action: "cancel",
        },
      ],
      timelineStatus: "agreement",
    },
  },
  agreed: {
    buyer: {
      title: "დროა გადაიხადოთ",
      description:
        "თქვენ უნდა გადაიხადოთ თანხა, ის დაცულად იქნება შენახული ჩვენთან სანამ კუთვნილ ნივთებს ან სერვისს არ მიიღებთ. თქვენს გადახდას ჩვენი სისტემა ავტომატურად აღიქვამს და შეთანხმებაც შემდეგ ეტაპზე გადავა",
      badge: {
        text: "● ველოდებით გადახდას",
        variant: "secondary",
      },
      actions: [
        { label: "გადახდა", variant: "default", action: "pay" },
        { label: "გაუქმება", variant: "destructive", action: "cancel" },
      ],
      timelineStatus: "payment",
    },
    seller: {
      title: "ველოდებით გადახდას",
      description:
        "თქვენ დაეთანხმეთ გარიგებას. ახლა ველოდებით მყიდველისგან თანხის ჩარიცხვას. მის გადახდას ჩვენი სისტემა ავტომატურად აღიქვამს და ჩვენ ამის შესახებ შეტყობინებას გამოგიგზავნით. მას შემდეგ რაც თანხას მივიღებთ, შეგიძლიათ პროდუქცია აუღელვებლად გააგზავნოთ, თქვენი თანხა ჩვენთან საიმედოდ იქნება შენახული",
      badge: {
        text: "● ველოდებით გადახდას",
        variant: "secondary",
      },
      timelineStatus: "payment",
    },
  },
  paid: {
    buyer: {
      title: "გადახდა შესრულებულია",
      description:
        "მშვენიერია, თქვენი გადახდა სისტემაში ასახულია და ჩვენის ამის შესახებ გამყიდველს უკვე ვაცნობეთ! ახლა დაელოდეთ იმას, თუ როდის გამოგიგზავნით ის ნივთებს. სიახლეებს ელ-ფოსტისა და ამ გვერდის საშუალებით იხილავთ",
      badge: {
        text: "● ველოდებით გაგზავნას",
        variant: "secondary",
      },
      timelineStatus: "delivery",
    },
    seller: {
      title: "გაგზავნეთ ნივთი",
      description:
        "მომხმარებელმა თანხა გადაიხადა. ახლა თქვენ შეგიძლიათ ნივთები უსაფრთხოდ გააგზავნოთ. დაიმახსოვრეთ, რომ შეთანხმებულ ვადებში უნდა ჩაეტიოთ, წინააღმდეგ შემთხვევაში მომხმარებელს ჩივილი და თანხის დაბრუნება შეეძლება",
      badge: {
        text: "● ველოდებით გაგზავნას",
        variant: "secondary",
      },
      actions: [
        { label: "ატვირთეთ ტრექინგი", variant: "default", action: "ship" },
      ],
      timelineStatus: "delivery",
    },
  },
  shipped: {
    buyer: {
      title: "ნივთი გაიგზავნა",
      description:
        "გამყიდველმა ნივთები გამოაგზავნა. გთხოვთ დაელოდოთ ნივთების მიღებას, კითხვების შემთხვევაში მიმართეთ გამყიდველს ან ჩვენ",
      badge: {
        text: "● გაგზავნილია",
        variant: "outline",
      },
      actions: [
        { label: "მივიღე", variant: "default", action: "confirm_delivery" },
      ],
      timelineStatus: "delivery",
    },
    seller: {
      title: "ნივთი გაგზავნილია",
      description:
        "სტატუსი წარმატებით შეიცვალა, ველოდებით მიღების დადასტურებას",
      badge: {
        text: "● გაგზავნილია",
        variant: "outline",
      },
      timelineStatus: "delivery",
    },
  },
  delivered: {
    buyer: {
      title: "ნივთი მიღებულია",
      description:
        "თქვენ დაადასტურეთ ნივთის მიღება. გთხოვთ შეამოწმეთ ნივთები, კმაყოფილების შემთხვევაში დაასრულეთ გარიგება",
      badge: {
        text: "● მიღებულია",
        variant: "outline",
      },
      actions: [
        {
          label: "გარიგების დასრულება",
          variant: "default",
          action: "complete",
        },
        {
          label: "პრობლემის შეტყობინება",
          variant: "destructive",
          action: "dispute",
        },
      ],
      timelineStatus: "inspection",
    },
    seller: {
      title: "ველოდებით დასრულებას",
      description:
        "მყიდველმა მიიღო ნივთი. ველოდებით მისი მხრიდან გარიგების დასრულებას",
      badge: {
        text: "● მიღებულია",
        variant: "outline",
      },
      timelineStatus: "inspection",
    },
  },
  completed: {
    buyer: {
      title: "გარიგება დასრულებულია",
      description: "გარიგება წარმატებით დასრულდა. თანხა ჩაერიცხება გამყიდველს",
      badge: {
        text: "● დასრულებული",
        variant: "outline",
      },
      timelineStatus: "closed",
    },
    seller: {
      title: "გარიგება დასრულებულია",
      description:
        "გარიგება წარმატებით დასრულდა. თანხა თქვენს ანგარიშზე ჩაირიცხება",
      badge: {
        text: "● დასრულებული",
        variant: "outline",
      },
      timelineStatus: "closed",
    },
  },
  cancelled: {
    buyer: {
      title: "გარიგება გაუქმებულია",
      description:
        "გარიგება გაუქმდა. თუ თანხა გადახდილი იყო, ის უკან გადაირიცხება",
      badge: {
        text: "● გაუქმებული",
        variant: "destructive",
      },
      timelineStatus: "agreement",
    },
    seller: {
      title: "გარიგება გაუქმებულია",
      description:
        "გარიგება გაუქმდა. თუ თანხა გადახდილი იყო, ის უკან გადაირიცხება",
      badge: {
        text: "● გაუქმებული",
        variant: "destructive",
      },
      timelineStatus: "agreement",
    },
  },
};
