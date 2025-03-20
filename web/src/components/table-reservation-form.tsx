"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { formSchema, type FormSchema } from "~/lib/form-schema";
import { openingHours } from "~/lib/opening-hours";
import saveTableReservation from "~/app/asztalfoglalas/actions";

export const TableReservationForm: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    // eslint-disable-next-line
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  register("date");
  useEffect(() => setValue("date", date ?? new Date()), [date, setValue]);

  register("time");
  useEffect(() => setValue("time", time ?? ""), [time, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    reset();

    const { success } = await saveTableReservation(data);

    if (success) {
      toast("Sikeres foglalás!", {
        description:
          "Köszönjük a foglalást! Hamarosan visszaigazolunk. Addig kérjük ne vegye biztosnak a foglalást!",
      });
      return;
    }

    toast("Hiba történt a foglalás során!", {
      description: "Kérjük próbálja újra később!",
    });
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
          placeholder="Minta János"
          {...register("name")}
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
          placeholder="example@example.hu"
          {...register("email")}
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
          placeholder="+36 30 111 1111"
          {...register("phone")}
        />

        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="date">
          Dátum: <span className="text-red-500">*</span>
        </Label>

        <DatePicker date={date} setDate={setDate} />

        {errors.date && (
          <span className="text-xs text-red-500">{errors.date.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="time">
          Időpont: <span className="text-red-500">*</span>
        </Label>

        <Select value={time} onValueChange={setTime}>
          <SelectTrigger id="time" {...register("time")}>
            <SelectValue placeholder="Válasszon időpontot" />
          </SelectTrigger>
          <SelectContent>
            {openingHours.slots(date).map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
          placeholder="4"
          {...register("people")}
        />

        {errors.people && (
          <span className="text-xs text-red-500">{errors.people.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="message">Üzenet:</Label>
        <Textarea id="message" rows={8} {...register("message")} />
      </div>

      <Button type="submit" variant="default" className="w-full">
        Foglalás
      </Button>
    </form>
  );
};
