# Backend server

## Start the backend server for the UI to read data

```bash
  json-server --watch recentchange.json
```

## Generate Backend DB in json
Run the python script to generate the last_id for future reference and generate the main db json file for the UI to read.

```bash
  python read_recentchange.py 
```
After running the python script the following files will get generate
```bash
  ~ backend-db $ ls
  last_id.txt  recentchange.json
```