import { PrismaClient, DataCenter, PriceType, PriceInterval } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const randomDataCenter = (enumeration: object) => {
    const array = Object.values(enumeration);
    const randomIndex = Math.floor(Math.random() * array.length);
    const dataCenter = array[randomIndex];
    return dataCenter;
}

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

    sites.map(async (site) => {
        await prisma.member.upsert({
            where: {
                memberId: {
                    siteId: site.id,
                    userId: site.userId,
                }
            },
            update: {},
            create: {
                role: "OWNER",
                siteId: site.id,
                userId: site.userId,
            }
        })
    })

    /**
     * PRODUCT AND PRICES
     * Products and prices have been manually created in Stripe for testing purposes
     */

    // Define product interface
    interface Product {
        id: string;
        priceId: string;
    };

    // Define products and prices with their respective Stripe IDs
    const products: Product[] = [
        {
            id: "prod_Pg4KygN4jddjYq",
            priceId: "price_1OqiBVLA7PFYEsEl8g6wGOMU",
        },
        {
            id: "prod_Pg4KPdcNneRTDZ",
            priceId: "price_1OqiBoLA7PFYEsElbPliiW0L",
        },
        {
            id: "prod_Pg4KXvgUwJ8pLZ",
            priceId: "price_1OqiC8LA7PFYEsElaLFCt3YH",
        },
    ]

    // Create subscription products and prices
    products.map(async (product: Product, index: number) => {
        await prisma.product.upsert({
            where: {
                id: product.id,
            },
            update: {},
            create: {
                id: product.id,
                active: true,
                name: `TEST PRODUCT ${index + 1}`,
                description: `Description for TEST PRODUCT ${index + 1}`,
                metadata: {},
                prices: {
                    create: [
                        {
                            id: product.priceId,
                            active: true,
                            nickname: `Price for TEST PRODUCT ${index + 1}`,
                            unitAmount: (index === 0) ? 19900 : (index === 1) ? 29900 : 39900,
                            currency: "usd",
                            type: PriceType.recurring,
                            interval: PriceInterval.month,
                            intervalCount: 1,
                            metadata: {},                        
                        },
                    ]
                },
            },
        })
    })
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