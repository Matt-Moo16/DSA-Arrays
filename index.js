const MEMORY = require('./memory')
let Memory = new MEMORY()

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = Memory.allocate(this.length)
    }

    push(val) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        Memory.set(this.ptr + this.length, val);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        //checks to see if the index is less than zero or the index is greater or equal to this.length
        // if it is throw a new error
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // if not true adds an index offset, and get the value stored at a memory address
        return Memory.get(this.ptr + index);
    }
     
    pop() {
        // checks to see if the length is zero
        // if it does throw a new error
        if (this.length === 0) {
            throw new Error('Index error');
        }
        const value = Memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error ('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }
        Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        Memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        Memory.copy(
            this.ptr + index,
            this.ptr + index + 1,
            this.length - index - 1
        );
        this.length--;
    }
}

function main() {
    Array.SIZE_RATIO = 3;
    let arr = new Array();
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr);
}

main();