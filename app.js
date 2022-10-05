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
express.set(cors());
express.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
io.on("connection",(s)=>{
	console.log(s.id+" is now connected");
	s.on("f",(d)=>{
		io.sockets.emit("f",d);
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
