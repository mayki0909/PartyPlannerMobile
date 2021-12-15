export interface Party {
    categories: [];
    creationDate: Date;
    guests: [];
    id: string;
    info: Info;
}
export interface Info{
    name: String;
    description: String;
    address:String;
    exactDirections:String;    
    dateFrom: Date;
    dateTo: Date;
    budget: Number;
}
export interface GuestBody{
    id: String;
    guests: Guest[];
}
export interface GuestList{
    guests: Guest[];
}
export interface Guest{
    guestId: number | undefined;
    name: String;
    surname: String;
    email: String;
    phone: String;
    vegan: boolean;
    vegetarian: boolean;
    nonDrinker: boolean;
    paid:boolean;
    host:boolean;
}
export interface CategoryBody{
    id: String;
    categories: Category[];
}
export interface Category{
    categoryId: Number;
    name: String;
    description: String;
    budgetPercentage: Number;
    proposedTotal: Number;
    items: Item[];
}
export interface Item{
    itemId: Number;
    name: String;
    description: String;
    price: Number;
    quantity: Number;
}

export interface CategoryBudget{
    name:String;
    sum:Number;
}