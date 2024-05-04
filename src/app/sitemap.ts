import { url } from "inspector";

export default async function sitemap() {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    },
  ];
}
