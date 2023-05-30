let count = 0;

class User {
  constructor(name) {
      this.username = name;
      this.id = count++;
  }
}

module.exports = User;