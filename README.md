# TODO-Assignment-Backend
  <br />
Backend  : NodeJS  <br />
Database : MySQL  <br />
APIs     : Postman  <br />
  <br />
The Application runs on Port 8000.  <br />
  <br /><br />
I have Included the following APIs :  <br />
1. SignUp :<br /> &emsp; Takes input username, email, password ; checks if user already exists with same username or email ; creates new user <br />
2. Login :<br /> &emsp; Takes input username, password ; checks in DB if a user with same username or email and password exists ; logs in user <br />
3. GetTasks :<br /> &emsp; Takes input userID ; displays the Task_title , Create_date of all active tasks created by user  <br />
4. GetTask :<br /> &emsp; Takes input userID, taskID ; displays all the information about task  <br />
5. PostTask :<br /> &emsp; Takes input UserID , Task_title , Task_description ; creates new task  <br />
6. PutTask :<br /> &emsp; Takess input userID , taskID , Task_title , Task_description ; updates existing task  <br />
7. DelTask :<br /> &emsp; Takes input userID, taskID ; deletes existing task <br />
  <br /><br /><br />
The Databse is made in MySQL, here is the Schema I made for the DB :  <br />
  <br />
  Database : ToDo  <br />
  <br />
  Table : Users  <br />
  {  <br />
     &emsp;ID : int primary key  <br />
     &emsp;Username : string(30)  <br />
     &emsp;Email : string(30)  <br />
     &emsp;Password : string(30)  <br />
  }  <br />
  <br />
  Table : Tasks  <br />
  {  <br />
     &emsp;ID : int primary key  <br /> 
     &emsp;UserID : int  <br />
     &emsp;Task_title : string(30)  <br />
     &emsp;Task_description : string(200)  <br /> 
     &emsp;Create_date : date  <br />
  <br />
     &emsp;UserID foreign key from Table Users(ID)  <br />
  }  <br />
