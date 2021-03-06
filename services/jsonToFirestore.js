var fs = require('fs');

const admin = require('firebase-admin');

var serviceAccount = require('./TransZip-73784d11b491.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


async function writeToFirestore(stops) {

    for (var i = 0; i < stops.length; i++) {

        let log = await db.collection('liveTraffic').doc(i.toString()).set(stops[i]);
        console.log('Done with ' + i.toString() + '!');

    }

    let doc = await db.collection('liveTraffic').doc("52").get();
    console.log(doc);

}

var file = fs.readFileSync('../stopscoordinates.json');

var stops = JSON.parse(file);

writeToFirestore(stops).then(res => {
    console.log("Done with everything!");
});





