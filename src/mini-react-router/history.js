export default function createHistory() {
    return new History()
}

const removeListener = (callback, listener) => {
    const index = listener.indexOf(callback)
    if (index > -1) {
        listener.splice(index, 1)
    }
}

class History {
    constructor() {
        this.historyStack = []
        this.action = ''
        this.listener = []
        this.length = 0
        this.index = -1
        /**
         * location:{
         *    pathname: String
         *    search: String
         *    state:　Object
         * }
         */
        let location = {}
        Object.defineProperties(this, {
            location: {
                enumerable: true,
                configurable: true,
                set(value) {
                    location = value
                    this.listener.forEach((callback) => {
                        callback(value, this.action)
                    })
                },
                get() {
                    return location
                }
            },

        })
    }

    addListener(callback) {
        this.listener.push(callback)
        return () => {
            removeListener(callback, this.listener)
        }
    }

    push(location) {
        this.action = 'PUSH'
        if (this.index < this.length - 1) {
            this.historyStack.splice(this.index + 1)
        }
        this.historyStack.push(this.location = location)
        ++this.index
        this.syncLength()
    }

    syncLength() {
        this.length = this.historyStack.length
    }

    replace(location) {
        this.action = 'REPLACE'
        this.historyStack.splice(this.historyStack.length - 1, 1, location)
    }

    goBack() {
        if (this.index - 1 > -1) {
            this.action = 'POP'
            this.location = this.historyStack[--this.index]
            console.log(this.index, this.location)
        }
    }

    goForward() {
        if (this.index + 1 < this.length) {
            this.action = 'POP'
            this.location = this.historyStack[++this.index]
        }
    }
}