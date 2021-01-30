const createLinkedList = () => {
  let head = null;
  let size = 0;

  return {
    size: function () {
      return size;
    },

    isEmpty: function () {
      return size === 0;
    },

    add: function (value) {
      if (this.isEmpty()) {
        head = newNode(value);
      } else {
        let current = head;
        while (current.next !== null) {
          current = current.next;
        }

        current.next = newNode(value);
      }
      size++;
    },

    addAt: function (value, index) {
      if (isOutOfBounds(index, size)) throw new Error('Index out of bounds');

      if (index === 0) {
        let oldHead = head;
        head = newNode(value, oldHead);
        size++;
        return;
      }

      let current = head;
      for (let i = 0; i < index - 1; i++) current = current.next;

      const node = newNode(value, current.next);
      current.next = node;
      size++;
    },

    remove: function (value) {
      if (this.isEmpty()) return;
      if (head.value === value) {
        head = head.next;
        size--;
        return;
      }

      let current = head;

      while (current.next.value !== value) {
        current = current.next;
        if (current.next === null) return;
      }

      current.next = current.next.next;
      size--;

      return;
    },

    toString: function () {
      let current = head;
      let str = '';

      while (current !== null) {
        str += current.value + ' -> ';

        current = current.next;
      }
      str += 'null';

      return str;
    },
  };

  function newNode(value, next = null) {
    return {
      value,
      next,
    };
  }

  function isOutOfBounds(index, limit) {
    return index < 0 || index > limit;
  }
};

const linkedList = createLinkedList();

linkedList.add(2);
linkedList.add(5);
linkedList.add(4);
linkedList.add(10);

console.log(String(linkedList));
console.log('size is ' + linkedList.size());

linkedList.addAt(15, 4);
console.log(String(linkedList));
console.log('size is ' + linkedList.size());
