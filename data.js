var mqtt = require('mqtt')
var jsonata = require("jsonata")
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://192.168.84.17:27017/workshopdb", function(err, db) {
  if(!err) {
    console.log("Connected to MongoDB");
  }
  var collection = db.collection('zapis1');

  var client = mqtt.connect("tls://testrtls.kontakt.io:8083", {connectTimeout: 5000, username: "Konrad", password: "rRTrNccBDyZAmJclNOLmFJvmTRTYdZMH"});

  client.on('connect', function () {
  	console.log("connect")
  	client.subscribe('/presence/stream/h2cqL')
  	client.subscribe('/presence/stream/8JRGb')
  	client.subscribe('/presence/stream/H3vx9')
  	client.subscribe('/presence/stream/QQhDc')
  	client.subscribe('/presence/stream/9McaT')
  	client.subscribe('/presence/stream/HNenF')
  	client.subscribe('/presence/stream/rNt0R')
  	client.subscribe('/presence/stream/ZN6Xd')
  	client.subscribe('/presence/stream/KVi9X')
  	client.subscribe('/presence/stream/hUs0W')
  })

var results = {}

client.on('message', function (topic, message) {
	var device = jsonata("$[trackingId=\"mabs\"]").evaluate(JSON.parse(message.toString()));
	if (device != undefined) {
    //console.log()
    collection.insert(device, {w:1}, function(err, result) {
      if (result != undefined) {
        console.log("Timestamp: " + device["timestamp"] + " SourceId: " + device["sourceId"] + " RSSI: " + device["rssi"]);
      }
      if (err!=null) {
        console.log(err);
      }
    });
	}
})


client.on('error', function (error) {
	console.log("error")
	console.log(error)
})

client.on('close', function () {
    console.log('close');
    client.end();
});

});


console.log("Start")
