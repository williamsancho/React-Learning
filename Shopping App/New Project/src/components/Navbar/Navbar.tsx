import { Link } from 'react-router-dom';
import '../../index.css';

export default function Navbar () {


        return (
        <div className="nav">
            <ul>
                <Link to = '/'>Home</Link>
                
                
                <Link to ="/add">Add Product</Link>
                <Link to ='/update'>Update Product</Link>
                <Link to ='/delete'>Delete Products</Link>

            </ul>
        </div>
        
      )
    }


