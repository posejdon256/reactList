import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export const People = new Mongo.Collection("people");

if(Meteor.isServer){
  Meteor.publish(null, () => People.find());
}
Meteor.methods({
  "people.insert":function(item){
    check(item, Object);
    People.insert({
      _id: item._id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      gender: item.gender,
      ip_address: item.ip_address,
      selected: item.selected,
      edited: item.edited,
      userId: item.userId
    });
  },
  "people.remove": function(id){
    People.remove(id);
  },
  "people.update": function(item){
    People.update(item._id,{$set:{
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      gender: item.gender,
      ip_address: item.ip_address,
      selected: item.selected,
      edited: item.edited
    }});
  }

});
