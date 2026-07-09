export const seconds = (value: number) => value * 1000;
export const minutes = (value: number) => seconds(value * 60);
export const hours = (value: number) => minutes(value * 60);
