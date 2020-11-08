import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";


function Menus() {
    // Setting our component's initial state
    const [items, setItems] = useState([])
    const [menuObj, setMenuObj] = useState({})
  
    // Load all books and store them with setBooks
    useEffect(() => {
      loadItems()
    }, [])
  
    // Loads all books and sets them to books
    function loadItems() {
      API.getMenus()
        .then(res => 
          setItems(res.data)
        )
        .catch(err => console.log(err));
    };
  
    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteItem(id) {
      API.deleteMenu(id)
        .then(res => loadItems())
        .catch(err => console.log(err));
    }
  
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
      const { name, value } = event.target;
      setMenuObj({...menuObj, [name]: value})
    };
  
    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
      event.preventDefault();
      if (menuObj.info && menuObj.price && menuObj.ingredients && menuObj.item ) {
        API.saveMenu({
          item: menuObj.item,
          price: menuObj.price,
          ingredients: menuObj.ingredients,
          info: menuObj.info,
  
        })
          .then(res => loadItems())
          .catch(err => console.log(err));
      }
    };
  
      return (
        
          <>
            <h1>Add Menu Item</h1>
            
              <form>
                <input
                  onChange={handleInputChange}
                  name="item"
                  placeholder="Menu item (required)"
                />
                <input
                  onChange={handleInputChange}
                  name="price"
                  placeholder="Price (required)"
                />
                <textarea
                  onChange={handleInputChange}
                  name="ingredients"
                  placeholder="ingredients"
                />
                <textarea
                  onChange={handleInputChange}
                  name="info"
                  placeholder="info"
                />
                
                <button
                
                  disabled={!(menuObj.info && menuObj.price && menuObj.ingredients && menuObj.item)}
                  onClick={handleFormSubmit}
                >
                  Add new Item
                </button>
              </form>
          
            
                <h1>New Menu Items</h1>
            
              {items.length ? (
                <ul>
                  {items.map(item => (
                    <li key={item._id}>
                      <Link to={"/menus/" + item._id}>
                        <strong>
                          {item.item} $ {item.price}
                        </strong>
                      </Link>
                      <button  onClick={() => deleteItem(item._id)} >Delete</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <h3>No Results to Display</h3>
              )}
              </>
            
      );
    }
  
  
  export default Menus;
  