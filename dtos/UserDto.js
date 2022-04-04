module.exports = class UserDto {
  userId;
  username;
  firstName;
  lastName;
  age;

  constructor(model) {
    this.userId = model.userId;
    this.username = model.username;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.age = model.age;
  }
};
