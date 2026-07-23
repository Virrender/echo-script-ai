

function MainContent({selected}){

    if (!selected){
        return(
        <main className="flex-1 flex items-center justify-center">
         <h2 >No recording selected</h2>
        </main>
        )
    }

    return (
        <main className="flex-1 flex items-center justify-center">
            <h2>{selected.transcript}</h2>
        </main>
    )
};

export default MainContent

