
class Counter {
    constructor() {
        this.count = 0;
    }
    inc() {
        this.count++;
    }
    pre() {
        const temp = this.count;
        this.inc()
        return temp;
    }
    post() {
        this.inc()
        return this.count;
    }
}

module.exports = Counter