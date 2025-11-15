//Enum als CONST-Type
export const Noten = {
    SEHR_GUT: 1,
    GUT: 2,
    BEFRIEDIGEND: 3,
    GENUEGEND: 4,
    NICHT_GENUEGEND: 5,

} as const;
//Key: "SEHR_GUT" | "GUT" usw
export type TNoteKey = keyof typeof Noten;
//Value: 1 | 2
export type TNoteValue = typeof Noten[TNoteKey];

