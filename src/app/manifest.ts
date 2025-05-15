import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Enreach",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "https://enreach.network/icon.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://enreach.network/icon.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
