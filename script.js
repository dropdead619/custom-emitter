
function superEmmiter() {
    let events = {};

    function on(event, cb) {
        const isEventExists = events.hasOwnProperty(event);
        if (event === '*') {
            //Подписаться на все события
            for (const e in events) {
                events[e].push(cb);
            }
        } else if (isEventExists && !events[event].includes(cb)) {
            events[event].push(cb);
        } else if (isEventExists && events[event].includes(cb)) {
            return;
        } else {
            events[event] = [cb];
        }
        console.log('on', events);
    }

    function off(event, cb) {
        const isEventExists = events.hasOwnProperty(event);
        if (!event && !cb) {
            //Удалить все подписки на события
            events = {};
        } else if (!cb && isEventExists) {
            //Удалить все подписки на конкретное событие
            delete events[event];
        } else if (isEventExists && events[event].includes(cb)) {
            events[event] = events[event].filter(c => c !== cb);
        }
        console.log('off', events);
    }

    function emit(event, ...args) {
        if (events.hasOwnProperty(event)) {
            events[event].forEach(cb => cb(...args));
        };
    }

    return {
        on,
        off,
        emit,
    };
}

let test = (str, str1) => {
    console.log(str + ' ' + str1);
}

let test2 = (str) => {
    console.log(str);
}

let test3 = (str) => {
    console.log(str);
}

const emmiter = superEmmiter();

emmiter.on('qoq', test);
emmiter.on('qoq', test);
emmiter.on('qoq', test2);
emmiter.on('qoq1', test);
emmiter.on('qoq2', test);

emmiter.on('*', test3);

emmiter.off('qoq', test2);

emmiter.emit('qoq', 'Sasha', 'Lava');
