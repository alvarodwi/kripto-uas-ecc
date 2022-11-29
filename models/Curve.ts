// model untuk elliptic curve
// mengikuti aturan y^2 = x^3 + ax + b (mod p)
interface Curve {
  p: number;
  a: number;
  b: number;
}
