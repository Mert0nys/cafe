// src/Menu.js 
import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 

export const Menu = () => { 
    const [menuItems, setMenuItems] = useState([]); 
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    const fetchMenuItems = async () => { 
        try { 
            const response = await axios.get('http://127.0.0.1:8000/menu/products/'); 
            setMenuItems(response.data); 
        } catch (error) { 
            console.error('Error fetching menu items:', error); 
        } 
    }; 

    const addCategory = async (e) => {
        e.preventDefault(); // предотвращает перезагрузку страницы
        try {
            const response = await axios.post('http://127.0.0.1:8000/menu/categories/', newCategory);
            setMenuItems([...menuItems, response.data]); // обновляем состояние меню
            setNewCategory({ name: '', description: '' }); // сбрасываем форму
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    useEffect(() => { 
        fetchMenuItems(); 
    }, []); 

    return ( 
        <div> 
            <h1>Menu</h1> 
            <ul> 
                {menuItems.map(item => ( 
                    <li key={item.id}> 
                        <strong>{item.name}</strong>: {item.description} - ${item.price} 
                    </li> 
                ))} 
            </ul> 
            <button onClick={fetchMenuItems}>Reload Menu</button> 

            <h2>Add New Category</h2>
            <form onSubmit={addCategory}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    required
                />
                <button type="submit">Add Category</button>
            </form>
        </div> 
    ); 
}; 

export default Menu;
