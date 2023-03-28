import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
import getBucketNames, { addbucket, updateBucket } from '../api';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Col, Modal , ModalBody, ModalHeader, Row} from "reactstrap";
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import EditIcon from '@mui/icons-material/Edit';


const Home = () => {

  const [names , setNames] = useState([]);
  const [modal , setModal] = useState(false);
  const [bucketName , setBucketName] = useState('');

  const [editmodal , setEditModal] = useState(false);
  const [editName , setEditName] = useState('');
  const [editID , setEditID] = useState('');
  
  useEffect(() => {
    loadNames();
  }, []);

  const loadNames = () => getBucketNames().then((name) => setNames(name.data));

  function handleSubmit(e){
    e.preventDefault();
    let cards = [];
    addbucket(bucketName , cards);
    alert("new Bucket added");
    window.location.reload();
  }

  const setEdit = (id , name) => {
    setEditName(name);
    setEditID(id);
    setEditModal(true);
  }

  const handleUpdate = () => {
    let index = -1 , curr_pos = 0;

    names.forEach((item) => {
        if(item.id === editID){
            index = curr_pos;
        }
        curr_pos++;
    })

    let cards = [...names[index].cards];
    names[index].title = editName;

    console.log(editID , editName);

    updateBucket(editID , editName , cards);
    window.location.reload();
  }


  return (
    <div className='container-home'>
        <Modal size = 'lg' isOpen = {modal} toggle = {() => setModal(false)}>
            <ModalHeader>
                PopUp
            </ModalHeader>
            <ModalBody>
                <form onSubmit = {handleSubmit}>
                    <Row>
                        <Col lg = {12}>
                            <div>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type = "text"
                                    className = 'form-control'
                                    placeholder='Enter Bucket Name'
                                    value = {bucketName}
                                    onChange = {(e) => setBucketName(e.target.value)}
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <button className='btn mt-3' style={{backgroundColor: "#0b3629", color: "white"}}>
                        Submit
                    </button>
                </form>
            </ModalBody>
        </Modal>

        <Modal size = 'lg' isOpen = {editmodal} toggle = {() => setEditModal(false)}>
            <ModalHeader>
                Edit
            </ModalHeader>
            <ModalBody>
                <form onSubmit = {handleUpdate}>
                    <Row>
                        <Col lg = {12}>
                            <div>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type = "text"
                                    className = 'form-control'
                                    placeholder='Enter Bucket Name'
                                    value = {editName}
                                    onChange = {(e) => setEditName(e.target.value)}
                                    required
                                />
                            </div>
                            
                        </Col>
                    </Row>
                    <button className='btn mt-3' style={{backgroundColor: "#0b3629", color: "white"}}>
                        Update
                    </button>
                </form>
            </ModalBody>
        </Modal>


        <div className='header'>
            <div className='left'>
                <div>
                    <Link to = "/" style={{ textDecoration: 'none' , color: "white" }}>
                        <a>
                        <span>Home</span>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link to = "/history" style={{ textDecoration: 'none' , color: "white" }}>
                        <a>
                            <span>History</span>
                        </a>
                    </Link>
                </div>
            </div>
            <AddCircleIcon style={{ color: "yellow" , fontSize: "50px" , cursor: "pointer" }} onClick = {() => setModal(true)}/>
        </div>
        <div className='bucket-list-home'>

            {names ? (
                names.map(item => (
                    <div className='card-home'>
                        <div className='edit-icon'>
                            <span
                                onClick={() => setEdit(item.id , item.title)}
                                >
                                <EditIcon style={{ color: "red" }}/>
                            </span>
                        </div>
                        <span>{item.title}</span>
                        <Link to = {`/bucket/${item.id}`}>
                            <DoubleArrowOutlinedIcon styled = {{color: "blue"}}/>
                        </Link>
                    </div>
                ))
            ):(
                <>
                </>
            )}
        </div>

    </div>
  )
}

export default Home