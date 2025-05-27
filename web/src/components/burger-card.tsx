import Image from "next/image";
import { Button } from "./ui/button";

export const BurgerCard: React.FC<{
  burger: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
}> = ({ burger }) => (
  <div className="group overflow-hidden rounded-lg bg-background bg-white shadow-sm transition-all hover:shadow-md">
    <div className="relative aspect-[5/3] w-full overflow-hidden">
      <Image
        src={burger.image}
        alt={burger.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* TODO: */}
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-bold">{burger.name}</h3>

        <span className="text-nowrap font-medium text-orange-400">
          {burger.price} Ft
        </span>
      </div>

      <p className="text-sm text-neutral-600">{burger.description}</p>

      <Button className="bg-orange-400 hover:bg-orange-500 mt-auto">Kosárba</Button>
      </div>
    </div>
);
