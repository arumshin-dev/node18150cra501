import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function Hello(){
    useEffect(() => {
        console.log("hi:)");
        return () => {console.log("bye:(");}
        },[]);
    return <h1>Hello</h1>;
}
function App() {
    const [showing, setShowing] = useState(false);
    const onShowing = () => setShowing((prev) => !prev);
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);
    console.log("i run all the time");
    const iRunOnlyOnce = () => {
        console.log("i run only once");
    }
    useEffect(iRunOnlyOnce, []);
    useEffect(() => {
        console.log("I run when 'keyword' changes, Search for", keyword);
    }, [keyword]);
    useEffect(() => {
        console.log("I run when 'counter' changes.", counter);
    }, [counter]);
    useEffect(() => {
        console.log("I run when keyword & counter changes.");
    }, [keyword,counter]);
  return (
    <div>
        <h1 className={styles.title}>초기 세팅</h1>
        <Button text={"Continue"}/>
        <hr/>
        <input value={keyword} onChange={onChange} type="text" placeholder="Search here..."/>
        <h2>{counter}</h2>
        <button onClick={onClick}>Click me</button>
        <hr/>
        {showing ? <Hello /> : null}
        <button onClick={onShowing}>{showing ? "Hide" : "Show"}</button>

    </div>
  );
}

export default App;
