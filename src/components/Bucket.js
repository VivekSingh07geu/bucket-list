import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./Bucket.css";
import { addCard, addHistory, getBucketCards } from '../api';
import {Col, Modal , ModalBody, ModalHeader, Row} from "reactstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function Bucket() {
  const { id } = useParams();

  const [bucketCards , setBucketCards] = useState([]);
  const [modal , setModal] = useState(false);
  
  const [cardName , setCardName] = useState('');
  const [cardUrl , setCardUrl] = useState('');
  const [title , setTitle] = useState('');

  const [editmodal , setEditModal] = useState(false);
  const [editName , setEditName] = useState('');
  const [editLink , setEditLink] = useState('');
  const [editID , setEditID] = useState('');

  const [videomodal , setVideoModal] = useState(false);
  const [videoLink , setVideoLink] = useState('');

  useEffect(() => {
    loadBucketCards();
    loadBucketTitle();
  }, []);
  
  const loadBucketCards = () => getBucketCards(id).then((name) => setBucketCards(name.data.cards));
  const loadBucketTitle = () => getBucketCards(id).then((item) => setTitle(item.data.title));

  function handleSubmit(e){
    e.preventDefault();
    let unique_id = Date.now();
    let cards = [...bucketCards , {name: cardName , link: cardUrl , _id: unique_id}];
    addCard(id , cards , title);

    alert("New Card Added");
    window.location.reload();
}

  const handleDelete = (_id) => {
    let index = -1 , curr_pos = 0;
    let cards = [...bucketCards];
    console.log(cards.length);
    
    cards.forEach((item) => {
        if(item._id === _id)
            index = curr_pos;
        curr_pos++;
    })

    if(index !== -1){
        cards.splice(index, 1);
    }

    console.log(cards);
    addCard(id , cards , title);

    alert("Card Deleted");
    window.location.reload();
  }

  const setEdit = (_id , name , link) => {
    setEditName(name);
    setEditLink(link)
    setEditID(_id);
    setEditModal(true);
  }

  const setVideo = (_id , name , link) => {
    setVideoModal(true);
    setVideoLink(link);
    let time = new Date().toLocaleString();
    console.log(time);
    
    addHistory(_id , name , link , time);
    console.log("history added");
    // push into history array 
  }

  const handleUpdate = () => {
    let index = -1 , curr_pos = 0;
    let cards = [...bucketCards];
    console.log(cards.length);
    
    cards.forEach((item) => {
        if(item._id === editID)
            index = curr_pos;
        curr_pos++;
    })

    cards[index].name = editName;
    cards[index].link = editLink;

    addCard(id , cards , title);

    console.log(cards);
    window.location.reload();

  }

  return (
    <>
        <Modal size = 'lg' isOpen = {modal} toggle = {() => setModal(false)}>
            <ModalHeader>
                Add New Card
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
                                    value = {cardName}
                                    onChange = {(e) => setCardName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="link">
                                    Link
                                </label>
                                <input
                                    type = "text"
                                    className = 'form-control'
                                    placeholder='Enter Link Url'
                                    value = {cardUrl}
                                    onChange = {(e) => setCardUrl(e.target.value)}
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
                            <div>
                                <label htmlFor="link">
                                    Link
                                </label>
                                <input
                                    type = "text"
                                    className = 'form-control'
                                    placeholder='Enter Link Url'
                                    value = {editLink}
                                    onChange = {(e) => setEditLink(e.target.value)}
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

        <Modal size = 'lg' isOpen = {videomodal} toggle = {() => setVideoModal(false)}>
            <ModalBody style = {{width: "100%" , height: "80vh"}}>
                <iframe style = {{width: "100%" , height: "100%"}} src={videoLink} allowfullscreen></iframe>
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
            <div>{title}</div>
            <div>
                <AddCircleIcon style={{ color: "yellow" , fontSize: "50px" , cursor: "pointer"  }} onClick = {() => setModal(true)}/>
            </div>
        </div>
        <div className='bucket-list'>

            {bucketCards ? (
                bucketCards.map(item => (
                    <div className='card'>
                        <div className="details">
                            <p className='name'>{item.name}</p>
                            <p className='link'>{item.link}</p>
                        </div>
                        <div className='buttons'>
                            <span
                                onClick = {() => setVideo(item._id , item.name , item.link)}
                            >
                                <PlayCircleIcon style={{color: "green"}} />
                            </span>
                            <span
                                onClick={() => handleDelete(item._id)}
                                >
                                <DeleteIcon style={{ color: "red" }}/>
                            </span>
                            <span
                                onClick={() => setEdit(item._id , item.name , item.link)}
                                >
                                <EditIcon style={{ color: "red" }}/>
                            </span>
                            
                        </div>
                    </div>
                ))
            ):(
                <>
                </>
            )}
        </div>

    </>
  )
}

export default Bucket