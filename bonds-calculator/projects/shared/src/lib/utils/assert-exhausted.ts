export function assertExhausted(message: string = 'Not implemented!'): never {
    throw new Error(message);
}