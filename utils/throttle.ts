export const limit: number = 100;

export default function throttle(func: Function, wait: number = limit) {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (...args: any[]) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= wait) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    };
}