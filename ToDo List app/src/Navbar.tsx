import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Navbar extends React.Component {

    render() {
        return (
        <div className="nav">
            <ul>
                <Link to = '/'>Home</Link>
                <Link to ="/products">Products</Link>
                <Link to = '/search'>Search</Link>
                <Link to ="/add">Add Product</Link>
                <Link to ='/udpate'>Update Prod</Link>
                <Link to ='/delete'>Login</Link>

            </ul>
        </div>
        
      )
    }

}
export default Navbar;