/*
* @Author: Yuuoniy
* @Date:   2017-12-22 13:56:22
* @Last Modified by:   Yuuoniy
* @Last Modified time: 2017-12-22 15:05:22
*/
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/signup`;
let db;
MongoClient.connect(url).then((client)=>{
    db = client.db('singin')
    console.log(client)
}).catch((err)=>{
   debug('connect to mongodb' + url + ' was failed with error: ', error);
}).then(()=>{
   module.exports = db;
})
// console.log(db)

