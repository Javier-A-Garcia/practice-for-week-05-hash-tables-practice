const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    // Your code here
    let firstEight = sha256(key).slice(0, 8);

    return parseInt(firstEight, 16);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
    // Your code here
  }

  insertNoCollisions(key, value) {
    // Your code here

    if (this.data[this.hashMod(key)]) {
      throw new Error("hash collision or same key/value pair already exists!");
    } else {
      const pair = new KeyValuePair(key, value);

      this.data[this.hashMod(key)] = pair;
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    const pair = new KeyValuePair(key, value);
    const bucketIndex = this.hashMod(key);
    
    if (this.data[bucketIndex]) {
      pair.next = this.data[bucketIndex];
    }
    this.data[bucketIndex] = pair;
    this.count++;
  }

  insert(key, value) {
    // Your code here
  }

}

module.exports = HashTable;
