const mongoose = require('mongoose');
const AES = require('../middleware/AES')

// message schema
const MessageSchema = mongoose.Schema({
  created: {
    type: Date,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  conversationId: {
    type: String,
    required: true
  },
  inChatRoom: {
    type: Boolean,
    required: false
  },
  conversation:{
    type:String
  }
});

MessageSchema.statics.addMessage = (message, callback) => {
  // message.save(callback);
  console.log("callback is",message)
  let encrypt=AES.encrypt(message)
  console.log("encypted message is",encrypt);
  let messag = new Message();
  messag.created=message.created
  // messag.text = message.text
  messag.text= message.text
  messag.from = message.from;
  messag.conversationId=message.conversationId;
  messag.inChatRoom=message.inChatRoom
  messag.conversation=encrypt.encryptedData;
  messag.save();
};

MessageSchema.statics.getMessages = (callback) => {
  Message.find({}, callback);
};

MessageSchema.statics.getMessagesByConv = (id, callback) => {
  Message.find({conversationId: id}, callback);
};


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
