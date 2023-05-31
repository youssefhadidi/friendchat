let count = 0;

class User {
  constructor(name) {
    this.username = name;
    this.id = count++;
    this.status = "online"
  }
}

module.exports = User;