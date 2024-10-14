const {Sonyflake} = require('sonyflake');

const sonyflake = new Sonyflake({
  machineId: 2, // in range 2^16
  epoch: Date.UTC(2023, 10, 1, 0, 0, 0), // timestamp
});

module.exports = {
  nextId: () => sonyflake.nextId().toString(),
};
