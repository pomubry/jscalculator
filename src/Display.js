import React from 'react';
import buttons from './buttons';

function Display({ stateCopy, handleClick }) {
  const { total, input } = stateCopy;
  const btn = buttons.map((obj) => {
    return (
      <button key={obj.id} id={obj.id} onClick={handleClick} value={obj.value}>
        {obj.text}
      </button>
    );
  });

  const displayStyle = {
    width: 'auto',
    height: '42px',
    padding: '10px',
    backgroundColor: '#D4E4E3',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
  };
  return (
    <div className="calc">
      <div style={displayStyle}>
        <div className="total" style={{ height: '100%' }}>
          {total.length > 22 ? `...${total.slice(total.length - 22)}` : total}
        </div>
        <div id="display">
          {input.length > 22 ? `...${input.slice(input.length - 22)}` : input}
        </div>
      </div>
      <div className="buttons">{btn}</div>
    </div>
  );
}

export default Display;
