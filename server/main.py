from urllib.parse import unquote
from json import loads, dumps
from datetime import datetime
from threading import Thread
from requests import get
from time import sleep
import socket		

def get_timestamp(thread):
	return thread["timestamp"]

def get_thumbnail(board, response, index):

	try:
		moar = get(response[index]["link"])
		if moar.ok:
			files = loads(moar.text)["threads"][0]["posts"][0]["files"]
			if files == []:
				response[index]["thumb"] = "https://static10.tgstat.ru/channels/_0/d0/d0e54b093c2ecf796f371159167b4e96.jpg"
				response[index]["link"] = response[index]["link"][:-4] + "html"
			else:
				response[index]["thumb"] = "https://2ch.hk" + files[0]["thumbnail"]
				response[index]["link"] = response[index]["link"][:-4] + "html"
		else:
			response[index]["thumb"] = "https://2ch.hk/images/404_1.jpg"
			response[index]["name"] = "404"
	except Exception as error:
		print("[THREAD:%i] Error:%s %s" % (index, str(error), str(response[index])))

def find_thread(board, find):

	try:
		res = get("https://2ch.hk/%s/threads.json" % (board))
		if res.ok:
			response = []
			threading = []
			threads = sorted(loads(res.text)["threads"], key = get_timestamp, reverse=True) # sorted by timestamp
			index = 0
			for thread in threads:
				if find in thread["comment"]:
					date = datetime.fromtimestamp(thread["timestamp"])
					date = date.strftime("%Y/%m/%d %H:%M:%S")
					response.append({"name":thread["comment"], "count":thread["posts_count"],"link":"https://2ch.hk/b/res/"+thread["num"]+".json", "time":date})
					new_thread = Thread(target=get_thumbnail, args=(board, response, index))
					threading.append(new_thread)
					new_thread.start()
					index = index+1
				else:
					pass
			for th in threading:
				th.join()
			return response
		else:
			print("[!] Request status code:%i" % (res.status_code))
			return 0
	except Exception as error:
		response.append({"name": "error", "error": error})

def get_threads(board):
	try:
		res = get("https://2ch.hk/%s/threads.json" % (board))
		if res.ok:
			response = []
			threading = []
			threads = sorted(loads(res.text)["threads"], key = get_timestamp, reverse=True) # sorted by timestamp
			index = 0
			for thread in threads:
				date = datetime.fromtimestamp(thread["timestamp"])
				date = date.strftime("%Y/%m/%d %H:%M:%S")
				response.append({"name":thread["comment"], "count":thread["posts_count"],"link":"https://2ch.hk/b/res/"+thread["num"]+".json", "time":date})
				new_thread = Thread(target=get_thumbnail, args=(board, response, index))
				threading.append(new_thread)
				new_thread.start()
				index = index+1
			for th in threading:
				th.join()
			return response
		else:
			print("[!] Request status code:%i" % (res.status_code))
			return 0
	except Exception as error:
		response.append({"name": "error", "error": error})

def start(self):
	try:
		sock = socket.socket()
		sock.bind( ("0.0.0.0", port) )
		sock.listen(3)
		while 1:
			client, addr = self.sock.accept()
			data = client.recv(1024).decode().split("\n")[0].split(" ")[1].split("/")[1]
			if data == "b":
				client.send(b"HTTP/1.1 200 OK\n\nContent-Type: application/json; charset=utf-8\n\n" + dumps(get_threads("b")).encode())
				client.close()
	except Exception as error:
		client.close()
		print("[HTTP][start] Error:%s" % (str(error)))

start(8080)