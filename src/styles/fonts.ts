import { Josefin_Slab, Josefin_Sans } from "next/font/google";

export const josefin_slab = Josefin_Slab({
  subsets: ["latin"],
  variable: "--josefin-slab",
  weight: "700"
});

export const josefin_sans = Josefin_Sans ({
  subsets: ["latin"],
  variable: "--josefin-sans",
  weight: "300"
});