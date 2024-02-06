import { currentUser, redirectToSignIn } from "@clerk/nextjs"

export const currentGreeting = async () => {
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn();
    };

    const name = user.firstName;
    const hour = new Date().getHours();

    let greeting;

    if (hour >= 0 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    return `${greeting}, ${name}!`;

}