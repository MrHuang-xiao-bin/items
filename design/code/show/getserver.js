
const { request, response } = require('express');
const express=require('express');
const mysql=require('mysql');
const app=express();
var fs=require('fs');
var path=require('path');
var multer=require('multer');
 
app.get('/getall',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql='SELECT fid,fname,remarks,price,img,remain,sold FROM food';

 pool.query(sql,function(err,result){
	if(err){
		console.log('error:',err.message);
		return;
	}
	
   // console.log(JSON.stringify(result));
   // let str=JSON.parse(result);
	response.send(result);
});
pool.end();


});

var bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('/upload',(request,response)=>{
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query=request.query;//url上参数获取
	var body=request.body;
	//console.log("ok")
	
	var pool=mysql.createConnection({
	  host:'127.0.0.1',
	  user:'root',
	  password:'root',
	  port:'3306',
	  database:'design',
	  dateStrings : true
	  
  });
  pool.connect();
  var sql1='INSERT INTO uploaded(oid,desknum,username,id,name,price,needamount,time,success) VALUES(null,?,?,?,?,?,?,?,?)';
  var parm1=[query.desknum,query.username,query.id,query.name,query.price,query.needamount,query.time,"未做"];
  pool.query(sql1,parm1,(err, result1) => {
		  if (err) {
			  console.log('error:', err.message);
			  return;
		  }
	
		response.send(result1);
		//console.log(parm)
	  });
	// console.log(request.headers)
pool.end();
});

app.all('/updatedata',(request,response)=>{
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	 var query1=request.query;
	// console.log(query1);
var url=request.url;

	//var m=Object.keys(request.body)//send参数和data参数获取键值对key值(body-parser)
	// console.log(JSON.parse(m));

	var pool=mysql.createConnection({
		host:'127.0.0.1',
		user:'root',
		password:'root',
		port:'3306',
		database:'design',
		dateStrings : true
		
	});
	pool.connect();
	var sql2='UPDATE food SET remain=?,sold=? WHERE fid=? AND fname=?';
	var parm2=[query1.remain,query1.sold,query1.fid,query1.fname];
	pool.query(sql2,parm2,(err, result2) => {
			if (err) {
				console.log('error:', err.message);
				return;
			}
		});
		pool.end();
});

app.get('/getorder',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql3='SELECT oid,desknum,username,id,name,price,needamount,time,success FROM uploaded';

 pool.query(sql3,function(err,result3){
	if(err){
		console.log('error:',err.message);
		return;
	}
	
	response.send(result3);
});
pool.end();


});

app.get('/getorderbydeskandname',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query4=request.query;
	//console.log(query4)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql4='SELECT oid,desknum,username,id,name,price,needamount,time,success FROM uploaded WHERE desknum=? AND username=?';
var param4=[query4.desknum,query4.username];
 pool.query(sql4,param4,(err, result4) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }

		 response.send(result4);
	 });
pool.end();
});
app.post('/updatesuccess',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query5=request.query;
	//console.log(query5)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql5='UPDATE uploaded SET success=? WHERE desknum=? AND username=? AND id=? AND name=? AND time LIKE BINARY "%'+query5.time+'%"';
var param5=[query5.success,query5.desknum,query5.username,query5.id,query5.name];
 pool.query(sql5,param5,(err, result5) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }

		
	 });
pool.end();
});
app.post('/delorder',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query6=request.query;
	//console.log(query6.time)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql6='DELETE FROM uploaded WHERE desknum=? AND username=? AND id=? AND name=? AND time LIKE BINARY "%'+query6.time+'%"';
var param6=[query6.desknum,query6.username,query6.id,query6.name];
//console.log(param6)
 pool.query(sql6,param6,(err, result6) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
//console.log(result6)
		response.send(result6)
	 });
pool.end();
});
app.post('/changeorder',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query7=request.query;
	//console.log(query6.time)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql7='UPDATE uploaded SET id=?,name=?,price=?,needamount=?,time=?,success=? WHERE desknum=? AND username=? AND id=? AND name=? AND time LIKE BINARY "%'+query7.time+'%"';
var param7=[query7.changeid,query7.changename,query7.changeprice,query7.changeneedamount,query7.changetime,query7.changesuccess,query7.desknum,query7.username,query7.id,query7.name];
//console.log(param7)
 pool.query(sql7,param7,(err, result7) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result7)
	 });
