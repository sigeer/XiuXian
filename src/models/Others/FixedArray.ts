export class FixedArray<T> {
    _arr: Array<T>;
    _size: number;
    _type: FixedArrayType;

    constructor(size: number, initialData: Array<T> = [], type: FixedArrayType = FixedArrayType.Force) {
        this._arr = initialData;
        this._size = size;
        this._type = type;
    }

    shift(): T | undefined {
        return this._arr.shift();
    }

    unshift(item: T) {
        if (this._arr.length >= this._size) {
            if (this._type === FixedArrayType.Force) {
                return;
            }
            else if (this._type === FixedArrayType.Dynamic) {
                this._arr.pop()
            }
        }
        return this._arr.unshift(item);
    }

    pop(): T | undefined {
        return this._arr.pop();
    }

    push(item: T) {
        if (this._arr.length >= this._size) {
            if (this._type === FixedArrayType.Force) {
                return;
            }
            else if (this._type === FixedArrayType.Dynamic) {
                this._arr.shift()
            }
        }
        this._arr.push(item);
    }

    get length() {
        return this._arr.length
    }

    getItem(index: number): T | undefined {
        return this._arr[index];
    }

    setItem(index: number, value: T): void {
        this._arr[index] = value;
    }
    

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const items = this._arr;
    
        return {
          next(): IteratorResult<T> {
            if (index < items.length) {
              return {
                done: false,
                value: items[index++]
              };
            } else {
              return {
                done: true,
                value: undefined
              };
            }
          }
        };
      }
}

export enum FixedArrayType {
    'Force' = 0,
    'Dynamic' = 1
}