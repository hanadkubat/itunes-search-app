import React, { useEffect, useState } from 'react';

const initialListItems = ['A', 'B', 'C', 'D', 'E'].map((value) => ({
  isFromSearch: false,
  value,
}));

function List(props) {
  const [listItems, setListItems] = useState(initialListItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setListItems(reorderArray([...listItems]));
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setListItems((listItems) => [
      ...listItems.filter((val) => !val.isFromSearch),
      ...props.albums.map((album) => ({ isFromSearch: true, value: album })),
    ]);
  }, [props.albums]);

  function reorderArray(arr) {
    const a = arr.splice(0, 1);
    arr.push(a[0]);
    return arr;
  }

  return (
    <ul className="list-group">
      {listItems.slice(0, 5).map((contentStr, index) => (
        <li className="list-group-item" key={index}>
          {contentStr.value}
        </li>
      ))}
    </ul>
  );
}

export default List;
