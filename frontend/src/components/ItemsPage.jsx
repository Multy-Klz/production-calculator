import React, { useState, useEffect } from 'react';
import ItemsTable from './ItemsTable';
import Message from './Message';
import CreateItem from './CreateItem';
import Search from './Search';

function ItemsPage() {
    const [items, setItems] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [SearchedItem, setSearchedItem] = useState('');
    const [Result, setResult] = useState(false);

    function changeModal() { 
        setIsOpen(!isOpen);
    }

    function getItemList() {
        fetch(`http://localhost:3000/api/showItems`) 
            .then(response => response.json())
            .then(data => {
                setItems(data);
            });
    }


    useEffect(() => {
        
        SearchedItem == '' ? getItemList() : ''

    }, [items]);

    return (
        <>
            <div className='flex flex-rol m-5 gap-2'>
                <button className='text-blue-800 m-1' onClick={() => changeModal()}>Create</button>
                <Search setSearchedTerm={setSearchedItem} setList={setItems} label={ "item"} />
            </div>
            {items ? <ItemsTable props={!SearchedItem ? items : SearchedItem} /> : 'Loading...'}
            {isOpen ? <CreateItem isOpen={isOpen} setModal={changeModal} setState={ setResult } /> : ''}
            {Result ? <Message style={'bg-green-500'} message={`Item sucefully created!`} setState={setResult} /> : ""}
        </>
    )
}

export default ItemsPage;