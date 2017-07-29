// this file modifies wikipedia when adding it to the head tag
// jquery not available in this file

// get params from url after ?
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

// goes through wikipedia mobile and collapses all headings
var collapseHeadings = function() {
  var collapsibleHeadings = document.getElementsByClassName("collapsible-heading")
  for (var i = 0; i < collapsibleHeadings.length; i++) {
    collapsibleHeadings[i].className = collapsibleHeadings[i].className.replace("open-block", "")
    collapsibleHeadings[i].nextSibling.className = collapsibleHeadings[i].nextSibling.className.replace("open-block", "")
  }
}

// expecting a wikipedia url with a key called highlights. highlights a url encoded and JSON stringified array with objects having keys of the section title and an array of children to highlight
// [
//   {
//     "title": "Death",
//     "children": [0, 2]
//   }
// ]
var highlightWikipedia = function(highlightSection) {

  var sectionTitleText = highlightSection.title
  var sectionTitleId = sectionTitleText.replace(/ /g, "_")

  // get the sections by id
  var sectionTitle = document.getElementById(sectionTitleId).parentElement
  var sectionBody = sectionTitle.nextSibling

  // collapse headings
  // wait until after wikipedia headings js runs
  setTimeout(collapseHeadings, 500)

  // wait until collapseHeadings headings js runs
  setTimeout(function() {
    // open the blocks
    sectionTitle.className += " open-block"
    sectionBody.className += " open-block"
    // scroll
    document.getElementById(sectionTitleId).scrollIntoView()
  }, 1000)


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
