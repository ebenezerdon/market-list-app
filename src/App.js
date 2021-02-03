import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import './App.css'

const db = new Dexie('MarketList');
db.version(1).stores(
  { items: "++id,name,price" }
)

const App = () => {
  const items = useLiveQuery(() => db.items.toArray(), []);
  if (!items) return null

  const addItemToDb = async event => {
    event.preventDefault()
    const name = document.querySelector('.item-name').value
    const price = document.querySelector('.item-price').value
    db.items.add({ name, price })
  }

  const removeItemFromDb = async id => {
    await db.items.delete(id)
  }

  const itemData = items.map(item => (
    <div className="row" key={item.id}>
      <p className="col s5">
        <label>
          <input type="checkbox" />
          <span className="black-text">{item.name}</span>
        </label>
      </p>
      <p className="col s5">${item.price}</p>
      <i onClick={() => removeItemFromDb(item.id)} className="col s2 material-icons delete-button">
        delete
      </i>
    </div>
  ))

  return (
    <div className="container">
      <h3 className="green-text center-align">Market List App</h3>
      <form className="add-item-form" onSubmit={event => addItemToDb(event)} >
        <input type="text" className="item-name" placeholder="Name of item" />
        <input type="number" className="item-price" placeholder="Price in USD" />
        <button type="submit" className="waves-effect waves-light btn right">Add item</button>
      </form>
      {items.length > 0 &&
        <div className="card white darken-1">
          <div className="card-content">
            <form action="#">
              { itemData }
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
