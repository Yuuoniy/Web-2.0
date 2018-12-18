### sign in

运行前请保证电脑安装mongodb  
请保证 27017 端口没有被占用，可使用 `netstat -aon|findstr 27017` 检查  
首先启动数据库   
`mongod --dbpath 数据库路径` 使用默认端口 27017  
如 `mongod --dbpath D:/database`  
打开项目所在目录，执行  
`npm start`  
输入 `localhost:8000`  访问网页  
若发现运行时错误请提出，谢谢！
