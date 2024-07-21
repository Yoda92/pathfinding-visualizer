export class MathUtility {
  public static range(a: number, b: number): Array<number> {
    return Array.from({ length: b - a }, (_, key) => key + a);
  }

  public static isEven(x: number): boolean {
    return x % 2 === 0;
  }

  public static isOdd(x: number): boolean {
    return x % 2 !== 0;
  }

  public static randomNumberInInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
