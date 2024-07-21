export class ArrayUtility {
  public static indexInRange<T>(
    a: number,
    b: number
  ): (_: T, index: number) => boolean {
    return (_: T, index: number) => index >= a && index <= b;
  }

  public static randomElement<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  public static isEmpty<T>(array: Array<T>): boolean {
    return !array || array.length === 0;
  }
}