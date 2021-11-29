
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