import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './PageSection.less';

const pageSectionHeader = {
  color: 'rgb(0, 21, 41)',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid #e8e8e8',
}
const pageSectionBody = {
  padding: '10px 0 10px 10px'
}
export default class PageSection extends Component {
  render() {
    const { name = '',style={}} = this.props;
    return (
      <div className= "page-section-component" style={style}>
        <div className="page-section-header" style={pageSectionHeader}>{name}</div>
        <div className="page-section-body" style={pageSectionBody}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
PageSection.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  headStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
}
