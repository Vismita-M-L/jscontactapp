const User = require('./user');

try {
    const admin1 = User.newAdmin('Yash', 'yash1234');
    admin1.lastName = 'Lastname';
    console.log('admin1 >>>', admin1.userId, admin1.firstName, admin1.lastName, admin1.isAdmin ? 'true' : 'false', admin1.isActive ? 'true' : 'false', admin1.contacts.map(contact => contact.firstName));
    const user1 = admin1.newUser('Ritik', 'ravi1234');
    user1.lastName = 'Lastname';
    console.log('user1 >>>', user1.userId, user1.firstName, user1.lastName, user1.isAdmin ? 'true' : 'false', user1.isActive ? 'true' : 'false', user1.contacts.map(contact => contact.firstName));
    admin1.updateUser('ravi1234', 'name', 'Ravi');
    console.log('admin1 (after update) >>>', admin1.userId, admin1.firstName, admin1.lastName, admin1.isAdmin ? 'true' : 'false', admin1.isActive, admin1.contacts);
  
    user1.newContact('Vivek');
console.log('user1 (after creating contact) >>>', user1.userId, user1.firstName, user1.lastName, user1.isAdmin ? 'true' : 'false', user1.isActive ? 'true' : 'false', user1.contacts.map(contact => contact.firstName));

  } catch (error) {
    console.log(error.message);
  }
  


     
  
  

