import React from 'react'
import reactStringReplace from 'react-string-replace'
import Logo from '../vora_logo_20170717.svg'
import katex from 'katex'

export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const camelCaseToSpaceCase = (str) => {
  return str.replace( /([A-Z])/g, " $1" );
}
export const snakeCaseToSpaceCase = (str) => {
  return str.replace( /_/g, " " );
}

// converts rails api errors object to array strings
export const parseApiErrors = (errorsObj) => {
  let errors = []
  if (errorsObj) {
    // iterate over attributes
    Object.keys(errorsObj).forEach((field, index) => {
      // make sure it's an array
      if (typeof errorsObj[field] === "object" && errorsObj[field].length > 0) {
        errorsObj[field].forEach((error, index) => {
          errors.push(`${field} ${error}`)
        })
      }
    })
  }
  return errors
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

export const katexToMarkdown = (string) => {
  string = reactStringReplace(string, /<katex>(.+)<\/katex>/g, (match, i) => {
    return katex.renderToString(match)
  })
  return string.toString()
}

// get the definition of a word from api
export const define = (word) => {

  const escapedWord = encodeURI(word.toLowerCase())

  console.log(escapedWord)

  return fetch(`${process.env.REACT_APP_API_URL}/definitions`, {
    method: 'post',
    body: JSON.stringify({
      definition: {
        word: escapedWord
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    return res.json()
  })
}

export const removePunctuation = (string) => {
  return string.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g,"")
}
