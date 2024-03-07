import {
  PrismaClient,
  DataCenter,
  PriceType,
  PriceInterval,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Clerk } from "@clerk/backend";
import { stripe } from "@/lib/stripe";

const prisma = new PrismaClient();
const clerk = Clerk({
  apiKey: process.env.CLERK_SECRET_KEY!,
});

const randomDataCenter = (enumeration: object) => {
  const array = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * array.length);
  const dataCenter = array[randomIndex];
  return dataCenter;
};

async function main() {
  /**
   * SITES
   * Seed users were manually created in Clerk and Zendesk
   */
  const createSites = await prisma.site.createMany({
    data: [
      // Sites owned by seed user Carlos
      {
        userId: "user_2cySh7f6PmqEZT6LJOPc4a1dTq3",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
        orgSlug: "hayes-sons",
      },
      {
        userId: "user_2cySh7f6PmqEZT6LJOPc4a1dTq3",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
        orgSlug: "hayes-sons",
      },
      {
        userId: "user_2cySh7f6PmqEZT6LJOPc4a1dTq3",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
        orgSlug: "hayes-sons",
      },
      // Sites owned by seed user Jean
      {
        userId: "user_2cyTRn3dU6FfwqykYll8RZY0vek",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
        orgSlug: "stolt-apparel",
      },
      {
        userId: "user_2cyTRn3dU6FfwqykYll8RZY0vek",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
        orgSlug: "stolt-apparel",
      },
      {
        userId: "user_2cyTRn3dU6FfwqykYll8RZY0vek",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
        orgSlug: "stolt-apparel",
      },
      // Sites owned by seed user Stuart
      {
        userId: "user_2cyTr0Vy6tpNu9EUOrG8WyOEpnL",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
        orgSlug: "donnelly-inc",
      },
      {
        userId: "user_2cyTr0Vy6tpNu9EUOrG8WyOEpnL",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
        orgSlug: "donnelly-inc",
      },
      {
        userId: "user_2cyTr0Vy6tpNu9EUOrG8WyOEpnL",
        name: faker.company.name(),
        url: faker.internet.domainName(),
        imageUrl: faker.image.urlLoremFlickr({
          category: "abstract",
          width: 300,
          height: 200,
        }),
        dataCenter: randomDataCenter(DataCenter),
        ipAddress: faker.internet.ipv4(),
        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
        orgSlug: "donnelly-inc",
      },
    ],
    skipDuplicates: true,
  });

  /**
   * MEMBERS
   * The user must be assigned as a member of the site they created
   */

  // Retrieve all sites created above
  const sites = await prisma.site.findMany();

  // Create an "OWNER" member for each site
  // This member will be the profile that created the site
  let user;

  sites.map(async (site) => {
    user = await clerk.users.getUser(site.userId);

    await prisma.member.upsert({
      where: {
        memberId: {
          siteId: site.id,
          userId: site.userId,
        },
      },
      update: {},
      create: {
        role: "OWNER",
        siteId: site.id,
        userId: site.userId,
        userImage: user.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  });

  /**
   * PRODUCT AND PRICES
   * Products and prices have been manually created in Stripe for testing purposes
   */

  interface stripeProduct {
    name: string;
    description: string;
  }

  const stripeProducts: stripeProduct[] = [
    {
      name: "Standard",
      description: "Get started with Bellhop.",
    },
    {
      name: "Premium",
      description: "Advanced features for growing teams.",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations.",
    },
  ];

  stripeProducts.map(async (product: stripeProduct, index: number) => {
    // Create the product in Stripe
    const sProd = await stripe.products.create({
      name: product.name,
      description: product.description,
    });
    // Create the price in Stripe
    const price = await stripe.prices.create({
      product: sProd.id,
      unit_amount: index === 0 ? 19900 : index === 1 ? 29900 : 39900,
      currency: "usd",
      recurring: {
        interval: "month",
      },
    });
    // Save the products and prices to the database
    await prisma.product.upsert({
      where: {
        id: sProd.id,
      },
      update: {},
      create: {
        id: sProd.id,
        active: true,
        name: sProd.name,
        description: sProd.description,
        metadata: {},
        prices: {
          create: {
            id: price.id,
            active: true,
            nickname: `Price for ${sProd.name}`,
            unitAmount: BigInt(Number(price.unit_amount)),
            currency: price.currency,
            type: price.type,
            interval: price.recurring?.interval!,
            intervalCount: 1,
            metadata: {},
          },
        },
      },
    });
  });
};

// Execute database seeding and disconnect client
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
