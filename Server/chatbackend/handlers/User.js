let count = 0;

class User {
  constructor(name) {
    this.username = name;
    this.id = count++;
    this.status = "online"
    this.isInPublic = true;
  }
}

module.exports = User;