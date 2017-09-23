import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import { stateToMarkdown } from 'draft-js-export-markdown'
import { stateToHTML } from 'draft-js-export-html'
// import {stateFromMarkdown} from 'draft-js-import-markdown';
import createMathjaxPlugin from 'draft-js-mathjax-plugin'
import {convertFromRaw, convertToRaw} from 'draft-js'

import {
  INLINE_STYLES,
  InlineStyleControls,
  BlockStyleControls,
  BLOCK_TYPES,
  StyleButton,
  styleMap,
  getBlockStyle
} from './StyleButton'

const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */)
const plugins = [
  mathjaxPlugin,
]


class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    // let contentState = stateFromMarkdown(markdown)

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onTab = this._onTab.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleSubmitText() {
    console.log("handleSubmitText")

    let options = {
      entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase();
        if (entityType === 'INLINETEX') {
          const data = entity.getData();
          return {
            element: 'span',
            content: data,
            style: {
              // Put styles here...
            },
          };
        }
      },
    };

    let markdown = stateToMarkdown(this.state.editorState.getCurrentContent())
    let html = stateToHTML(this.state.editorState.getCurrentContent())
    let raw = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) // stores tex
    console.log(this.state.editorState.getCurrentContent())
    console.log(markdown)
    console.log(html)
    console.log(raw)
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={"text-left " + className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder=""
            ref="editor"
            spellCheck={true}
            plugins={plugins}
          />
        </div>
        <button className="btn btn-outline-secondary" onClick={this.handleSubmitText.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default RichEditorExample
