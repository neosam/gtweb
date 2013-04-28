var http = require('http'),
	fs = require('fs');

function respondToFile(path, response) {
    fs.exists(path, function (exists) {
        
        if (exists) {
            var fileStream = fs.createReadStream(path),
                mimeType = 'text';
            if (path.match(/.*\.html$/) !== null) {
                mimeType = 'text/html';
            } else if (path.match(/.*\.js$/) !== null) {
                mimeType = 'application/javascript';
            } else if (path.match(/.*\.css$/) !== null) {
                mimeType = 'text/css';
            }
            response.writeHead(200, {
                'Content-Type': mimeType
            });
            fileStream.pipe(response); 
        } else {
            response.writeHead(404);
            response.write('Could not find file ' + path);
            response.end();
        }
    });
}

server = http.createServer(function(request, response)  {
	var urlPath = request.url,
        filePath = 'web' + urlPath;
    respondToFile(filePath, response);
});
server.listen(8080);
