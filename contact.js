const ContactInfo = require('./ContactInfo');
class Contact {
    constructor(cName) {
      this.cName = cName;
      this.contactInfos = [];
    }
  
    static newContact(cName) {
      if (typeof cName !== 'string') {
        throw new Error('Contact name must be a string.');
      }
      return new Contact(cName);
    }
  
    addContactInfo(type, value) {
      const contactInfo = new ContactInfo(type, value);
      this.contactInfos.push(contactInfo);
      return contactInfo;
    }
  
    deleteContactInfo(contactInfo) {
      const index = this.contactInfos.indexOf(contactInfo);
      if (index !== -1) {
        this.contactInfos.splice(index, 1);
      }
    }
  }
  
  module.exports = Contact;
  