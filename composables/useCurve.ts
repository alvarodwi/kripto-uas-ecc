export const useCurve = () =>
  useState<Curve>(
    "curve",
    () =>
      <Curve>{
        p: 13,
        a: 1,
        b: 0,
      }
  );
