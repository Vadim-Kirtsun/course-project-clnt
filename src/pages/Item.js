import React from 'react';


const Item = () => {
    const comments = ["круто", "класс", "отлично"]
    return (
        <div>
            <h1 >Item</h1>
            <div>
                <div>
                    <h6>Комментарии:</h6>
                    {comments.map(comment =>
                        <div>{comment}</div>
                    )}
                </div>
                <div>
                    <button>Like</button>
                </div>
            </div>
        </div>
    );
};

export default Item;