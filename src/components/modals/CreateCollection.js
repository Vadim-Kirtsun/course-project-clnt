import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";

const CreateCollection = ({show, onHide}) => {
    const subjects = ["airplane", "car", "moto"];
    const types = ["Целочисленное", "Строковое", "Многострочный текст", "Чекбокс", "Дата"];
    const [field, setField] = useState([]);

    const addField = () => {
        setField([...field, {id: Date.now(), title: ''}])
    }

    const removeField = (id) => {
        setField(field.filter(f => f.id !== id))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить коллекцию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mb-2"
                        placeholder="Введите название"
                    />
                    <div className="mb-2">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                  placeholder="Введите описание коллекции..."
                        ></textarea>
                    </div>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>Выберите тему</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {subjects.map(subject =>
                                <Dropdown.Item key={subject}>{subject}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        type="file"
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={() => addField()}
                        >
                        Добавить новое поле
                    </Button>
                    {field.map(f =>
                        <Row className="mt-3" key={f.id}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Введите название"
                                />
                            </Col>
                            <Col md={3}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {types.map(type =>
                                        <Dropdown.Item key={type}>{type}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeField(f.id)}
                                    >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>
                <Button variant="outline-success" onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCollection;