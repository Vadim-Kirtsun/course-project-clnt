import React from 'react';
import {Container} from "react-bootstrap";

const Item = () => {
    const comments = ["круто", "класс", "отлично"]
    return (
        <Container>
            <h1 className="text-center mt-3">Item</h1>
            <div className="d-flex justify-content-lg-between">
                <div>
                    <h6>Комментарии:</h6>
                    {comments.map(comment =>
                        <div>{comment}</div>
                    )}
                </div>
                <div>
                    <button type="button" className="btn btn-outline-danger">Like</button>
                </div>
            </div>
        </Container>
    );
};

export default Item;