import json
from sseclient import SSEClient as EventSource
import copy
import os.path

url = 'https://stream.wikimedia.org/v2/stream/recentchange'

fname = 'recentchange.json'
COUNT=100
c=0
last_id=None
stream_list = []

if os.path.isfile("last_id.txt"):
    with open('last_id.txt','r') as f:
        lastline = f.readlines()[-1]
        try:
            tmp = json.loads(lastline)
            print(isinstance(tmp, list))
            last_id = lastline
        except:
            print('no last line')

if os.path.isfile("recentchange.json"):
    with open("recentchange.json", 'r') as f:
        stream_list = json.loads(f.read())['streams']
# last_id = '''[{"topic":"eqiad.mediawiki.recentchange","partition":0,"timestamp":1724357747001},{"topic":"codfw.mediawiki.recentchange","partition":0,"offset":-1}]'''
# print(stream_list)
for event in EventSource(url, last_id=last_id):
    if event.event == 'message':
        try:
            change = json.loads(event.data)
            print(change)
            stream_list.append(change)
        except ValueError:
            pass
        else:
            # discard canary events
            if change['meta']['domain'] == 'canary':
                continue         
            print('{user} edited {title}'.format(**change))
            if c==COUNT:
                last_ch = copy.deepcopy(change)
                print(last_ch)
                print(event.id)
                break
            c = c+1

with open('recentchange.json', 'w') as f:
    json.dump({'streams':stream_list}, f)

with open('last_id.txt','w') as f:
    f.write(event.id)