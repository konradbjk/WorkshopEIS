# Workshop project 2017

## What this repository includes?
This repository consinst of those files:
* **data.js** this file is connecting to the Kontakt.io API and fetching the data about RSSI and writing it to MongoDB
* **script.py** this scrip is basic example presenting how to connect to the MongoDB and print first 5 element of the collection in DB
* **obejscie_biura.ipynb** this file has the the recorded the path around the office
* **notebook1.ipynb** this notebook is used to get to know the data and play around it
* **graph_search.ipynb** This notebook includes basic implementations of graph search algorithms

## Prerequisites
To run this repository properly  you have to install:
* **Python 3**
* **Node.js**
* **MongoDB**

However there are also needed python packages
* **keras**
* **pandas**
* **numpy**
* **jupyter**

You can simply install them using *pip* command
~~~ bash
pip install package_name
~~~

In the next step download this repository as a zip file or clone it
~~~ bash
git clone https://github.com/konradbjk/WorkshopEIS.git
cd WorkshopEIS
~~~

Open the **data.js** file and change the data inside it to your needs. To run this project I have set MongoDB server on my RaspberryPi. Each of the runs should be saved to the different data collection.

You can test connection to the MongoDB using **script.py**.

To see the *.ipynb* files head to the project folder (if you are not inside it) and run jupyter notebooks
~~~ bash
cd ~/WorkshopEIS

jupyter notebook
~~~
## Location Engine
Location Engine is software & hardware product offered by Kontakt.io. As a hardware you need to have at least 4 [Gateways](https://store.kontakt.io/next-generation/33-gateway.html) and one beacon. During the test I used [Card Beacon](https://store.kontakt.io/next-generation/31-card-beacon.html). In brief Gateways are devices that are mounted inside the venues to monitor the surrouning area for beacons. But what are beacons? Beacons are small sensors that broadcast **Bluetooth Low Energy** (BLE) packets. Those packets are called an advertising packets becouse the idea is that beacon is just broadacting. The way it works is analogous to the sea beacons that are lighting all around itselves. Gateways then send the data about seen beacon and the RSSI that it had to the cloud from where we fetch it using **data.js** script.

## Algorithms

Most of the algorithms are explained in the jupyter notebooks

### SLAM
**SLAM** stands for **Simultaneous Localization and Mapping**. SLAM is the computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it. Popular approximate methods solving this problems include **particle filter** (aka **Sequential Monte Carlo** SMC), **Bundle adjustment** and **extended Kalman filter**. SLAM algorithms are tailored to avaiable resources, not aimed at perfection but operational compliance.

Given a series of sensor observations ![alt_text](http://bit.ly/2w0j3yR) over discrete time steps *t* , the SLAM problem is to compute an estimate of the agent's location
![alt_text](http://www.sciweavers.org/tex2img.php?eq=%20x_%7Bt%7D%20&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0)
 and a map of the environment ![alt_text](http://bit.ly/2yeGypu). All quantities are usually probabilistic, so the objective is to compute:

![alt_text](https://wikimedia.org/api/rest_v1/media/math/render/svg/55e70fdde5a9cba64f55bdc9c1a9df0fa014799a)

### Why A-star?
A star algorithm is used very often as path finding one. It has many pros

### Calculate distance from RSSI
Becouse BLE beacons only broadcast their ID, the *Received Signal Strength Indication* (RSSI) is used in order to extract position information out of the beacon signal. The RSSI value can then be converted into a distance measurement.

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


## Contribution
* [**Konrad Bujak**](https://www.linkedin.com/in/konrad-bujak-024445122/) is the author and the owner of this project
* **Kontakt.io** (Kontakt Micro-Location Sp. z o. o.) provided the hardware to run this project
