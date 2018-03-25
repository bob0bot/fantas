from flask import Flask, render_template, request, redirect
import datetime
import pytz # timezone 
import requests
import os
from pymongo import MongoClient
from wtforms import Form, TextField, validators, StringField,IntegerField,fields
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import CSRFError
from flask.ext.login import LoginManager
from flask.ext.login import login_user , logout_user , current_user , login_required


app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://heroku_j3fj5sp6:52bhbhggq8dpnsrlob9a7fnh0t@ds261828.mlab.com:61828/heroku_j3fj5sp6'
app.config['SECRET_KEY'] = 'c473c394c686e8eaa3d609b55b1c0ed3868011d82f549198'
WTF_CSRF_ENABLED = True
WTF_CSRF_SECRET_KEY = "\xe4,\x03\xf6\xc7\xcdVC\x98]\xce\x0e:\x1c\x8a\xbd\x03o\x91a\x90U\x0bK"
app.secret_key = "\x7f\xe0g\xe9\xc7u\xe2\x9a\xc4\xe9\x17T\r\xa4=\xc57\x82\x0em(\x88b\xa3"

csrf = CSRFProtect(app)


class ChalForm(Form):
    category = StringField('Category', [validators.Length(min=4, max=25)])
    tagline = StringField('Tagline', [validators.Length(min=6, max=35)])
    level = IntegerField('Level')
    daretext = StringField('Dare Text', [validators.Length(min=6, max=128)])
    status = StringField('status')
    boostval = IntegerField('Boost Points')
    imgUrl = StringField('Img Url',[validators.Length(min=6, max=128)])


@app.route('/', methods=['GET'])
def home_page():

  client = MongoClient(app.config['MONGO_URI'])
  db=client.get_default_database()
  collection = db["challenges"]
  cursor = collection.find({})
  obj = []
  mydick ={}
  for document in cursor:
    coll={}
    coll['category']=document['category']
    coll['tagline']=document['tagline']
    coll['level']=document['level']
    coll['daretext']=document['daretext']
    coll['status']=document['status']
    coll['boostval']=document['boostval']
    coll['imgUrl']=document['imgUrl']
    obj.append(coll)
    #print obj


  
  # obj2 = []
  # mydict1={}
  # mydict1['category']='Romantic'
  # mydict1['name']='TapitBaby'
  # obj2.append(mydict1)
  # mydict1={}
  # mydict1['category']='Adventure'
  # mydict1['name']='Rocky'
  # obj2.append(mydict1)
  # mydict1={}
  # mydict1['category']='Adventure'
  # mydict1['name']='Tocket'
  # obj2.append(mydict1)
  # chal={}
  # chal["category"]="Romantic"
  # chal["tagline"]=""
  # chal["level"]=
  # chal["daretext"]=
  # chal["status"]=
  # chal["boostval"]=
  # chal["imgUrl"]=
  # coll = {}
  # coll['category']="Adventure"
  # coll['tagline']="What you see second in adventure"
  # coll['level']="1"
  # coll['daretext']="Some next level shit"
  # coll['status']="A"
  # coll['boostval']="40"
  # coll['imgUrl']=""
  # collection.insert(coll)


  return render_template('index.html',lst=obj)

# @app.route('/<name>')
# def profile(name):
# 	return render_template('index.html', name=name)

# def addDataToMongo():
#   #M0ng0
  
#   print "Entered"
#   client = MongoClient(app.config['MONGO_URI'])
#   db=client.get_default_database()
#   collection = db["tests"]
#   test={}
#   test["name"] = "pulk"
#   test["loc"] = "Hyd"
#   print "Obj ready"
#   print "Inserting-----------"
#   collection.insert(test)
#   print "Inserted-----------"



@app.route('/hello')
def hello():
    return render_template('hello.html')


# @app.route('/chalad', methods=['GET', 'POST'])
# def chalad():
#     form = ChalForm(request.form)
#     if request.method == 'POST' and form.validate():
#         pest = Pest(form.category.data, form.tagline.data,
#                     form.level.data, form.daretext.data, form.status.data, 
#                     form.boostval.data, form.imgUrl.data)
#         client = MongoClient(app.config['MONGO_URI'])
#         db=client.get_default_database()
#         collection = db["pests"]
#         collection.insert(pest)
#         print "Inserted-----------"
#         flash('Thanks for adding')
#         return redirect(url_for('login'))
#     return render_template('chalad.html', form=form)


@app.route('/musicbg')
def musigbg():
  values = [
        {'url': 'http://demo.twilio.com/docs/classic.mp3'}
    ]

  template = render_template('voice.xml', values=values)
  response = make_response(template)
  response.headers['Content-Type'] = 'application/xml'

  return response


@app.errorhandler(CSRFError)
def handle_csrf_error(e):
    return render_template('crsf.html', reason=e.description), 400


@app.route('/mchef')
def mchef():

    return render_template('mchef.html')


app.run(host=os.getenv('IP', '0.0.0.0'), port = int(os.getenv('PORT', 8080)))

if __name__ == '__main__':
	app.run(debug=False)
