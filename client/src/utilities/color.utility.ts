import { Color } from 'src/models/color.model';

export class ColorUtility {
  public static mapToClass(color: Color) {
    switch (color) {
      case Color.Green: {
        return 'bg-green-500';
      }
      case Color.Red: {
        return 'bg-red-500';
      }
      case Color.Yellow: {
        return 'bg-yellow-400';
      }
      case Color.Blue: {
        return 'bg-blue-500';
      }
      case Color.LightBlue: {
        return 'bg-blue-300';
      }
      case Color.White: {
        return 'bg-zinc-300';
      }
      case Color.Purple: {
        return 'bg-purple-700';
      }
      case Color.Gray: {
        return 'bg-zinc-500';
      }
      default: {
        return 'bg-zinc-900';
      }
    }
  }
}
