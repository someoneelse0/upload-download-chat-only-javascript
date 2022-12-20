const express=require("express")();
const http=require("http").Server(express);
const io=require("socket.io")(http);
const cors=require("cors");
const multer=require("multer");
const s=multer.diskStorage({
	destination:"files/",
	filename:function(req,file,cb){
		cb("",file.originalname);
	}
});
const up=multer({
	storage:s
});
express.use(cors());
express.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
let userzero="";
let userone="";
let d="";
let dd="";
let aa="";
io.on("connection",(s)=>{
	console.log(s.id+" is now connected");
	s.on("f",(d)=>{
		userzero!=""?userone=d.username:userzero=d.username;
		if(userzero==userone){
			d="<p class='one'>"+userzero+": "+d.message+"</p>";
			io.sockets.emit("f",d);
		}else{
			d="<p class='two'>"+userone+": "+d.message+"</p>";
			io.sockets.emit("f",d);
		}
	});
	s.on("ff",(d)=>{
		aa=d.file.split("\\")[2];
		userzero!=""?userone=d.usern:userzero=d.usern;
		if(userzero==userone){
			dd="<li class='one'>"+userzero+"\'s file: "+`<a href=download/${aa}>`+aa+"</a>"+"</li>";
			io.sockets.emit("ff",dd);
		}else{
			dd="<li class='two'>"+userone+"\'s file: "+`<a href=download/${aa}>`+aa+"</a>"+"</li>";
			io.sockets.emit("ff",dd);
		}
	});
	s.on("disconnect",(req,res)=>{
		console.log(s.id+" has been gone");
	});
});
express.post("/upload",up.single("a"),(req,res)=>{
	res.send("ok");
});
express.get("/download/:id",function(req,res){
	res.download(__dirname+"/files/"+req.params.id,req.params.id,function(e){if(e){console.log(e);}});
});
http.listen(3000,(req,res)=>{
	console.log("running...");
});
