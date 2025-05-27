import { useEffect, useMemo, useState } from "react";
import { getCachedMenu } from "~/lib/get-cached-menu";
import { InferSelectModel } from "drizzle-orm";
import { menu } from "~/server/db/schema";

export const OrderCart: React.FC<{ menu: InferSelectModel<typeof menu>[] }> = ({menu}) => {
    const [orders, setOrders] = useState<Array<number>>([]);
    const count = useMemo<number>(() => orders.length, [orders]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        setOrders(storedOrders ? JSON.parse(storedOrders) : 0);
    }, []);

    const addOrder = (id: number) => {
        const next = [...orders, id];
        setOrders(next);
        localStorage.setItem('orders', JSON.stringify(next));
    }

    return (
        <ul>
            {menu.map((item) => (<li>{item.name}</li>))}
        </ul>
    );
}