import React, { useEffect, useState } from "react";
import { UseItem } from "../hooks"
export default function Items() {
   
    const {
        items,
        totalPage,
        activePage,
        nameSearch,
        handleGetItem,
        handleAddItem,
        handleDeleteItem,
        handleUpdateItem,
        handlePaginateItem,
        handleSearchItem
      
    } = UseItem();
    console.log(activePage , 'aaaaaaaaaaaaaa')
    useEffect(() => {
        handlePaginateItem({activePage: 1})
    }, []);
    let paginate = []
    for(let i = 1 ; i <= totalPage ; i++) {
        let button = (
            <button key={i} onClick={() => {nameSearch ? handleSearchItem({
                activePage : i , textSearch : textSearch
            }) : handlePaginateItem({activePage : i})}} style={{ backgroundColor : activePage === i ? 'blue' : 'white' }}>{i}</button>
        )
        paginate.push(button)
    }
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [idUpdate , setIdUpdate] = useState('')
    const [nameUpdate, setNameUpdate] = useState('')
    const [textSearch , setTextSearch] = useState('')
    
    
    return (
        
        <div>
          
            <div>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <button onClick={() => handleAddItem({ name: name })}>ADD</button>
                <input
                    onChange={(e) => setNameUpdate(e.target.value)}
                    value={nameUpdate}
                />
                
                <button onClick={() => handleUpdateItem({ name: nameUpdate , id : idUpdate })}>UPDATE</button>
                <input
                    onChange={(e) => setTextSearch(e.target.value)}
                    value={textSearch}
                />
                
                <button onClick={() => handleSearchItem({ textSearch: textSearch , activePage : 1 })}>SEARCH</button>
            </div>
           <table className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
                <tr>
                    <th>STT</th>
                    <th>Ten</th>
                    <th>Hanh dong</th>
                </tr>
                </thead>
                
                <tbody>
                {
                        items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button onClick={() => {
                                            setIdUpdate(item._id)
                                            setNameUpdate(item.name)
                                    }}>EDIT</button>
                                        <button onClick={() => handleDeleteItem({id : item._id})}>DELETE</button>
                                    </td>
                                </tr>
                            )
                        })
                        
                    }
                      
                </tbody>
                
           </table>
          <div>
         {paginate}
          </div>
        </div>
    )
}

