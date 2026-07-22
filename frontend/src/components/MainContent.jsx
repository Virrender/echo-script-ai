

function MainContent({selected}){

    if (!selected){
        return <h2>No recording selected</h2>
    }

    return (
        <main>
            <h2>{selected.title}</h2>
        </main>
    )
};
export default MainContent

