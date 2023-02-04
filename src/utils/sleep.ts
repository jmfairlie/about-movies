export default function sleep<T = undefined>(
  ms: number,
  val?: T,
  forceFail?: boolean
) {
  return new Promise<T>((resolve, reject) =>
    setTimeout(forceFail ? reject : resolve, ms, val)
  );
}
