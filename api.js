const { setupMaster } = require('cluster');
const { Connection, Device, Net } = require('huawei-lte-api');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());
const port = 3600;
var lte_band_1 = 0x1;
var lte_band_2 = 0x2;
var lte_band_3 = 0x4;
var lte_band_4 = 0x8;
var lte_band_5 = 0x10;
var lte_band_7 = 0x40;
var lte_band_8 = 0x80;
var lte_band_20 = 0x80000;
var lte_band_32 = 0x80000000;
var lte_band_28 = 0x8000000;
var lte_band_38 = 0x2000000000;
var lte_band_40 = 0x8000000000;
var lte_band_41 = 0x10000000000;
var lte_band_42 = 0x20000000000;
var lte_band_all = 0x1A08A0C00DF;
var config = 0;
var g_net_mode = 0;

const connection = new Connection('http://admin:YOUR_PASSWD@192.168.8.1/');

connection.ready.then(() => {
    const device = new Device(connection);
    const net = new Net(connection);

    //Can be accessed without authorization
    app.get('/device/signal', (req, res) => {
        device.signal().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });

    });
    app.get('/device/information', (req, res) => {
        device.information().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get('/net/currentplmn', (req, res) => {
        net.currentPlmn().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    });

    app.get('/net/netmode', (req, res) => {
        net.netMode().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    });

    app.post('/net/setmode', (req, res) => {
        let bandselect = eval(req.body.band);
        let config;
        let setmode;
        if (bandselect.includes('LTE_ALL')) {
            config = '7FFFFFFFFFFFFFFF';
        } else {
            config = 0;
            bandselect['LTE_ALL'] = false;
            if (bandselect.includes('LTE_B1'))
                config += lte_band_1;
            if (bandselect.includes('LTE_B2'))
                config += lte_band_2;
            if (bandselect.includes('LTE_B3'))
                config += lte_band_3;
            if (bandselect.includes('LTE_B4'))
                config += lte_band_4;
            if (bandselect.includes('LTE_B5'))
                config += lte_band_5;
            if (bandselect.includes('LTE_B7'))
                config += lte_band_7;
            if (bandselect.includes('LTE_B8'))
                config += lte_band_8;
            if (bandselect.includes('LTE_B20'))
                config += lte_band_20;
            if (bandselect.includes('LTE_B28'))
                config += lte_band_28;
            if (bandselect.includes('LTE_B32'))
                config += lte_band_32;
            if (bandselect.includes('LTE_B38'))
                config += lte_band_38;
            if (bandselect.includes('LTE_B40'))
                config += lte_band_40;
            if (bandselect.includes('LTE_B41'))
                config += lte_band_41;
            if (bandselect.includes('LTE_B42'))
                config += lte_band_42;
        }
        //config = lbm;
        let reqmode = req.body.mode;
        if (reqmode === 'AUTO') {
            setmode = '00';
        }
        if (reqmode === '2G') {
            setmode = '01';
        }
        if (reqmode === '3G') {
            setmode = '02';
        }
        if (reqmode === '4G') {
            setmode = '03';
        }
        let setband = config.toString(16).toUpperCase();
        console.log({ modex: setmode, c: '3FFFFFFF', bandx: setband })

        net.setNetMode('3FFFFFFF', setband, setmode).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });

        //res.send(JSON.stringify(req.body.band));
    });



    app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))


});
