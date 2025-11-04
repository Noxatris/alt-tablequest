import localFont from "next/font/local";

// Cinzel
export const cinzel = localFont({
  src: [
    {
      path: "./fonts/cinzel-variablefont_wght-webfont.woff2",
      weight: "400",
      style: "normal"
    },
  ],
  display: "swap",
  variable: "--font-cinzel"
})


// Forum
export const forum = localFont({
  src: [
    {
      path: "./fonts/forum-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-forum",
});
