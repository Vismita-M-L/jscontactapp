const Contact = require('./contact');
const ContactInfo = require('./ContactInfo');

class User {
    constructor(userId, firstName, lastName, isAdmin, isActive, contacts = []) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.isAdmin = isAdmin;
      this.isActive = isActive;
      this.contacts = contacts;
    }
  
    static findUser(username) {
      for (let index = 0; index < User.allUser.length; index++) {
        if (User.allUser[index].username === username) {
          return [true, index];
        }
      }
      return [false, -1];
    }
  
    findContact(cName) {
      for (let index = 0; index < this.contacts.length; index++) {
        if (this.contacts[index].cName === cName) {
          return [true, index];
        }
      }
      return [false, -1];
    }
  
    newContact(cName) {
      if (typeof cName !== 'string') {
        throw new Error('Contact name must be a string.');
      }
      if (this.isAdmin) {
        throw new Error('Admin cannot create contacts.');
      }
  
      const [isContactExist, indexOfContact] = this.findContact(cName);
      if (isContactExist) {
        throw new Error('Contact already exists.');
      }
  
      const newContact = new Contact(cName);
      this.contacts.push(newContact);
      return newContact;
    }
  
    addContactInfo(cName, type, value) {
      const [isContactExist, indexOfContact] = this.findContact(cName);
      if (!isContactExist) {
        throw new Error('Contact does not exist.');
      }
  
      const contact = this.contacts[indexOfContact];
      const contactInfo = contact.addContactInfo(type, value);
      return contactInfo;
    }
  
    deleteContactInfo(cName, contactInfo) {
      const [isContactExist, indexOfContact] = this.findContact(cName);
      if (!isContactExist) {
        throw new Error('Contact does not exist.');
      }
  
      const contact = this.contacts[indexOfContact];
      contact.deleteContactInfo(contactInfo);
    }
  
    static newAdmin(name, username) {
      if (typeof name !== 'string' || typeof username !== 'string') {
        throw new Error('Name and username must be strings.');
      }
      const [isUserExist, indexOfUserFound] = User.findUser(username);
      if (isUserExist) {
        throw new Error('Username already exists.');
      }
  
      const admin = new User(name, username, true);
      User.allUser.push(admin);
      return admin;
    }
  
    newUser(name, username) {
        if (!this.isAdmin) {
          throw new Error('Unauthorized');
        }
        if (typeof name !== 'string' || typeof username !== 'string') {
          throw new Error('Name and username must be strings.');
        }
        const [isUserExist, indexOfUserFound] = User.findUser(username);
        if (isUserExist) {
          throw new Error('Username already exists.');
        }
      
        const user = new User(name, username, true); // Set isAdmin as true for the new user
        this.contacts.push(user);
        User.allUser.push(user);
        return user;
      }
      
      
      
  
    getAllUser() {
      if (!this.isAdmin) {
        throw new Error('Unauthorized');
      }
      return User.allUser;
    }
  
    updateUser(username, parameter, newValue) {
        if (!this.isAdmin) {
          throw new Error('Unauthorized');
        }
        const [isUserExist, indexOfUserFound] = User.findUser(username);
        if (!isUserExist) {
          throw new Error('Username does not exist.');
        }
        switch (parameter) {
          case 'name':
            User.allUser[indexOfUserFound].updateName(newValue);
            break;
          case 'username':
            User.allUser[indexOfUserFound].updateUsername(newValue);
            break;
          case 'lastName':
            User.allUser[indexOfUserFound].updateLastName(newValue);
            break;
          default:
            throw new Error('Invalid parameter.');
        }
      }
      
  
    updateName(newName) {
      if (typeof newName !== 'string') {
        throw new Error('New name must be a string.');
      }
      this.firstName = newName;
    }
  
    updateUsername(newUsername) {
      if (typeof newUsername !== 'string') {
        throw new Error('New username must be a string.');
      }
      const [isUserExist, indexOfUserFound] = User.findUser(newUsername);
      if (isUserExist) {
        throw new Error('Username already exists.');
      }
      this.username = newUsername;
    }
    updateLastName(newLastName) {
        if (typeof newLastName !== 'string') {
          throw new Error('New last name must be a string.');
        }
        this.lastName = newLastName;
      }
  
    deleteUser(username) {
      if (!this.isAdmin) {
        throw new Error('Unauthorized');
      }
      const [isUserExist, indexOfUserFound] = User.findUser(username);
      if (!isUserExist) {
        throw new Error('Username does not exist.');
      }
      User.allUser.splice(indexOfUserFound, 1);
    }
  }
  
  User.allUser = [];
  
  module.exports = User;
  