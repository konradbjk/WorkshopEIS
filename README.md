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

***
## Location Engine
Location Engine is software & hardware product offered by Kontakt.io. As a hardware you need to have at least 4 [Gateways](https://store.kontakt.io/next-generation/33-gateway.html) and one beacon. During the test I used [Card Beacon](https://store.kontakt.io/next-generation/31-card-beacon.html). In brief Gateways are devices that are mounted inside the venues to monitor the surrouning area for beacons. But what are beacons? Beacons are small sensors that broadcast **Bluetooth Low Energy** (BLE) packets. Those packets are called an advertising packets becouse the idea is that beacon is just broadacting. The way it works is analogous to the sea beacons that are lighting all around itselves. Gateways then send the data about seen beacon and the RSSI that it had to the cloud from where we fetch it using **data.js** script.
***

## Algorithms

Most of the algorithms are explained in the jupyter notebooks

### SLAM
**SLAM** stands for **Simultaneous Localization and Mapping**. SLAM is the computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it. Popular approximate methods solving this problems include **particle filter** (aka **Sequential Monte Carlo** SMC), **Bundle adjustment** and **extended Kalman filter**. SLAM algorithms are tailored to avaiable resources, not aimed at perfection but operational compliance.

Given a series of sensor observations ![o_{t}](http://bit.ly/2w0j3yR)
over discrete time steps *t* , the SLAM problem is to compute an estimate of the agent's location
![x_{t}](http://www.sciweavers.org/tex2img.php?eq=%20x_%7Bt%7D%20&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0)
 and a map of the environment ![m_{t}](http://bit.ly/2yeGypu). All quantities are usually probabilistic, so the objective is to compute:

![Slam equation](https://wikimedia.org/api/rest_v1/media/math/render/svg/55e70fdde5a9cba64f55bdc9c1a9df0fa014799a)

Implementing SLAM will let us convert RSSI maps like this below

![Map RSSI values](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/map_rssi.png?raw=true)

into accurate radio maps

![accurate radio map](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/accurate_map.png?raw=true)

Sometimes those accurate maps we call fingerprints. Creating fingerprints from scratch is time consuming while the accuracy is similar.

![SLAM vs fingerprints](http://indoo.rs/wp-content/uploads/2016/01/indoo.rs_SLAM_Engine-1.png)

### Why A-star?
A star algorithm is used very often as path finding one. It has many pros

### Calculate distance from RSSI
Becouse BLE beacons only broadcast their ID, the *Received Signal Strength Indication* (RSSI) is used in order to extract position information out of the beacon signal. The RSSI value can then be converted into a distance measurement. The **[rssi_to_dist_dependency](https://github.com/konradbjk/WorkshopEIS/blob/master/rss_to_dist_dependency.ipynb)** contain the print this graph:

![Rssi to distance dependency](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/rssi_dist.png?raw=true)

As we see this relation is not linear. What is more each of the RSSI values is very noisy. We should assume about 10% threshold. Next thing, that RSSI gives us Line of Sight distance value but it happens that we actually recived reflected signal.
![LoS_NLoS.png](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/LoS_NLoS.png?raw=true)

To achieve better accuracy it is also recommended to make use of the height difference between Gateway and the beacon. We can assume height of the beacon to 1.5m as the cards should be on a leash.

![beacon_heaight](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/height_LOS.png?raw=true)

Each of the beacons broadcast in a sphere ![spheare_equation.png](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/spheare_equation.png?raw=true) Knowing the beacon height whe can create from this sphere a circle, where the center is at (xm,ym,zb) and the resulting radius rc is:
![radiusC.png](https://github.com/konradbjk/WorkshopEIS/blob/master/Graphics/radiusC.png?raw=true)

Next problem that is to solve is instability of the signal. To solve this we can for example implement **Finite Impulse Response** (FIR) alike in [this paper](http://ieeexplore.ieee.org/document/7818366/). 

#### Code
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

***
## Contribution
* [**Konrad Bujak**](https://www.linkedin.com/in/konrad-bujak-024445122/) is the author and the owner of this project
* **Kontakt.io** (Kontakt Micro-Location Sp. z o. o.) provided the hardware to run this project
