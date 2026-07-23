

function MainContent({selected}){

    if (!selected){
        return <h2 className="flex-1 p-4">No recording selected</h2>
    }

    return (
        <main className="flex-1 p-4 ">
            <h2>{selected.title}</h2>
        </main>
    )
};

export default MainContent

