export enum PointType {
    Daily = "daily",
    Donation = "donation"
}

// TODO: edit
export enum pointByType  {
    free = 10,
    premium = 30,
    admin = 0
}

export type Point = {
    userId: String
    pointId: String
    amount: number
}

export type Star = {
    userId: String
    star: number
}


