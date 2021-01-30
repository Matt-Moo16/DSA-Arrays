class Array {
    constructor() {
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        //resize the array so there is space for the new item using the _resize method
        this._resize(this.length + 1);
        // then set the memory to be equal to the value
        memory.set(this.ptr + this.length, value);
        // 
        this.length++
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3;
