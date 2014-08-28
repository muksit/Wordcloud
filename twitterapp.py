from TwitterAPI import TwitterAPI
import nltk
from counter import Counter 
import os, time, json, datetime 
import appconfig
from json import JSONEncoder, load
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, json, jsonify, send_file


# create application 
app = Flask(__name__)
app.config.from_object(__name__)
app.config["DEBUG"] = True  # True only when testing


api = TwitterAPI(appconfig.apikeys['key'], appconfig.apikeys['secret'], appconfig.apikeys['token'], appconfig.apikeys['token_secret'])

blacklist = "a,we,We,table,It,Our,us,us.,/,/,The,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your".split(",")

wordtograph = ""
@app.route('/',)
def input():
    return render_template('index.html')


#return list of words
@app.route('/ask')
def givecloud():
    wordtograph = request.args.get('word')
    words = getwordlist(wordtograph) 
    filteredwords = wordfilter(words)
    countedwords = getFrequency(filteredwords)
    return json.dumps(countedwords)
    
  
def getwordlist(word):
    r = api.request('search/tweets', {'q': word, 'lang': 'en', 'count': 100}) 
    sentencearray = []
    wordarray = []
    for item in r:
        sentence = item['text'].split()
        for idx, word in enumerate(sentence):
            wordarray.append(sentence[idx].lower())
    return wordarray #returns a list of words in format [u'text', u'text2', u'text3']

def wordfilter(listofwords): #takes list as argument
    newlist = []
    for word in listofwords:
        if ((containsObject(word, blacklist) == False) and (word[:4] != "http") and (word[:2] != "rt") and (word != wordtograph)):
            word.strip(',')
            if word[0] =="#":
                word = word[1:]
            newlist.append(word)
        # if (adverb(list[word], ))
    return newlist   


def containsObject(wordtotest, blacklist):
    if wordtotest in blacklist:
        return True
    else:
        return False


def getFrequency(text): 
    freq = Counter(text) 
    
    return dict(freq.most_common(150))
   


if __name__ == '__main__':
    app.run()

