import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategories } from '../../redux/actions/categoryActions'
import { useEffect,useState } from 'react'
import { Container,Row,Col, Button,Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryInfo , setCategoryInfo] = useState({
    categoryName : "",
    categoryImage:"",
    parentID :""
  })
  const [categoryInfoList , setCategoryInfoList] = useState({
    categoryList :[],
    parentIDs:[]
  })
  const dispatch = useDispatch();
  const currState= useSelector(state => state.category)
  
  const handleClose = () => {
    if (categoryInfo.categoryName === "") {
      alert('Category name is required');
  }
  else{
    const form = new FormData();
    form.append('name', categoryInfo.categoryName);
    form.append('parentID', categoryInfo.parentID);
    form.append('categoryImage', categoryInfo.categoryImage);
    console.log(currState.loading);
    dispatch(addCategory(form , currState))
  }
  setCategoryInfo({categoryName:"" ,parentID:""});
  setShow(false)
  };  
  const handleShow = () => setShow(true);
  const handleChange = (e) =>{
    setCategoryInfo((prevInfo) =>{
      if(e.target.name==="categoryImage") {return {...prevInfo,[e.target.name]:e.target.files[0]};}
      else return {...prevInfo, [e.target.name]: e.target.value}
    })
  }
 
  useEffect(() => {
      if(!currState.loading){
      dispatch(getCategories());  
    }
},[]
)
  useEffect(()=>{
    if(!currState.loading){
      setCategoryInfoList(() => {
          let parentIDs = [];
          const categoryList = renderCategories(currState.categories , parentIDs);
          // console.log(parentIDs)
          return {parentIDs , categoryList}
      });
    }
  },[currState.loading])
const renderCategories = (category,parentIDs) =>{
  let categoryList = [];
  for(let i = 0 ; i < category.length ; i++){
    let childrenList =[];
    parentIDs.push({name:category[i].name , value: category[i]._id});
    if(category[i].children.length > 0){
      childrenList = renderCategories(category[i].children,parentIDs);
    }
    categoryList.push(<li key = {i}>{category[i].name}
    {childrenList.length > 0 && 
      <ul>
        {childrenList}
      </ul>
    }
    </li>
    )
}
  return categoryList;
}
  return (
        <Container>
          <Row className = "mt-2">
            <Col md={11}>
               <h1>Category</h1>
            </Col>
            <Col>
               <Button onClick ={handleShow}>Add</Button>
            </Col>
          </Row>
          {categoryInfoList.categoryList.length > 0 && categoryInfoList.categoryList.map((parentCategory,key) => {
            return (
              <ul key ={key}>
                {parentCategory}
              </ul>
            )
          })}
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body value = "">
            <Row className ="mb-2">
              <Col>
                <Form.Label>Category Name</Form.Label>
              </Col>
              <Col>
                <Form.Control type ="text" name ="categoryName" placeholder = "Enter Category Name" value = {categoryInfo.categoryName} onChange = {handleChange}/>
              </Col>
            </Row>
            <Row className ="mb-2">
              <Col>
                <Form.Label>Parent Category</Form.Label>
              </Col>
              <Col>
                <Form.Select name = "parentID" value ={categoryInfo.parentID} onChange = {handleChange}> 
                  <option>Select Parent Category</option>
                  {categoryInfoList.parentIDs.length > 0 && categoryInfoList.parentIDs.map((id , key) => {
                      return (
                        <option value ={id.value} key = {key}>
                          {id.name}
                        </option>
                      )
                  })}
                </Form.Select>
              </Col>
            </Row>
            <Row className ="mb-2">
              <Col>
                <Form.Label>Category Image</Form.Label>
              </Col>
              <Col>
                <Form.Control type ="file" name ="categoryImage"  onChange = {handleChange}/>
              </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
   
  )
}

export default Category