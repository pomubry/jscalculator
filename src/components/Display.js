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

  return (
    <div className="calc">
      <div className="displayStyle">
        {/* Expression will truncate from the left when the string is at least 22 characters long */}
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
