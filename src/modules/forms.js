import React from 'react'
import { Field } from 'redux-form'
import { capitalizeWords, camelCaseToSpaceCase } from './strings'
import { parseApiErrors } from './strings'

export const buildFormErrors = (apiErrors) => {
  const errors = parseApiErrors(apiErrors)
  if (!(errors.length > 0)) {
    return
  }
  const errorsList = (
    <ul>
      {
        errors.map((error, index) => {
          return <li key={index}>{error}</li>
        })
      }
    </ul>
  )
  return errorsList
}

// takes in a json based on a template of a same course
// blacklistKeys is an array of strings. nested keys have a period between them. example: "ui.icon"
export const buildFormFields = (formJson, blacklistKeys) => {
  return (
    <div key={"fields-wrapper"}>
      {
        Object.keys(formJson).filter((key) => {return !blacklistKeys.includes(key)}).map((key, index) => {
          const label = capitalizeWords(camelCaseToSpaceCase(key.replace(".", " ")))
          if (typeof formJson[key] === "string") {
            return (
              <div key={index}>
                <label>{label}</label>
                <Field className="form-control" name={key} component="input" type="text" />
              </div>
            )
          } else if (typeof formJson[key] === "number") {
            return (
              <div key={index}>
                <label>{label}</label>
                <Field className="form-control" name={key} component="input" type="number" />
              </div>
            )
          } else if (typeof formJson[key] === "object" && formJson[key].length >= 0 && typeof formJson[key][0] === "string") {
            return (
              <div key={index}>
                <label>{label}</label>
                <Field normalize={(value) => {return value && value.split(",")}} className="form-control" name={key} component="input" type="text" />
              </div>
            )
          } else if (typeof formJson[key] === "object" && formJson[key].length === undefined) {
            // recursive refactor
            let nestedFormJson = {}
            Object.keys(formJson[key]).forEach((shortKey) => {
              nestedFormJson[`${key}.${shortKey}`] = formJson[key][shortKey]
            })
            return buildFormFields(nestedFormJson, blacklistKeys)
          }
        })
      }
    </div>
  )
}


// Object.keys(formJson[key]).filter((subKey) => {return !blacklistKeys.includes(`${key}.${subKey}`)}).map((subKey) => {
//   if (typeof formJson[key][subKey] === "string") {
//     return (
//       <div>
//         <label>{key} {subKey}</label>
//         <Field className="form-control" name={`${key}.${subKey}`} component="input" type="text" />
//       </div>
//     )
//   }
