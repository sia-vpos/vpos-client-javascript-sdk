const openTag = "<";
const closeTag = ">";
const closeSlash = "/";

function tagOpener(tagName){
    return openTag + tagName.toString() + closeTag;
    }

function tagCloser(tagName) {
    return openTag + closeSlash + tagName.toString() + closeTag;
}

function populateSingleXMLElement(tagName, value){
    return tagOpener(tagName) + value + tagCloser(tagName);
}

module.exports = {
    tagOpener : tagOpener,
    tagCloser : tagCloser,
    populateSingleXMLElement : populateSingleXMLElement

}


