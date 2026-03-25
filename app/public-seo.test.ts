import { metadata as bitcoinForBeginnersMetadata } from "@/app/(marketing)/bitcoin-for-beginners/page";
import { metadata as walletBasicsMetadata } from "@/app/(marketing)/crypto-wallet-basics/page";
import { metadata as learnCryptoMetadata } from "@/app/(marketing)/learn-crypto/page";
import { metadata as pricingMetadata } from "@/app/(marketing)/pricing/page";
import { metadata as homeMetadata } from "@/app/page";

describe("public metadata", () => {
  it("keeps the homepage positioned around crypto learning", () => {
    expect(homeMetadata.title).toBe("Learn crypto the structured way");
    expect(homeMetadata.description).toContain("Learn crypto");
  });

  it("includes metadata for indexable guide pages", () => {
    expect(learnCryptoMetadata.alternates?.canonical).toBe("http://localhost:3000/learn-crypto");
    expect(bitcoinForBeginnersMetadata.alternates?.canonical).toBe(
      "http://localhost:3000/bitcoin-for-beginners",
    );
    expect(walletBasicsMetadata.alternates?.canonical).toBe(
      "http://localhost:3000/crypto-wallet-basics",
    );
  });

  it("uses the pricing social image on the pricing page", () => {
    expect(pricingMetadata.openGraph?.images).toEqual([
      {
        url: "http://localhost:3000/pricing/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pricing",
      },
    ]);
  });
});
