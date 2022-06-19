import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCollection from "../components/modals/CreateCollection";
import {fetchCollections} from "../http/collectionApi";
import {Link} from "react-router-dom";

const UserPage = () => {
    const [myCollection, setMyCollection] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchCollections().then(data => setMyCollection(data))
    }, [])

    return (
        <Container className="d-flex flex-column">
            <Button className="mt-4 p-2" variant={"outline-dark"} onClick={() => setShow(true)}>
                Добавить коллекцию
            </Button>
            <Button className="mt-4 p-2" variant={"outline-dark"}>
                Редактировать коллекцию
            </Button>
            <Button className="mt-4 p-2" variant={"outline-dark"}>
                Удалить коллекцию
            </Button>
            <CreateCollection show={show} onHide={() => setShow(false)} />
            <div className="text-center mt-3">
                <h2>Мои коллекции:</h2>
                {myCollection.map(my =>
                    <div key={my.id}>
                            <Link to={`/collection/${my.id}`} >
                        {my.name}</Link>
                    </div>

                )}



            </div>
        </Container>


    );
};

export default UserPage;