import React from 'react'
import { Field } from 'redux-form'
import { parseApiErrors, snakeCaseToSpaceCase, capitalizeWords, camelCaseToSpaceCase } from './strings'
import Uploader from '../Containers/Admin/Uploader'

export const buildFormErrors = (apiErrors) => {
  const errors = parseApiErrors(apiErrors)
  if (!(errors.length > 0)) {
    return
  }
  const errorsList = (
    <ul className="errors-list">
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
// manualReduxFormChange passed in because it has to be connected to dispatch properly I think
// options is an object with the following optional fields
// blacklistKeys - an array of strings. nested keys have a period between them. example: "ui.icon"
// textareaKeys - an array of strings for using textareas instead of input fields
export const buildFormFields = (formJson, options, manualReduxFormChange) => {
  return (
    <div key={"fields-wrapper"}>
      {
        Object.keys(formJson).filter((key) => {return !options.blacklistKeys || !options.blacklistKeys.includes(key)}).map((key, index) => {
          const label = capitalizeWords(snakeCaseToSpaceCase(camelCaseToSpaceCase(key.replace(".", " "))))
          if (typeof formJson[key] === "string" && key.indexOf("image_url") !== -1) {
            // image uploading, images are always stored as image_url
            return (
              <div key={index}>
                <label>{label}</label>
                <br />
                <Uploader id="challenge-image-url-uploader" className="form-control" onChange={(url) => {manualReduxFormChange(key, url)}} type="hidden" />
                <br />
              </div>
            )
          } else if (typeof formJson[key] === "string" && options.textareaKeys && options.textareaKeys.includes(key)) {
            return (
              <div key={index}>
                <label>{label}</label>
                <Field className="form-control" name={key} component="textarea" type="text" />
              </div>
            )
          } else if (typeof formJson[key] === "string") {
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
                <Field className="form-control" name={key} component="input" type="number" normalize={(value) => Number(value)} />
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
            return buildFormFields(nestedFormJson, options, manualReduxFormChange)
          }
        })
      }
    </div>
  )
}
