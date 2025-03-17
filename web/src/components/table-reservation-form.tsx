import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const TableReservationForm: React.FC = () => {
  return (
    <form className="flex w-full max-w-lg flex-col gap-4 rounded-3xl bg-neutral-900 px-12 pb-12 pt-8">
      <div>
        <Label htmlFor="name">
          Név: <span className="text-red-500">*</span>
        </Label>
        <Input id="name" type="text" />
      </div>

      <div>
        <Label htmlFor="email">
          E-mail: <span className="text-red-500">*</span>
        </Label>
        <Input id="email" type="text" />
      </div>

      <div>
        <Label htmlFor="phone">
          Telefonszám: <span className="text-red-500">*</span>
        </Label>
        <Input id="phone" type="text" />
      </div>

      <div>
        <Label htmlFor="date">
          Dátum: <span className="text-red-500">*</span>
        </Label>
        <Input id="date" type="text" />
      </div>

      <div>
        <Label htmlFor="time">
          Időpont: <span className="text-red-500">*</span>
        </Label>
        <Input id="time" type="text" />
      </div>

      <div>
        <Label htmlFor="people">
          Hány főre? <span className="text-red-500">*</span>
        </Label>
        <Input id="people" type="text" />
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
