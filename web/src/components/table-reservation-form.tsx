"use client";

import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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
      message: "A dátumn nem lehet múltbeli!",
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

type FormSchema = z.infer<typeof formSchema>;

export const TableReservationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // eslint-disable-next-line
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    alert(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-4 rounded-3xl bg-neutral-900 px-12 pb-12 pt-8"
    >
      <div>
        <Label htmlFor="name">
          Név: <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          placeholder="Minta János"
        />

        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="email">
          E-mail: <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="text"
          {...register("email")}
          placeholder="example@example.hu"
        />

        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="phone">
          Telefonszám: <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="text"
          {...register("phone")}
          placeholder="+36 30 111 1111"
        />

        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="date">
          Dátum (év, hónap, nap): <span className="text-red-500">*</span>
        </Label>
        <Input
          id="date"
          type="text"
          {...register("date")}
          placeholder="2025-01-01"
        />

        {errors.date && (
          <span className="text-xs text-red-500">{errors.date.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="time">
          Időpont (óra, perc): <span className="text-red-500">*</span>
        </Label>
        <Input
          id="time"
          type="text"
          {...register("time")}
          placeholder="19:00"
        />

        {errors.time && (
          <span className="text-xs text-red-500">{errors.time.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="people">
          Hány főre? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="people"
          type="text"
          {...register("people")}
          placeholder="4"
        />

        {errors.people && (
          <span className="text-xs text-red-500">{errors.people.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="message">Üzenet:</Label>
        <Textarea id="message" rows={8} />
      </div>

      <Button type="submit" variant="secondary">
        Foglalás
      </Button>
    </form>
  );
};
