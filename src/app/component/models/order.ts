export interface Order {
    id?: number;
    date?: string;
    order: string;
    filling: string;
    addition: {
        mushrooms: boolean;
        cheese: boolean;
      };
    note?: string;
    size: string;
    quantity: number;
    cafe: string;
    mushrooms?: string;
    cheese?: string;
    status?: boolean;
}
