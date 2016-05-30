/**
 * Created by bawuju on 16/4/26.
 * Email: bawuju@gmail.com
 */


export default class AndroidBackEventQueue {

    // Android返回键事件监听队列
    static backEventQueue = [];

    static addBackEventToQueue(backEvent) {
        AndroidBackEventQueue.backEventQueue[AndroidBackEventQueue.backEventQueue.length] = backEvent;
        return () => {
            AndroidBackEventQueue.removeEvent(backEvent);
        }
    }

    static removeEvent(backEvent) {
        var newQueue = [];
        for (var i = 0; i < AndroidBackEventQueue.backEventQueue.length; i++) {
            var event = AndroidBackEventQueue.backEventQueue[i];
            if (backEvent != event) {
                newQueue[newQueue.length] = event;
            }
        }
        AndroidBackEventQueue.backEventQueue = newQueue;
    }

}
