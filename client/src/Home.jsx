import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import HabitHome from './Habit/HabitHome.jsx';
import ToDoHabitHome from './ToDo/ToDoHome.jsx';
import NavBar from './Components/NavBar.jsx';
import Footer from './Components/Footer.jsx';

function Home (){
    return(
        <div className="h-screen w-screen bg-blue-300 text-white flex flex-col">
            <NavBar />
            <PanelGroup autoSaveId="habit" direction="vertical">
                <Panel defaultSize={60}>
                    <HabitHome/>
                </Panel>

                {/* slider */}
                <PanelResizeHandle className="h-1 bg-zinc-900 hover:bg-zinc-700 
                                    active:bg-blue-400 transition-colors
                                    cursor-ns-resize"/>

                <Panel>
                    <ToDoHabitHome/>
                </Panel>
            </PanelGroup>
            <Footer />
        </div>
    )
}
//two panels of habit and todo
export default Home;