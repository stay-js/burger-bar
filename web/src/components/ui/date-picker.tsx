"use client";

import * as React from "react";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export const DatePicker: React.FC<{
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}> = ({ date, setDate }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start bg-transparent text-left font-normal",
          !date && "text-muted-foreground",
        )}
      >
        <CalendarIcon />
        <span>
          {date ? format(date, "yyyy. MM. dd.") : "Válasszon dátumot"}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        locale={hu}
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
        required
      />
    </PopoverContent>
  </Popover>
);
