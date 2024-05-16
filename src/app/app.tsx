import {observer} from "mobx-react";
import {Card} from "../components";
import {useState} from "react";

export const App = observer(() => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="App">
            <Card expandable={true} expanded={true}>
                <Card expandable={true} expanded={expanded}>
                    <Card expandable={false}/>
                </Card>
                <Card expandable={false}/>
            </Card>
            <button onClick={() => setExpanded(!expanded)}>Toggle Expanded</button>
        </div>
    );
});
