import time
from flask import Flask, request
from chemicals_finder import find_chemicals

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/chemicals', methods=['GET'])
def investigate_input():
    return find_chemicals(request.args.get('input'))
