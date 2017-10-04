import React from 'react'
import reactStringReplace from 'react-string-replace'
import Logo from '../vora_logo_20170717.svg'
import katex from 'katex'
import MarkdownIt from 'markdown-it'
import { apiRequest } from './data'
const markdown = new MarkdownIt({
  html: true
})

export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const camelCaseToSpaceCase = (str) => {
  return str.replace( /([A-Z])/g, " $1" );
}
export const snakeCaseToSpaceCase = (str) => {
  return str.replace( /_/g, " " );
}

// converts a machine name
export const snakeCaseToPascalCase = (snakeCase) => {
  return snakeCase.split("_").map((word) => {return word.charAt(0).toUpperCase() + word.slice(1)}).join("")
}

// simple markdown currently used for instructions
export const simpleMarkdown = (string) => {
  string = reactStringReplace(string, /__([\s\S]+?)__(?!_)/g, (match) => {
    return <strong>{match}</strong>
  })
  string = reactStringReplace(string, "\n", (match) => {
    return <br />
  })
  string = reactStringReplace(string, /vora_logo/g, (match) => {
    return (
      <svg className="wikipedia-vora-logo">
        <use xlinkHref={Logo + "#logo-layer"}></use>
      </svg>
    )
  })
  return string
}

// take a markdown object with katex and convert it to a react element for display
export const markdownToHTML = (input) => {
  return <div dangerouslySetInnerHTML={{__html: markdown.render(katexToHTML(input))}}></div>
}

// takes in a string with katex wrapped in <t> tags, returns html in a string
export const katexToHTML = (string) => {
  string = reactStringReplace(string, /<t>(.*)<\/t>/g, (match, i) => {
    try {
      return katex.renderToString(match)
    }
    catch (e) {
      return match
    }
  })
  string = string.join("")
  return string
}

// get the definition of a word from api
export const define = (word, callback) => {

  const escapedWord = encodeURI(word.toLowerCase())

  apiRequest("/definitions", {
    method: 'post',
    body: JSON.stringify({
      definition: {
        word: escapedWord
      }
    })
  }, callback)
}

export const removePunctuation = (string) => {
  return string.replace(/[.,/#!$%^&*;:{}=_`~()]/g,"")
}
