import { Prisma, PrismaClient, DataCenter } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const randomDataCenter = (enumeration: object) => {
    const array = Object.values(enumeration);
    const randomIndex = Math.floor(Math.random() * array.length);
    const dataCenter = array[randomIndex];
    return dataCenter;
}

async function main() {
    // Create profiles for seed users
    // Seed users were manually created in Clerk and Zendesk
    const carlos = await prisma.profile.upsert({
        where: { email: "carloshayes@domain.com" },
        update: {},
        create: {
            userId: "user_2cySh7f6PmqEZT6LJOPc4a1dTq3",
            zendeskUserId: 23313279356955,
            firstName: "Carlos",
            lastName: "Hayes",
            email: "carloshayes@domain.com",
            imageUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjeVcweFRwMVVWRk5mZnJwTEVmSFZKekY2TiJ9",
            sites: {
                create: [
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
                        orgSlug: "hayes-sons",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
                        orgSlug: "hayes-sons",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVzSYg1j1pGrTcIfRpj4jtFsy",
                        orgSlug: "hayes-sons",
                    },
                ],
            },
        },
    })
    const jean = await prisma.profile.upsert({
        where: { email: "jean.stoltenberg@domain.com" },
        update: {},
        create: {
            userId: "user_2cyTRn3dU6FfwqykYll8RZY0vek",
            zendeskUserId: 23313211819035,
            firstName: "Jean",
            lastName: "Stoltenberg",
            email: "jean.stoltenberg@domain.com",
            imageUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjeVdBaDZsTDlkT0pUNVRLNTFTc0RXRGEyVCJ9",
            sites: {
                create: [
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
                        orgSlug: "stolt-apparel",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
                        orgSlug: "stolt-apparel",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyW9KKyi2l1ly0nlrrGmRFpw5p",
                        orgSlug: "stolt-apparel",
                    },
                ],
            },
        }
    })
    const stuart = await prisma.profile.upsert({
        where: { email: "stuart.donnelly@domain.com" },
        update: {},
        create: {
            userId: "user_2cyTr0Vy6tpNu9EUOrG8WyOEpnL",
            zendeskUserId: 23313282234523,
            firstName: "Stuart",
            lastName: "Donnelly",
            email: "stuart.donnelly@domain.com",
            imageUrl: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjeVZxczhPcFM3cDNQNldYOFdZWUNScVpBUSJ9",
            sites: {
                create: [
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
                        orgSlug: "donnelly-inc",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
                        orgSlug: "donnelly-inc",
                    },
                    {
                        name: faker.company.name(),
                        url: faker.internet.domainName(),
                        imageUrl: faker.image.urlLoremFlickr({
                            category: "abstract",
                            width: 300,
                            height: 200,
                        }),
                        dataCenter: randomDataCenter(DataCenter),
                        ipAddress: faker.internet.ip(),
                        slug: `${faker.word.adjective()}-${faker.word.noun()}`,
                        orgId: "org_2cyVp1Gg8Fkliv1wXMHhsBZNipk",
                        orgSlug: "donnelly-inc",
                    },
                ],
            },
        }
    })

    // Retrieve all sites created above
    const sites = await prisma.site.findMany();

    // Create an "OWNER" member for each site
    // This member will be the profile that created the site 
    sites.map(async (site) => {
        await prisma.member.create({
            data: {
                role: "OWNER",
                profileId: site.profileId,
                siteId: site.id,
            }
        })
    })

    console.log({ carlos, jean, stuart }, "<-- seed profiles");
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });