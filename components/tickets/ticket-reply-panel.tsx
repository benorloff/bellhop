import { Input } from "../ui/input";

export const TicketReplyPanel = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 rounded-sm bg-white dark:bg-gray-800">
            <Input
                type="text"
                placeholder="Type your reply here"
            />
        </div>
    );
}