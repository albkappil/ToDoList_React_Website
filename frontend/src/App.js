import { useEffect, useState } from "react";
import ToDo from "./components/ToDo"
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/handleApi";

function App() {

    const [toDo, setToDo] = useState([])
    const [text, setText] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState("")

    useEffect(() => {
        getAllToDo(setToDo)
    }, [])

    const updateMode = (_id, text) => {
        setIsUpdating(true)
        setText(text)
        setToDoId(_id)
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (isUpdating)
            updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
        else
            addToDo(text, setText, setToDo);

    };


    return (
        <div className="App" >

            <div className="container" >
                <h1 > ToDo List </h1>

                <form className="top" onSubmit={handleSubmit} >

                    <input type="text"
                        placeholder="Add ToDo Item.."
                        value={text}
                        onChange={
                            (e) => setText(e.target.value)}
                    />

                    <div className="add"
                        type="submit"
                        onClick={
                            isUpdating ?
                                () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) :
                                () => addToDo(text, setText, setToDo)
                        } > {isUpdating ? "Update" : "Add"}
                    </div>

                </form>
                <div className="list" > {
                    toDo.map((item) => < ToDo key={item.id}
                        text={item.text}
                        updateMode={
                            () => updateMode(item._id, item.text)}
                        deleteToDo={
                            () => deleteToDo(item._id, setToDo)}
                    />)}
                </div>
            </div>


        </div>
    );
}

export default App;