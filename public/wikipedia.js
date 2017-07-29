// this file modifies wikipedia when adding it to the head tag
// jquery not available in this file

var sectionTitleText = "Early life"
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

var sectionParagraphs = []
for (var i = 0; i < sectionBody.children.length; i++) {
  // make sure it's a paragraph
  if (sectionBody.children[i].tagName === "P") {
    sectionParagraphs.push(sectionBody.children[i])
  }
}

// console.log("sectionParagraphs", sectionParagraphs)

sectionParagraphs.forEach(function(p, index) {
  if (index === 0) {
    p.className += " vora-logo"
  }
})