pool.end();
});
app.post('/delfood',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query8=request.query;
	//console.log(query6.time)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql8='DELETE FROM food WHERE fid=? AND fname=?';
var param8=[query8.fid,query8.fname];
//console.log(param7)
 pool.query(sql8,param8,(err, result8) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		 
fs.unlink(path.join(__dirname,query8.oldfimg),function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("文件删除成功！");
 });
		response.send(result8)
	 });
pool.end();
});
app.post('/updatedelfid',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	//console.log(query6.time)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='UPDATE food SET fid=fid-1 WHERE fid>?';
var param9=[query9.fid];
//console.log(param7)
 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		
	 });
pool.end();
});
app.all('/findfoodbyidname',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	//console.log(query6.time)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='SELECT fid,fname,remarks,price,img,remain,sold FROM food WHERE fid=? AND fname=?';
var param9=[query9.fid,query9.fname];
//console.log(param7)
 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9);
	 });
pool.end();
});
app.all('/findfoodbyname',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	//console.log(query9)
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='SELECT fid,fname,remarks,price,img,remain,sold FROM food WHERE fname=?';
var param9=query9.fname;
//console.log(param7)
 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9);
	 });
pool.end();
});

app.post('/updateaddfid',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='UPDATE food SET fid=fid+1 WHERE fid>=?';
var param9=[query9.fid];

 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9)
	 });
pool.end();
});

app.post('/updatedayfremain',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='UPDATE food SET remain=100';
 pool.query(sql9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9)
	 });
pool.end();
});
app.post('/changefood',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var query9=request.query;
	
  var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var sql9='UPDATE food SET fid=?,fname=?,remarks=?,price=?,remain=?,sold=? WHERE fid=? AND fname=?';
var param9=[query9.changeid,query9.changename,query9.changeremarks,query9.changeprice,query9.changeremain,query9.changesold,query9.fid,query9.fname];

 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9)
	 });
pool.end();
});
var upload=multer({dest:'uploads/'});

app.all('/addfood',upload.single("file"),(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var file=request.file;
	var body=request.body;
	var query=request.query;
	// console.log(query.fid);
	// console.log(body.fid);
	// console.log(file)
fs.readFile(file.path,(err,data)=>{
	if (err) {
		return response.send("上传失败！");
	}
	
	var newname=query.fname+parseInt(Math.random()*1000)+parseInt(Math.random()*1000);
	var extname=file.mimetype.split("/")[1];
	var news=newname+'.'+extname;
fs.writeFile(path.join(__dirname,'../images/'+news),data,(err=>{
	if (err) {
		return response.send("写入失败！")
	}
 var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var img='../images/'+news;
var sql9='INSERT INTO food(fid,fname,remarks,price,img,remain,sold) VALUES(?,?,?,?,?,?,?)';
var param9=[query.fid,query.fname,query.fremark,query.fprice,img,query.fremain,"0"];
//console.log(param7)
 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		response.send(result9);
	 });
pool.end();
}))

fs.unlink(file.path,function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("文件删除成功！");
 });
})
});

app.all('/changefimage',upload.single("file"),(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	var file=request.file;
	var body=request.body;
	var query=request.query;
	// console.log(query.fid);
	// console.log(body.fid);
	// console.log(file)
fs.readFile(file.path,(err,data)=>{
	if (err) {
		return response.send("上传失败！");
	}
	
	var newname=body.fname+parseInt(Math.random()*1000)+parseInt(Math.random()*1000);
	var extname=file.mimetype.split("/")[1];
	var news=newname+'.'+extname;
fs.writeFile(path.join(__dirname,'../images/'+news),data,(err=>{
	if (err) {
		return response.send("写入失败！")
	}
 var pool=mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	port:'3306',
	database:'design',
	dateStrings : true
	
});
pool.connect();
var img='../images/'+news;
var sql9='UPDATE food SET img=? WHERE fid=? AND fname=?';
var param9=[img,body.fid,body.fname];
//console.log(param7)
 pool.query(sql9,param9,(err, result9) => {
		 if (err) {
			 console.log('error:', err.message);
			 return;
		 }
		 
		response.send(img);
	 });
pool.end();
}))

fs.unlink(path.join(__dirname,body.oldfimg),function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("文件删除成功！");
 });

 fs.unlink(file.path,function(err) {
	if (err) {
		return console.error(err);
	}
	console.log("文件删除成功！");
 });
})
});
//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});

