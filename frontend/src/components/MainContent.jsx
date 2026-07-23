

function MainContent({selected}){

    if (!selected){
        return <h2>No recording selected</h2>
    }

    return (
        <main className="flex-1 ">
            <h2>{selected.title}</h2>
        </main>
    )
};
export default MainContent

