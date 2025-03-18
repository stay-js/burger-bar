import Image from "next/image";

export const BurgerCard: React.FC<{
  burger: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
}> = ({ burger }) => (
  <div className="group overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={burger.image}
        alt={burger.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{burger.name}</h3>
        <span className="font-medium text-orange-400">{burger.price} Ft</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{burger.description}</p>
    </div>
  </div>
);
