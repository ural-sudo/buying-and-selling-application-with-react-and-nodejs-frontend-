
import React,{useState, useEffect} from "react";
import './MyProductsForm.css'
import { useParams } from "react-router-dom";
const MyProductForm = (props) => {
    const params = useParams();
    const [enteredImage, setEnteredImage] = useState('');
    const [previewUrl, setPreviewUrl] = useState(''); 
    const [enteredTitle, setEnteredTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        
    }
    
    const categoryChangeHandler = (event) => {
        setCategory(event.target.value);
    }
    const priceChangeHandler = event => {
        setPrice(event.target.value);

    }
    const descriptionChangeHandler = event => {
        setDescription(event.target.value);
    }

    const imageChangeHandler = (event) => {
        if (event.target.files && event.target.files.length === 1){
            const imageFile = event.target.files[0];
            setEnteredImage(imageFile);
            return;
        }

    }
    useEffect( () =>{
        if(!enteredImage){
            return;
        }
        const imageReader = new FileReader();
        imageReader.onload = () => {
            setPreviewUrl(imageReader.result); 
        }
        imageReader.readAsDataURL(enteredImage);
    }, [enteredImage])

    
    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title',enteredTitle);
        formData.append('category',category);
        formData.append('image' ,enteredImage);
        formData.append('price',price);
        formData.append('description',description);
        try{
            const response = await fetch(`http://localhost:8080/product/postProd/${params.creatorId}`, {
                method :'POST',
                body: formData
            });
            response.json();
        }catch(error){
            console.log(error);
        }
        
        props.onAfterSubmit();
    }
    const imageStyle = previewUrl ? 'form-item__image': 'form-item__image-none';

    return(
        <section className="main-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-item">
                    <label>Product Title</label>
                    <input type='text' onChange={titleChangeHandler}/>
                </div>
                <div className="form-item">
                    <label>Category</label>
                    <select onChange={categoryChangeHandler}>
                        <option value='Elektronik'>Elektronik</option>
                        <option value='Mutfak'>Mutfak</option>
                        <option value='Kadın'>Kadın</option>
                        <option value='Erkek'>Erkek</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Image File</label>
                    <input type='file' onChange={imageChangeHandler} accept='.jpg, .png, .jpeg'/>
                </div>
                <div className="form-item">
                    <div className={imageStyle}>
                        { previewUrl && <img src={previewUrl} alt='preview'/>}
                    </div>
                </div>
                <div className="form-item">
                    <label>Price</label>
                    <input type='number' onChange={priceChangeHandler}/>
                </div>
                <div className="form-item">
                    <label>Description</label>
                    <textarea cols='40' rows='4' onChange={descriptionChangeHandler}/> 
                </div>
                <div className="form-action">
                    <button type="submit">Add Product</button>
                </div>
            </form>
        </section>
    );
}

export default MyProductForm;