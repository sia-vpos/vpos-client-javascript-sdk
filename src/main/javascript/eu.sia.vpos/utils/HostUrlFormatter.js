formatUrl = (myUrl) => {

    let urlArr = myUrl.substring(8).split('/');
    let host = urlArr.shift();
    let path = '/' + urlArr.join('/');

    return {host, path};
}


module.exports = formatUrl;

