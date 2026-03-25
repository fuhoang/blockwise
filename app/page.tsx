import type { Metadata } from "next";
import Script from "next/script";

import HomePage from "@/components/home/HomePage";
import { publicGuides } from "@/lib/public-guides";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Learn crypto the structured way",
  description:
    "Learn crypto with structured beginner lessons, quizzes, progress tracking, and an AI tutor in Blockwise, starting with a live Bitcoin track.",
  pathname: "/",
});

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Blockwise",
        url: absoluteUrl("/"),
        description:
          "Structured crypto learning with lessons, quizzes, dashboard progress, and an AI tutor, starting with Bitcoin.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl("/")}#demo`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Blockwise",
        url: absoluteUrl("/"),
        description:
          "Blockwise helps beginners learn crypto with structured lessons, quizzes, and an AI tutor.",
      },
      {
        "@type": "WebApplication",
        name: "Blockwise",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: absoluteUrl("/"),
        description:
          "A guided crypto learning platform with beginner lessons, quizzes, progress tracking, and AI tutor support.",
      },
      {
        "@type": "ItemList",
        name: "Blockwise public crypto guides",
        itemListElement: publicGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: absoluteUrl(guide.href),
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="blockwise-home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
