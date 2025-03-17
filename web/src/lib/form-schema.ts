import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Adja meg a nevét!" }),
  email: z.string().email({ message: "Hibás e-mail cím!" }),
  phone: z
    .string()
    .min(1, { message: "Adja meg a telefonszámát!" })
    .regex(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/g, {
      message: "Hibás telefonszám!",
    }),
  date: z
    .string()
    .min(1, { message: "Adja meg a dátumot!" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Hibás dátum!",
    })
    .refine((date) => new Date(date) >= new Date(), {
      message: "A dátum nem lehet múltbeli!",
    }),
  time: z
    .string()
    .min(1, { message: "Adja meg az időpontot!" })
    .refine(
      (time) => {
        const [hours, minutes] = time.split(":").map((part) => Number(part));
        if (hours === undefined || minutes == undefined) return false;

        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      },
      {
        message: "Hibás időpont!",
      },
    ),
  people: z
    .string()
    .min(1, { message: "Adja meg, hogy hány főre foglalna!" })
    .refine((people) => !isNaN(Number(people)), {
      message: "Csak számot adhat meg!",
    })
    .refine((people) => Number(people) > 0, {
      message: "Minimum 1 főre kell foglalnia!",
    }),
  message: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
