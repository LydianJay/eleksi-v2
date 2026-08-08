import { useEffect } from "react";

export default function NotifListener({
    listenOn,
    eventName,
    onTrigger,
    alarm,
}) {
    useEffect(() => {
        const processChannel = window.Echo.private(listenOn);

        processChannel.listen(`.${eventName}`, (e) => {
            if (onTrigger) {
                onTrigger(e);
            }
            if (alarm) {
                alarm.current.currentTime = 0;
                alarm.current.play().catch(console.warn);
            }
        });

        return () => {
            processChannel.stopListening(`.${eventName}`);
            window.Echo.leave(listenOn);
        };
    }, [onTrigger, alarm, eventName, listenOn]);
}
