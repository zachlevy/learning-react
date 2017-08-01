import React from 'react'
import reactStringReplace from 'react-string-replace'

// converts a machine name
export const snakeCaseToPascalCase = (snakeCase) => {
  return snakeCase.split("_").map((word) => {return word.charAt(0).toUpperCase() + word.slice(1)}).join("")
}

export const simpleMarkdown = (string) => {
  return reactStringReplace(string, /\_\_([\s\S]+?)\_\_(?!_)/g, (match) => {
    return <strong>{match}</strong>
  })
}
