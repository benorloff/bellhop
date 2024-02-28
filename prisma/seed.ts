import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
        }
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
        }
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