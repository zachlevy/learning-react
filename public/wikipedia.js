// this file modifies wikipedia when adding it to the head tag
// jquery not available in this file

console.log("window.location.href", window.location.href)

// console.log("params", window.location.href.split("?"))


var urlParams = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));



console.log("getUrlParams", JSON.parse(urlParams.highlights))

// expecting a wikipedia url with a key called highlights. highlights a url encoded and JSON stringified array with objects having keys of the section title and an array of children to highlight
// [
//   {
//     "title": "Death",
//     "children": [0, 2]
//   }
// ]
var highlightWikipedia = function(highlightSection) {
  var sectionTitleText = highlightSection.title
  var sectionTitleId = sectionTitleText.replace(" ", "_")

  // console.log("sectionTitleText", sectionTitleText)
  // console.log("sectionTitleId", sectionTitleId)

  // get the sections by id
  var sectionTitle = document.getElementById(sectionTitleId).parentElement
  var sectionBody = sectionTitle.nextSibling

  // console.log("sectionTitle", sectionTitle)
  // console.log("sectionBody", sectionBody)

  // open the blocks
  sectionTitle.className += " open-block"
  sectionBody.className += " open-block"

  // scroll to the section
  document.getElementById(sectionTitleId).scrollIntoView()

  // console.log("sectionBody.children", sectionBody.children)

  var sectionChildren = []
  for (var i = 0; i < sectionBody.children.length; i++) {
    if (highlightSection.children === "all" || highlightSection.children.includes(i)) {
      sectionBody.children[i].className += " vora-logo"
    }
  }
}

// run highlights
JSON.parse(urlParams.highlights).forEach(function(sectionHighlight) {
  highlightWikipedia(sectionHighlight)
})
