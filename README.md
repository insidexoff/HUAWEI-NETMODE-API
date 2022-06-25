# Huawei-NetMode-Changer

node api.js

curl -X POST localhost:3600/net/setmode --data "mode=4G&band=['LTE_B3']"
 
curl -X POST localhost:3600/net/setmode --data "mode=4G&band=['LTE_B1''LTE_B3']"
