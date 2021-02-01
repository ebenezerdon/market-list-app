import Dexie from 'dexie'
import './App.css'

const db = new Dexie("FriendDatabase");
db.version(1).stores({ friends: "++id,name,age" });

db.transaction('rw', db.friends, async() => {
  // Make sure we have something in DB:
  if ((await db.friends.where({name: 'Josephine'}).count()) === 0) {
  const id = await db.friends.add({name: "Josephine", age: 21});
  // alert (`Addded friend with id ${id}`);
  }

  // Query:
  const youngFriends = await db.friends.where("age").below(25).toArray();

  // Show result:
  // alert ("My young friends: " + JSON.stringify(youngFriends));

}).catch(error => alert(error.stack || error))

const App = () => {
  return (
    <div className="container">
      <h3 className="green-text center-align">Market List App</h3>
      <div className="card white darken-1">
        <div className="card-content">
          <form action="#">
            <div className="row">
              <p className="col s5">
                <label>
                  <input type="checkbox" />
                  <span className="black-text">Tomato</span>
                </label>
              </p>
              <p className="col s5">$5</p>
              <i className="col s2 material-icons delete-button">delete</i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
