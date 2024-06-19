import React from 'react';
import Itemlist from './itemlist';



const Content = ({ items, handleCheck, handleDelete}) => {
  return (
      <main>
         {(items.length) ? 
          <Itemlist 
          items ={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />
         : <p> Your list is empty</p>
        }
      </main>
  );
}

export default Content