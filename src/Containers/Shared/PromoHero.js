import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gradientBackground } from '../../modules/styles'
import { markdownToHTML } from '../../modules/strings'

const PromoHero = props => (
  <div className={"container-fluid bg-gradient bg-subtle bg-subtle-" + (props.subtlePattern || "diamond")} style={gradientBackground("#e52d27", "#b31217")}>
    <div className="row">
      <div className="col-12 text-center">
        <br />
        <br />
        {markdownToHTML(props.messaging)}
        <br />
        <Link className="btn btn-outline-secondary btn-lg" to={props.callToActionUrl}>{props.callToActionText}</Link>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
)

PromoHero.propTypes = {
  messaging: PropTypes.string,
  subtlePattern: PropTypes.string,
  callToActionText: PropTypes.string,
  callToActionUrl: PropTypes.string
}

export default PromoHero
