Software Dependencies:-

(A) Angular (Currently version 8)

(B) Mongodb

(C) Nodejs (currently version )

(d) Robo 3T - MongoDB Database Client (https://robomongo.org/download)

Configure the project in the steps mentioned below:

(A) Angular
Go to "frontend" folder and do the following tasks:

1. If Angular is not installed then type the following in command prompt:
npm install -g @angular/cli

2. Type the following command prompt in "frontend" folder:
npm install

3. Run the "frontend" server by typing:
npm start


(B) MongoDB

1. Install MongoDB from the following site:
https://docs.mongodb.com/manual/installation/

2. Create a "db" directory e.g. C:\data\db

Run the MongoDB server by typing the following command (present in the mongodb bin folder)
"mongod --dbpath C:\data\db"
(or)
run "mongod"

(C) NodeJS:-

1. Install nodejs from : https://nodejs.org/en/download/

2. Now go to "backend" folder and type the following command
npm install

3. Then run the backend server by typing
npm start
