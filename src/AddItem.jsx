import React from 'react'
import { useRef } from 'react'


import { FaPlus } from 'react-icons/fa'


const AddItem = ({setNewItem, newItem, handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className='addForm top' onSubmit={handleSubmit}>
       <label 
             htmlFor='addItem'
             id='none'>
             Add Item</label>
        <input
              autoFocus
              ref={inputRef}
              id='addItem'
              type='text'
              placeholder='Add Item'
              required
              value={newItem}
              onChange={(e)=>setNewItem(e.target.value) }
              />          
        < FaPlus
            className='myButton'
            type='submit'
            aria-label='Add Item' 
            onClick={()=> inputRef.current.focus()}
      />

    </form>
  )
}

export default AddItem
