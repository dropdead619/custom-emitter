
function superEmmiter() {
    let events = [];
    function subscribe(event, cb) {
        if (events.find(el => el.eventName === event && !el.callbacks.includes(cb))) {
            events.forEach(el => {
                if (el.eventName === event) {
                    el.callbacks.push(cb);
                }
            });
        } else if (events.find(el => el.eventName === event && el.callbacks.includes(cb))) {
            return;
        } else {
            events.push({ eventName: event, callbacks: [cb] });
        }
    }

    function unsubscribe(event, cb) {
        if (events.find(el => el.eventName === event && el.callbacks.includes(cb))) {
            events.forEach(el => {
                if (el.eventName === event) {
                    el.callbacks = el.callbacks.filter(c => c !== cb);
                }
            });
        }
    }

    function emitByEvent(event, ...args) {
        if (events.find(el => el.eventName === event)) {
            events.find(el => el.eventName === event).callbacks.forEach(cb => cb(...args));
        };
    }

    return {
        on: function (event, cb) {
            subscribe(event, cb);
        },
        off: function (event, cb) {
            unsubscribe(event, cb);
        },
        emit: function (event, ...args) {
            emitByEvent(event, ...args);
        },
    };
}

let test = (str) => {
    console.log(str);
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

emmiter.emit('qoq', 125);
