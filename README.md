# WikiMedia Stream Monitor

## Start UI
```bash
  $ ng serve
```
## Start backend
```bash
  $ cd backend-db
  $ bash start.sh
```
## Local Runtime Version
- Python for Backend
- Angular for Fronent
- TailwindCSS for styling

```bash
  $ python --version
  Python 3.11.9
  $ json-server --version
  1.0.0-beta.2
  $ node --version
  v18.20.4
  $ ng version
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 17.3.8
Node: 18.20.4
Package Manager: npm 10.7.0
OS: win32 x64

Angular: 17.3.12
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1703.8
@angular-devkit/build-angular   17.3.8
@angular-devkit/core            17.3.8
@angular-devkit/schematics      17.3.8
@angular/cdk                    17.3.10
@angular/cli                    17.3.8
@angular/material               17.3.10
@schematics/angular             17.3.8
rxjs                            7.8.1
typescript                      5.4.5
zone.js                         0.14.10
```

## Report

### Things done
-	Show basic info and some details per entry
-	Pagenation
-	Filter stream by various aspects
--	Preserve filter control with marks
-	Mark seen

### Future Improvement
1.	UI could change to using Real Stream with Observable, Subscribe and Rxjs
a.	Currently, using python in the backend to fetch 100 records at a time and take down the last_id for future requests.
b.	If change to user the live streaming directly from https://stream.wikimedia.org/v2/stream/recentchange backend might not be required.
2.	In order to track the changes offline, I will change the backend DB from json file into PostgreSQL DB and use the Python Flask with SQLAlchemy as ODBC. This proper API server could improve the performance and IO with UI for reading and marking entries easily. Also, a separate microservice can keep running in the backend as a listener to the latest changes upstream.
In current implementation, the UI does not require many changes, because it’s reading and calling the backend API at the moment. A refresh button could be implemented for UI to request a new batch of entries.
3.	The scaling issue is mainly on fetching of the recent changes from the stream.wikimedia API. Need to be careful about the rate limit and retries.
4.	For the seen/dealt mark, 
a.	If it’s for personal usage, it’s better to save it further into cookies. 
b.	If it’s sharing between multiple admins/users, we could add as additional attribute in the backend DB to track if someone else has dealt with it.
5.	Build docker image to avoid local node and Angular dependencies.
6.	Integrated the data with other APIs liftwing and mediawiki.
7.	Download the detail of entry as a JSON text file.

### UI views
Please refer to the report.pdf in the project