import { useState } from "react"
const drinkData = [
  { 
    id: 1,
    name: 'coffee'
  },
  {
    id: 2,
    name: 'tea'
  },
  {
    id: 3,
    name: 'water'
  }
];

function App() {
  // const [drinks, setDrinks] = useState(['coffee', 'tea', 'water']);
  const [count, setCount] = useState(0);
  // const [quantity, setQuantity] = useState(drinks.length);
  
  // const reCount = () => {
  //   setQuantity(drinks.length);
  //   console.log(quantity);
    
  // }

  const initialDrinkState = drinkData.map(d => {
    return {
      ...d,
      isEditing: false
    }
  });

  const [drinks, setDrinks] = useState(initialDrinkState);  
  
  const len = drinks.length

  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    setCount(count - 1)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    const newId = Math.random();

    if (drinks.includes(value)) {
      alert('Drink already exist');
    } else {
      setDrinks([value, ...drinks]);
    }
    drinks.forEach(drink => {
      if (drink.name === value) {
        alert('Drink already exist');
      } else {
        const copyArray = [...drinks, {id: newId, name: value}];
        setDrinks(copyArray);
      }
    })

    e.target[0].value = '';
    // reCount();
  }

  const onDeleteHandler = (deleteDrink) => {  
    // console.log(drink);
    // const index = drinks.indexOf(drink);
    // if (index !== -1) {
    //   const newDrinks = [...drinks];
    //   newDrinks.splice(index, 1);
    //   setDrinks(newDrinks);
    //   reCount();
    // }
    const copyArray = [...drinks];
    // console.log(drink.id);
    
    const index = copyArray.findIndex(drink => drink.id === deleteDrink.id);
    if (index !== -1) {
      copyArray.splice(index, 1);
      setDrinks(copyArray);
    }
  }

  const onEditHandler = (drink) => {
    const updatedDrinks = [...drinks];
    updatedDrinks.forEach(updatedDrink => {
      if (updatedDrink.id === drink.id) {
        updatedDrink.isEditing = true;
      }
    })
    setDrinks(updatedDrinks);
  }

  const onCancelHandler = (drink) => {
    const updatedDrinks = [...drinks];
    updatedDrinks.forEach(updatedDrink => {
      if (updatedDrink.id === drink.id) {
        updatedDrink.isEditing = false;
      }
    })
    setDrinks(updatedDrinks);
  }

  const onSaveHandler = (evt, editDrink) => {
    
    evt.preventDefault();
    const newValue = evt.target[0].value;
    console.log(newValue);
    
    const copyArray = [...drinks];
    const newDrink = copyArray.find(drink => drink.id === editDrink.id);
    newDrink.name = newValue;
    newDrink.isEditing = false;
    setDrinks(copyArray);
    console.log(copyArray);
    
  }

  const drinkList = drinks.map(drink => (
    // <li key={drink.id} style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
    //   {drink.isEditing ? (
    //     <input type="text" defaultValue={drink.name}/>
    //   ) : (
    //     <span>{drink.name}</span>
    //   )}
    //   <div>
    //     {drink.isEditing ? (
    //       <>
    //         <button>Save</button>
    //         <button onClick={() => onCancelHandler(drink)}> Cancel</button>
    //       </>
    //     ) : (
    //       <>
    //         <button onClick={() => onEditHandler(drink)}>Edit</button>
    //         <button onClick={() => onDeleteHandler(drink)}>Delete</button>
    //       </>
    //     )}
    //   </div>
    // </li>

    <li key={drink.id} >
      {drink.isEditing ? (
        <form style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }} onSubmit={(evt) => onSaveHandler(evt, drink)}>
          <input type="text" defaultValue={drink.name}/>
          <div>
            <button>Save</button>
            <button onClick={() => onCancelHandler(drink)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div key={drink.id} style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
          <span>{drink.name}</span>
          <div>
            <button onClick={() => onEditHandler(drink)}>Edit</button>
            <button onClick={() => onDeleteHandler(drink)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  ))


  return (
  <>
    <div>
      <button onClick={decrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </div>

    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" />
        <button>+</button>
      </form>
      <p>There are drinks {len} in the list</p>
      <ul>
        {/* {drinks.map(drink => (
          <li key={drink.id} style={{display: "flex", justifyContent: "space-between", width: '200px'}}>
            <span>{drink.name}</span>
            <button onClick={() => onDeleteHandler(drink)}>Delete</button>
          </li>
          
        ))} */}

        {drinkList}
      </ul>
    </div>
  </>
  )
}

export default App
