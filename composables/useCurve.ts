export const useCurve = () =>
  useState<Curve>(
    "curve",
    () =>
      <Curve>{
        p: 1,
        a: 1,
        b: 1,
      }
  );
