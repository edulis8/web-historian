var pathParts = asset.split('.');
var pathEnding = pathParts[pathParts.length - 1];

if (asset === '/') {
  asset = archive.paths.siteAssets + '/index.html';

} else if (pathEnding === 'css' || pathEnding === 'js') {
  asset = archive.paths.siteAssets + asset;

} else if (archive.isUrlArchived(asset)) {
  asset = archive.paths.archivedSites + asset;

} else {
  res.writeHead(404);
  res.end();
}

pathParts = asset.split('.');
contentType = pathParts[pathParts.length -1];

fs.readFile(asset, function (error, content) {
  if (error) {
    res.writeHead(500);
    console.log('error in serveAssets', error);
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/' + contentType });
    res.end(content, 'utf-8');
  }
});

