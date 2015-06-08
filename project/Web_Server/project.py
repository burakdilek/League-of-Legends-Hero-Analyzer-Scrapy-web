# -*- coding: utf-8 -*-
import web
import json
import time
import codecs

urls = (
    '/query_title', 'find_titles',
    '/', 'index',
    '/chart1', 'chart1',
    '/chart2', 'chart2',
    '/chart1_query', 'chart1_query',
    '/chart2_query', 'chart2_query',
    '/about','about'
)
input_file  = file("data_all.json", "r")
# data = json.loads(input_file.read().decode("utf-8-sig"))
data = json.loads(input_file.read())

render = web.template.render("templates", base="base")

input_file  = file("data_all.json", "r")
data = json.loads(input_file.read())
class test:
    def GET(self):
       print self
       d = (1,2,3) # { 'a':5, 'b':7, 'name':"cat", 'arr': [1,2,3,4] }
       inp = web.input()
       print inp
       print (inp.get("age", 100))
       # print json.dumps(d)
       term = inp.get("term", "default string")
       date = int(inp.get("date", 1990))
       date = date / 2
       print date
       return json.dumps({'t': term.upper(), 'd':date})
class find_titles:

    def GET(self):

       time.sleep(1.5);
       inp = web.input()
       title = inp.get("title").lower()
       if title == None:
         return json.dumps({'status': "error", 'mesg':"You need to supply a keyword"})
       else:
         found_heros = []
         for hero in data[1:] :
           if hero['Champion'].lower().find(title) != -1:
              found_heros.append(hero)

         for i in data[0]["basic_features"] :
           if i['Champion'].lower().find(title) != -1:
             for j in found_heros :
                if j['Champion'].lower().find(title) != -1:
                    j.update({'features': i})


         return json.dumps({'status': "ok",
                            'heros' : found_heros}
                            )

class chart1:
    def GET(self):
       return render.chart1()

class about:
    def GET(self):
       return render.about()

class chart2:
    def GET(self):
       return render.chart2()

class chart1_query:
    def GET(self):
       from collections import Counter
       rps = [hero['RP'] for hero in data[0]["basic_features"] ]
       result = [ (rp, rps.count(rp)) for rp in set(rps) ]
       return json.dumps(sorted(result, key=lambda pair: pair[0]))
       return json.dumps(Counter(rps))


class chart2_query:
    def GET(self):
       from collections import defaultdict, Counter
       # return (data[122]["last_name"], len(data[122]["last_name"]))
       result = []
       for hero in data[0]['basic_features']:
           names = hero["Champion"]
           vowels = [ch.replace(u"I",u"ý").lower() for ch in names.replace(u"I",u"ý").lower() if ch in u"aeýioöuü"]
           result.extend( [(v1,v2) for (i,v1) in enumerate(vowels) for (j,v2) in enumerate(vowels) if j == i+1] )
       result = [ (u"aeýioöuü".find(x),u"aeýioöuü".find(y),z) for ((x,y), z) in Counter(result).items()]
       return json.dumps(result)

class index:
    def GET(self):
       return render.index()

def cleanData(string):

    new_string = ''
    for i in string.split():

        if i[:1] == "%" :
            new_string = new_string.strip() + ' ' + i[1:]
        else:
           new_string = new_string.strip() + ' ' + i
    return new_string

if __name__ == "__main__":
    app = web.application(urls, globals())
    web.httpserver.runsimple(app.wsgifunc(), ("127.0.0.1", 1234))

