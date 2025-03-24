class Hashmap {
    constructor(initialCapacity=16, loadFactor= 0.75){
        this.buckets = new Array(initialCapacity).full(null).map(() => []);
        this.size = 0;
        this.loadFactor = loadFactor;
    }
    hash(key) {
        // convert key to string and get hash code
        const stringKey = String(key);
        let hashCode = 0;

        for (let i=0; i < stringKey.length; i++) {
            hashCode = (hashCode << 5) - hashCode + stringKey.charCodeAt(i);
            hashCode |= 0; // convert to 32-bit integer 
        }
        // Ensures positive index within bucket array bounds
        return Math.abs(hashCode) % this.buckets.length;
    }

    put(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        //check if key already exists in bucket 
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; //update existing 
                return;
            }
        }
        // key doesn't exist. Add new entry
        bucket.push([key,value]);
        this.size++;

        //check if resizing needed 
        if (this.size > this.buckets.length * this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(const [storedKey, value] of bucket) {
            if (storedKey === key){
                return value;
            }
        }

        return undefined; //key not found
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice[i][1]; // remove entry 
                this.size--;
                return true;
            }
        }
        
        return false; // key not found 
    }

    resize() {
        const newBuckets = new Array(this.buckets.length * 2).fill(null).map(() => []);
        const oldBuckets = this.buckets;
        this.buckets = newBuckets;
        this.size = 0;

        //rehash all existing entries
        for( const bucket of oldBuckets) {
            for(const [key,value] of bucket) {
                this.put[key,value];
            }
        }
    }
    contains(key) {
        return this.get(key) != undefined;
    }

    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for(const bucket of this.buckets) {
            for(const [, value] of bucket) {
                allValues.push(value);
            }
        }
        return allValues;
    }

   clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
   }
}