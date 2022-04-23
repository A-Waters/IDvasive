from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
from datetime import datetime
from nnwrap import wrapper


def load_binary(filename):
    with open(filename, 'rb') as file_handle:
        return file_handle.read()

workfile = 'file.png'
class Handler(BaseHTTPRequestHandler):
    

    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        # self._set_response()
        self.send_response(200)
        self.send_header('Content-type', 'image/png')
        self.end_headers()
        self.wfile.write(load_binary(workfile))

    def do_POST(self):
        self._set_response()
        self.send_response(200)
        self.end_headers()

        working = True
        print(self.headers)


        if "Content-Length" in self.headers:
            content_length = int(self.headers["Content-Length"])
            body = self.rfile.read(content_length)
            with open(workfile, "wb") as out_file:
                out_file.write(body)
            
        else:
            working = False
            self.wfile.write("Data Failed to save".encode('utf-8'))

        if working:
            nn = wrapper()
            print(nn.classify(workfile))
            self.wfile.write(nn.classify(workfile).encode('utf-8')) 

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """ This class allows to handle requests in separated threads.
        No further content needed, don't touch this. """

if __name__ == '__main__':
    server = ThreadedHTTPServer(("0.0.0.0", 4444), Handler)
    # print ('Starting server on port 4444...')
    server.serve_forever()
