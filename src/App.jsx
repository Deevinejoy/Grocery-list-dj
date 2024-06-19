import { useState, useEffect} from 'react'
import './app.css'
import Header from './header'
import Content from './content'
import Footer from './footer'
import AddItem from './AddItem'
import SearchItem from './searchItem'
import API_Requst from './apiRequest.jsx'


function App() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [newItem, setNewItem] = useState('');    
    const APIURL = 'http://localhost:3000/items'   
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      const fetchItems = async () => {
        try{
          const response = await fetch(APIURL)
          const listItems = await response.json()
          setItems(listItems);  
        } catch(err){
          console.log(err.message)

        }finally{
          setIsLoading(false)
        }
      }
      
      setTimeout(()=>{
        (async() => await fetchItems())()
      }, 2000
      )

    },[])
    
    const handleCheck = async (id)=>{
      const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item )
      const myItem = listItems.filter(item => item.id === id);
      console.log(myItem)
      const updateOptions ={
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({checked: myItem[0].checked})
      }
      const requrl = `${APIURL}/${id}`
      const result = await API_Requst (requrl, updateOptions)  
      localStorage.setItem('shoppinglist', JSON.stringify(listItems))
     
   }

    const handleDelete = async (id)=>{
      const filteredItem = items.filter((item)=> item.id !== id )
      setItems(filteredItem);
      const delOptions ={
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json'
        },
      }
      const requrl = `${APIURL}/${id}`
      const result = await API_Requst (requrl, delOptions)
    
      localStorage.setItem('shoppinglist', JSON.stringify(filteredItem))
   }

    
    const addItem = async (item)=>{
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      // or just items.length+1
      const myNewItem = {id, checked: false, item}
      const listItems = [...items, myNewItem]
      setItems(listItems)
      localStorage.setItem('shoppinglist', JSON.stringify(listItems))
      const postOptions = {
      method: 'POST',
      headers: {
      'content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
      }
      const result = await API_Requst(APIURL, postOptions)
      console.log(result)
  }

   const handleSubmit =(e)=>{
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem)
     setNewItem('')
   }

  
  return (
    <div className="App">
      <Header title='Grocery List'/>
      <div className='theList'>
      <nav>
      <SearchItem
        search={search}
        setSearch ={setSearch}
      />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      </nav>
      <section>
        {isLoading && <p style={{'fontSize': '30px'}}>Loading items, chill...</p>}
        {!isLoading &&
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}/>
      }
      </section>
      </div>
      <Footer length={items.length} />
     
      
    </div>

  )
}

export default App
