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
  phone: z.string().min(1, { message: "Adja meg a telefonszámát!" }),
  date: z.string().min(1, { message: "Adja meg a dátumot!" }),
  time: z.string().min(1, { message: "Adja meg az időpontot!" }),
  people: z
    .string()
    .min(1, { message: "Adja meg, hogy hány főre foglalna!" })
    .refine((people) => !isNaN(parseInt(people)), {
      message: "Csak számot adhat meg!",
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
        <Input id="name" type="text" {...register("name")} />

        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="email">
          E-mail: <span className="text-red-500">*</span>
        </Label>
        <Input id="email" type="text" {...register("email")} />

        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="phone">
          Telefonszám: <span className="text-red-500">*</span>
        </Label>
        <Input id="phone" type="text" {...register("phone")} />

        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="date">
          Dátum (hónap, nap): <span className="text-red-500">*</span>
        </Label>
        <Input id="date" type="text" {...register("date")} />

        {errors.date && (
          <span className="text-xs text-red-500">{errors.date.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="time">
          Időpont (óra, perc): <span className="text-red-500">*</span>
        </Label>
        <Input id="time" type="text" {...register("time")} />

        {errors.time && (
          <span className="text-xs text-red-500">{errors.time.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="people">
          Hány főre? <span className="text-red-500">*</span>
        </Label>
        <Input id="people" type="text" {...register("people")} />

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
