# Workshop project 2017

## What this repository includes?
This repository consinst of those files:
* **data.js** this file is connecting to the Kontakt.io API and fetching the data about RSSI and writing it to MongoDB
* **script.py** this scrip is basic example presenting how to connect to the MongoDB and print first 5 element of the collection in DB

## Location Engine
Location Engine is software & hardware product offered by Kontakt.io. As a hardware you need to have at least 4 [Gateways](https://store.kontakt.io/next-generation/33-gateway.html) and one beacon. During the test I used [Card Beacon](https://store.kontakt.io/next-generation/31-card-beacon.html). In brief Gateways are devices that are mounted inside the venues to monitor the surrouning area for beacons. But what are beacons? Beacons are small sensors that broadcast **Bluetooth Low Energy** (BLE) packets. Those packets are called an advertising packets becouse the idea is that beacon is just broadacting. The way it works is analogous to the sea beacons that are lighting all around itselves. Gateways then send the data about seen beacon and the RSSI that it had to the cloud from where we fetch it using **data.js** script.

### Calculate distance from RSSI
We have to create temporary variable which is *ratio* to help us calculate the distance based on RSSI and TxPower.
~~~ java
if rssi == 0
  return -1
ratio = rssi * 1.0 / TxPower
if (ratio < 1.0)
  return ratio^10
else
  dist = (0.89976) * (ratio ^ 7.7095) + 0.111
~~~
Where dist is the distance that we want to calculate, TxPower power of the signal broadcasted by the beacon (decimal value and constant). For Card Beacons, this value is by default equal to 6. Received signal strength indication (RSSI) is the value that we fetched from the Kontakt.io API.

## Prerequisites
To run this repository properly  you have to install:
* **Python 3**
* **Node.js**
* **MongoDB**

However there are also needed python packages
* **keras**
* **pandas**
* **numpy**

You can simply install them using *pip* command
~~~ bash
pip install package_name
~~~

In the next step download this repository as a zip file or clone it
~~~ bash
git clone XXX
cd XXX
~~~

## Contribution
* [**Konrad Bujak**](https://www.linkedin.com/in/konrad-bujak-024445122/) is the author and the owner of this project
* **Kontakt.io** (Kontakt Micro-Location Sp. z o. o.) provided the hardware to run this project
