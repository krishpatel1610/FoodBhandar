import React,{useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
    const [search,setSearch] = useState('')
    const [foodCat,setFoodCat] = useState([])
    const [foodItem,setFoodItem] = useState([])
    
    const loadData = async ()=>{
        let response = await fetch("http://localhost:5000/api/foodData",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0],response[1]);
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(()=>{
        loadData()
    },[])

    return( 
    <div>
        <div><Navbar/></div>
        <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id="carousel">
            <div class="carousel-caption" style={{zIndex:"10"}}>
                <div className="d-flex pt-10 justify-content-center" >
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
            </div>
                <div className="carousel-item active">
                <img src="https://thumbs.dreamstime.com/b/fast-food-street-ai-generated-272193464.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="https://th.bing.com/th/id/OIP.soodc32zYYuOq5x4KyT7tQHaEo?rs=1&pid=ImgDetMain" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="https://th.bing.com/th/id/OIP.QaAA99z-INlQ8I4sHGoRMAHaDa?rs=1&pid=ImgDetMain" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" style={{zIndex:"10"}}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" style={{zIndex:"10"}}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        <div className='container'>
        <div className='row mb-3'>
            {
                foodCat !== []
                ?foodCat.map((data)=>{
                    return(
                        <div className='row mb-3'>
                        <div key={data._id} className='fs-3 m-3'> 
                        {data.CategoryName} 
                        </div>
                        <hr/>
                        {
                        foodItem !==[]
                        ? foodItem.filter((item)=> item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems=>{
                            return(
                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                    <Card foodItem={filterItems} options={filterItems.options[0]}  />
                                </div>
                            )
                        })
                        :<div>No Such Data Found</div>
                        }
                        </div>
                    )
                })
                :<div>"""""</div>
            }
        </div>
        </div>
        <div><Footer/></div>
    </div>)
    ;
}


export default Home;