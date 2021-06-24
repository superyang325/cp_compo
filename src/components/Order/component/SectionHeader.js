import React from 'react';

export default function SectionHeader (props) {
  return <div className="mp-section-header" style={{
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '12px 0',
    color: 'rgb(0, 21, 41)',
    fontWeight: 'bold',
    fontSize: '14px',
    borderBottom: '1px solid #e8e8e8'}}>{props.children}</div>;
}
