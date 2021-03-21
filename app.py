from flask import Flask
# resource: https://www.youtube.com/watch?v=Z1RJmh_OqeA

app = Flask(__name__) #referencing this file

@app.route('/') #pass in url here; index route so no 404
# define function for that route
def index():
    return "Hello,WIRE powderless!"

if __name__ == "__main__":
    app.run(debug=True) # error would display on webpage
#type <localhost:5000> in browser